import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {v4} from "uuid";

@Entity({tableName: 'invalid_refresh_token'})
export class InvalidRefreshTokenEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({columnType: 'text'})
  refreshToken!: string;

  @Property({type: 'timestamp'})
  expiration: Date = new Date();

  constructor(refreshToken: string, expiration: Date) {
    this.refreshToken = refreshToken;
    this.expiration = expiration;
  }
}