import fs from 'fs';

const generatePublicJwk = () => {
  const rsaPemToJwk = require('rsa-pem-to-jwk');
  const privateKey = fs.readFileSync('./certificates/private.pem');

  return rsaPemToJwk(privateKey, {use: 'sig'}, 'public');
}

export default {
  generatePublicJwk,
}
