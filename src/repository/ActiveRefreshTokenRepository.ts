import {ActiveRefreshTokenEntity} from "../entity/ActiveRefreshTokenEntity";
import databaseInit from "../../config/database/init";
import _IActiveRefreshTokenRepository from "../types/repository/_IActiveRefreshTokenRepository";

const create: _IActiveRefreshTokenRepository['create'] = (userId, refreshToken) => {
  const entity = new ActiveRefreshTokenEntity(userId, refreshToken);

  databaseInit.em.persistAndFlush(entity).catch(err => console.log(err));
}

const remove = async (refreshToken: string) => {
  const entity = await databaseInit.em.findOneOrFail(ActiveRefreshTokenEntity, {refreshToken});

  await databaseInit.em.remove(entity);
}

const findByUserId = async (userId: string) => {
  return await databaseInit.em.find(ActiveRefreshTokenEntity, {userId});
}

export default {
  create,
  remove,
  findByUserId,
}