import { Migration } from '@mikro-orm/migrations';
import {v4} from "uuid";

export class Migration20221008021911 extends Migration {

  async up(): Promise<void> {
    const currentDateTime = new Date().toISOString();

    this.addSql(`INSERT INTO role (id, name, created_at) VALUES ('${v4()}', 'ADMIN_ROLE', '${currentDateTime}'), ('${v4()}', 'USER_ROLE', '${currentDateTime}')`);
  }

}
