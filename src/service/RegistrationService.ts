import userRepository from "../repository/UserRepository";
import userDetailsRepository from "../repository/UserDetailsRepository";
import {UserModel} from "../model/UserModel";

const register = async (user: UserModel) => {
  const uid = await userRepository.create(user);
  userDetailsRepository.create(uid, user);
  // TODO: Add default role
  
  return uid;
}

export default {
  register,
}