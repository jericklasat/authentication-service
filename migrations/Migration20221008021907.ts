import { Migration } from '@mikro-orm/migrations';

export class Migration20221008021907 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, constraint "role_pkey" primary key ("id"));');

    this.addSql('create table "user_details" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) not null, "first_name" varchar(255) not null, "middle_name" varchar(255) null, "last_name" varchar(255) not null, "suffix" varchar(255) null, "gender" varchar(1) not null, "date_of_birth" timestamptz(0) not null, constraint "user_details_pkey" primary key ("id"));');
    this.addSql('create index "ud_uid" on "user_details" ("user_id");');

    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "email_address" varchar(255) not null, "mobile_number" varchar(255) not null, "password" varchar(255) not null, "is_active" boolean not null default false, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "u_email" on "user" ("email_address");');
    this.addSql('alter table "user" add constraint "user_email_address_unique" unique ("email_address");');
    this.addSql('create index "u_mobile" on "user" ("mobile_number");');
    this.addSql('alter table "user" add constraint "user_mobile_number_unique" unique ("mobile_number");');

    this.addSql('create table "user_role" ("id" varchar(255) not null, "user_id" varchar(255) not null, "role_id" varchar(255) not null, "created_at" timestamptz(0) not null, constraint "user_role_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "user_details" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_role" cascade;');
  }

}
