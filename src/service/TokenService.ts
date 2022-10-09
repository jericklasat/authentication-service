import fs from "fs";
import jwt from "jsonwebtoken";
import {_TGeneratePayload, _TGenerate} from "../types/service/_ITokenService";

const generate: _TGenerate['generate'] = (payload, expiration) => {
  const secret = fs.readFileSync('./certificates/private.pem');

  return jwt.sign(payload, secret, {expiresIn: expiration ?? '1d', algorithm: 'RS256'});
}

const generateFromRefreshToken = (token: string) => {
  try {
    const secret = fs.readFileSync('./certificates/private.pem');
    const decoded = jwt.verify(token, secret);

    // TODO: check if token is valid
    const payload: _TGeneratePayload = {};

    return {
      accessToken: generate(payload),
      refreshToken: generate(payload, '30 days'),
    };
  } catch(err: any) {
    console.log(err);

    return '';
  }
}

export default {
  generate,
  generateFromRefreshToken
}