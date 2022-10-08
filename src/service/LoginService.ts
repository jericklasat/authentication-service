import argon2 from "argon2";
import userRepository from "../repository/UserRepository";
import tokenService from "./TokenService";

const loginService = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);
  const isPasswordMatched = await argon2.verify(user.password, password);

  if (! isPasswordMatched) {
    return null;
  }
  // TODO: Identify what are the data that should be in the jwt
  // also include roles

  return {
    accessToken: tokenService.generate(),
    refreshToken: tokenService.generate('30 days'),
  }
}

export default  {
  login: loginService
}