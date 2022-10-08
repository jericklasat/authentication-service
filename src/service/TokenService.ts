import fs from "fs";
import jwt from "jsonwebtoken";

const generateToken = (expiration: string = '1d') => {
  const secret = fs.readFileSync('./certificates/private.pem');

  return jwt.sign({}, secret, {expiresIn: expiration, algorithm: 'RS256'});
}

const generateTokensFromRefreshToken = (token: string) => {
  try {
    const secret = fs.readFileSync('./certificates/private.pem');
    const decoded = jwt.verify(token, secret);

    // TODO: check if token is valid

    return {
      accessToken: generateToken(),
      refreshToken: generateToken('30 days'),
    };
  } catch(err: any) {
    console.log(err);

    return '';
  }
}

export default {
  generateToken,
  generateTokensFromRefreshToken
}