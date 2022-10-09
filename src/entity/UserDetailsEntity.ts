import {Entity, Index, Property} from "@mikro-orm/core";
import {BaseEntity} from "./BaseEntity";

@Entity({tableName: 'user_details'})
export class UserDetailsEntity extends BaseEntity {
  @Property()
  @Index({name: 'ud_uid'})
  userId!: string;

  @Property()
  firstName!: string;

  @Property({nullable: true})
  middleName?: string;

  @Property()
  lastName!: string;

  @Property({nullable: true})
  suffix?: string;

  @Property({length: 1})
  gender!: string;

  @Property({type: 'date'})
  dateOfBirth!: Date;

  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    gender: string,
    dateOfBirth: Date,
    middleName?: string,
    suffix?: string,
  ) {
    super();
    this.userId = userId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.suffix = suffix;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
  }

  getFullName(): string {
    let name = this.firstName;
    name = this.middleName ? name + ' ' + this.middleName : name;

    return name + ' ' + this.lastName;
  }
}