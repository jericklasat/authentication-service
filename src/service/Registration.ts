import UserRepository from "../repository/UserRepository";
import {UserModel} from "../model/UserModel";

const register = async (user: UserModel) => {
  return await UserRepository.create(user);
}

export default {
  register,
}