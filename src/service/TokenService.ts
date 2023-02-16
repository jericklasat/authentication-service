import fs from "fs";
import jwt from "jsonwebtoken";
import {_TTokenService} from "../types/service/_ITokenService";
import activeRefreshTokenRepository from "../repository/ActiveRefreshTokenRepository";
import invalidRefreshTokenRepository from "../repository/InvalidRefreshTokenRepository";

// TODO: create cron job to delete expired blacklisted_tokens and live_tokens(more frequent)
// TODO: check if access token is revoked

const generate: _TTokenService['generate'] = (payload, expiration) => {
  const secret = fs.readFileSync('./certificates/private.pem');

  return jwt.sign(payload, secret, {expiresIn: expiration ?? '30min', algorithm: 'RS256'});
}

const invalidate: _TTokenService['invalidate'] = async (refreshToken) => {
  // TODO: create hook to broadcast invalidated access token
  const secret = fs.readFileSync('./certificates/private.pem');
  const decoded = jwt.verify(refreshToken, secret, {algorithms: ["RS256"]});

  if (typeof decoded === 'string') {
    return false;
  }

  await activeRefreshTokenRepository.remove(refreshToken);

  if (! decoded.exp) {
    return false;
  }

  invalidRefreshTokenRepository.create(refreshToken, decoded.exp);

  return true;
}

const save: _TTokenService['save'] = (userId, refreshToken) => {
  activeRefreshTokenRepository.create(userId, refreshToken);
}

const refresh: _TTokenService['refresh'] = async (refreshToken) => {
  if (! refreshToken) {
    return null;
  }

  try {
    const secret = fs.readFileSync('./certificates/private.pem');
    const decoded = jwt.verify(refreshToken, secret, {algorithms: ["RS256"]});

    if (typeof decoded === 'string') {
      return createErrorMessage(decoded);
    }

    if (! isRefreshToken(<string>decoded.type)) {
      return createErrorMessage('Not a valid refresh token.');
    }

    if (await isTokenCompromised(refreshToken, <string>decoded.sub)) {
      return createErrorMessage('Account is compromised.');
    }

    const isInvalidated = invalidate(refreshToken);

    if (! isInvalidated) {
      return createErrorMessage('Invalidation failed.');
    }

    if (! decoded.sub) {
      return createErrorMessage('Undefined subject.');
    }

    delete decoded.exp;
    delete decoded.iat;

    const accessToken = generate({
      sub: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles,
      type: 'login',
    });

    const newRefreshToken = generate(decoded, '30 days');

    save(decoded.sub, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  } catch(err: any) {
    console.log(err);

    return createErrorMessage(err.message);
  }
}

async function isTokenCompromised(refreshToken: string, userId: string) {
  const invalidRefreshToken = await invalidRefreshTokenRepository.findByRefreshToken(refreshToken);
  if (null == invalidRefreshToken) {
    return false;
  }

  const activeRefreshTokens = await activeRefreshTokenRepository.findByUserId(userId);

  activeRefreshTokens.map(async activeRefreshToken => {
    await invalidate(activeRefreshToken.refreshToken);
  });

  return true;
}

function isRefreshToken (type: string): boolean {
  return 'refresh' === type;
}

function createErrorMessage(errorMessage: string) {
  return {errorMessage}
}

export default {
  generate,
  invalidate,
  refresh,
  save,
}