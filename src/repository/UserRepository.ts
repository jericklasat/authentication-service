import databaseInit from "../../config/database/init";
import {UserEntity} from "../entity/UserEntity";
import argon2 from "argon2";
import _IUserRepository from "../types/repository/_IUserRepository";

const create: _IUserRepository['create'] = async (user) => {
  const hashedPassword = await argon2.hash(user.password);
  const entity = new UserEntity(user.emailAddress, user.mobileNumber, hashedPassword);
  await databaseInit.em.persistAndFlush(entity);

  return entity.uuid;
}

export default {
  create,
}