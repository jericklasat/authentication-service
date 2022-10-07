import UserRepository from "../repository/UserRepository";
import UserDetailsRepository from "../repository/UserDetailsRepository";
import {UserModel} from "../model/UserModel";

const register = async (user: UserModel) => {
  const uid = await UserRepository.create(user);
  UserDetailsRepository.create(uid, user);
  
  return uid;
}

export default {
  register,
}