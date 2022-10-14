import {InvalidRefreshTokenEntity} from "../entity/InvalidRefreshTokenEntity";
import databaseInit from "../../config/database/init";

const create = (refreshToken: string, timestamp: number) => {
  const entity = new InvalidRefreshTokenEntity(refreshToken, new Date(timestamp));

  databaseInit.em.persistAndFlush(entity).catch(err => console.log(err));
}

const findByRefreshToken = async (refreshToken: string) => {
  return await databaseInit.em.findOne(InvalidRefreshTokenEntity, {refreshToken});
}

export default {
  create,
  findByRefreshToken,
}