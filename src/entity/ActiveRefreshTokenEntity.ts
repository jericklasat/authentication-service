import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {v4} from "uuid";

@Entity({tableName: 'active_refresh_token'})
export class ActiveRefreshTokenEntity {
  @PrimaryKey()
  id: string = v4();

  @Property()
  userId!: string;

  @Property({columnType: 'text'})
  refreshToken!: string;

  @Property({onCreate: () => new Date()})
  createdAt: Date = new Date();

  constructor(userId: string, refreshToken: string) {
    this.userId = userId;
    this.refreshToken = refreshToken;
  }
}