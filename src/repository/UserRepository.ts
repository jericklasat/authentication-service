import databaseInit from "../../config/database/init";
import {UserEntity} from "../entity/UserEntity";
import {UserModel} from "../model/UserModel";
import argon2 from "argon2";


const create: (user: UserModel) => Promise<string> = async (user: UserModel) => {
  const hashedPassword = await argon2.hash(user.password);
  const entity = new UserEntity(user.emailAddress, user.mobileNumber, hashedPassword);
  await databaseInit.em.persistAndFlush(entity);

  return entity.uuid;
}

export default {
  create,
}