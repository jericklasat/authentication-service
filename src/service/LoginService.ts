import argon2 from "argon2";
import userRepository from "../repository/UserRepository";
import tokenService from "./TokenService";

const loginService = async (email: string, password: string) => {
  if (! password || ! email) {
    return null;
  }

  const user = await userRepository.findByEmail(email);
  const isPasswordMatched = await argon2.verify(user.password, password);

  if (isPasswordMatched) {
    return {
      accessToken: tokenService.generateToken(),
      refreshToken: tokenService.generateToken('30 days'),
    }
  }

  return null;
}

export default  {
  login: loginService
}