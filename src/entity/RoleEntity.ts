import {Entity, Index, Property} from "@mikro-orm/core";
import {BaseEntity} from "./BaseEntity";

@Entity({tableName: 'role'})
export class RoleEntity extends BaseEntity {
  @Property()
  name!: string
}