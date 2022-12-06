import express from 'express';
import controller from "./src/controller";
import MikroOrmConfig from './config/database/mikro-orm.config';
import 'dotenv/config';
import {MikroORM, RequestContext} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import cors from 'cors';
import bodyParser from "body-parser";
import databaseInit from "./config/database/init";

const app = express();

const main = async () => {
  const contextPath = process.env.CONTEXT_PATH || '/api';
  databaseInit.orm = await MikroORM.init<PostgreSqlDriver>(MikroOrmConfig);
  databaseInit.em = databaseInit.orm.em;

  app.use(cors());
  app.use((req, res, next) => RequestContext.create(databaseInit.em, next));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(contextPath, controller);
  app.use((req, res) => res.status(404).json({message: 'No route found'}));

  databaseInit.server = app.listen(process.env.APP_PORT, () => {
    console.log('Running at port ' + process.env.APP_PORT);
  });

};

main().catch(err => console.error(err));