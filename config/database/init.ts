import http from "http";
import {EntityManager, MikroORM} from "@mikro-orm/core";

export default {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
};