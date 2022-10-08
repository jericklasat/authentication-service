import fs from "fs";
import jwt from "jsonwebtoken";

const generate = (expiration: string = '1d') => {
  const secret = fs.readFileSync('./certificates/private.pem');

  return jwt.sign({}, secret, {expiresIn: expiration, algorithm: 'RS256'});
}

const generateFromRefreshToken = (token: string) => {
  try {
    const secret = fs.readFileSync('./certificates/private.pem');
    const decoded = jwt.verify(token, secret);

    // TODO: check if token is valid

    return {
      accessToken: generate(),
      refreshToken: generate('30 days'),
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