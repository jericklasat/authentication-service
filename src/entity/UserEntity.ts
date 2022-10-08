import {BaseEntity} from "./BaseEntity";
import {Entity, Index, Property, Unique} from "@mikro-orm/core";

@Entity({tableName: 'user'})
export class UserEntity extends BaseEntity {
  @Property()
  @Index({name: 'u_email'})
  @Unique()
  emailAddress!: string;

  @Property()
  @Index({name: 'u_mobile'})
  @Unique()
  mobileNumber!: string;

  @Property()
  password!: string;

  @Property({default: false})
  isActive?: boolean = false;

  constructor(emailAddress: string, mobileNumber: string, password: string, isActive?: boolean) {
    super();
    this.emailAddress = emailAddress;
    this.mobileNumber = mobileNumber;
    this.password = password;
    this.isActive = isActive;
  }
}