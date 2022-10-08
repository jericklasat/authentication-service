import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {v4} from "uuid";

@Entity({tableName: 'user_role'})
export class UserRoleEntity {
  @PrimaryKey()
  id: string = v4()

  @Property()
  userId!: string;

  @Property()
  roleId!: string;

  @Property({
    onCreate: () => new Date()
  })
  createdAt: Date = new Date();
}