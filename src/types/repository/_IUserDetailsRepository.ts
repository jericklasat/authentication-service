import {UserModel} from "../../model/UserModel";

export default interface _IUserDetailsRepository {
  create: (uid: string, user: UserModel) => void;
}