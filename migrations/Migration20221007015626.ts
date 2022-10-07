import { Migration } from '@mikro-orm/migrations';

export class Migration20221007015626 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) not null, "name" varchar(255) not null, constraint "role_pkey" primary key ("uuid"));');
    this.addSql('create index "u_uuid" on "role" ("user_id");');

    this.addSql('create table "user_details" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) not null, "first_name" varchar(255) not null, "middle_name" varchar(255) null, "last_name" varchar(255) not null, "suffix" varchar(255) null, "gender" varchar(1) not null, "date_of_birth" timestamptz(0) not null, constraint "user_details_pkey" primary key ("uuid"));');
    this.addSql('create index "r_u_uuid" on "user_details" ("user_id");');

    this.addSql('create table "user" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "email_address" varchar(255) not null, "mobile_number" varchar(255) not null, "password" varchar(255) not null, "is_active" boolean not null default false, constraint "user_pkey" primary key ("uuid"));');
    this.addSql('create index "u_email" on "user" ("email_address");');
    this.addSql('create index "u_mobile" on "user" ("mobile_number");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "user_details" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
