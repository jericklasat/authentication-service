import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Options} from "@mikro-orm/core";
import path from "path";
import 'dotenv/config';

export default<Options<PostgreSqlDriver>>  {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dbName: process.env.DATABASE_NAME,
  entities: [path.join(__dirname + '../../../src/entity/*.ts')],
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  type: 'postgresql',
  debug: process.env.DATABASE_DEBUG,
  allowGlobalContext: true,
  migrations: {
    path: path.join(__dirname + '../../../migrations'),
  }
}