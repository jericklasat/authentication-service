import databaseInit from "../../config/database/init";
import {UserDetailsEntity} from "../entity/UserDetailsEntity";
import _IUserDetailsRepository from "../types/repository/_IUserDetailsRepository";

const create: _IUserDetailsRepository['create'] = (uid: string, user) => {
  const entity = new UserDetailsEntity(uid, user.firstName, user.lastName, user.gender, user.dateOfBirth, user.middleName, user.suffix);

  databaseInit.em.persistAndFlush(entity).catch(err => console.log(err));
}

const findByUid = async (uid: string) => {
  return await databaseInit.em.findOneOrFail(UserDetailsEntity, {userId: uid})
}

export default {
  create,
  findByUid,
}