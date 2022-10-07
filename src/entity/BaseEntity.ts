import {PrimaryKey, Property} from "@mikro-orm/core";
import {v4} from "uuid";

export abstract class BaseEntity{
  @PrimaryKey()
  uuid: string = v4()

  @Property({
    onCreate: () => new Date()
  })
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
    nullable: true,
  })
  updateAt?: Date = new Date();

  @Property({nullable: true})
  deletedAt?: Date;
}