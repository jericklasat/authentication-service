import {UserModel} from "../../model/UserModel";

export default interface _IUserRepository {
  create: (user: UserModel) => Promise<string>;
}