import { Migration } from '@mikro-orm/migrations';

export class Migration20221014182852 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "active_refresh_token" ("id" varchar(255) not null, "user_id" varchar(255) not null, "refresh_token" text not null, "created_at" timestamptz(0) not null, constraint "active_refresh_token_pkey" primary key ("id"));');

    this.addSql('create table "invalid_refresh_token" ("id" varchar(255) not null, "refresh_token" text not null, "expiration" timestamptz(0) not null, constraint "invalid_refresh_token_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "active_refresh_token" cascade;');

    this.addSql('drop table if exists "invalid_refresh_token" cascade;');
  }

}
