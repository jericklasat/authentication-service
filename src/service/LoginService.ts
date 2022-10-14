import argon2 from "argon2";
import userRepository from "../repository/UserRepository";
import tokenService from "./TokenService";
import {_TGeneratePayload} from "../types/service/_ITokenService";
import userRoleRepository from "../repository/UserRoleRepository";
import userDetailsRepository from "../repository/UserDetailsRepository";

const loginService = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);
  const isPasswordMatched = await argon2.verify(user.password, password);

  if (! isPasswordMatched) {
    // TODO: implement login retry count
    return null;
  }

  if (! user.isActive) {
    return {
      'message': 'Please activate your account, if you dont receive activation link please coordinate to administrator.'
    }
  }

  // TODO: integrate client id and search how to use it in micro services
  const details = await userDetailsRepository.findByUid(user.id);
  const roles = await userRoleRepository.getRoleNamesByUid(user.id);
  const payload: _TGeneratePayload = {
    sub: user.id,
    email: user.emailAddress,
    name: details.getFullName(),
    roles,
  };

  const tokens = {
    accessToken: tokenService.generate(payload),
    refreshToken: tokenService.generate(payload, '30 days'),
  };

  tokenService.save(user.id, tokens.refreshToken);

  return tokens;
}

export default  {
  login: loginService
}