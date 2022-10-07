export class UserModel {
  private _emailAddress!: string;
  private _mobileNumber!: string;
  private _password?: string;
  private _isActive?: boolean;
  private _firstName!: string;
  private _middleName?: string;
  private _lastName!: string;
  private _suffix?: string;
  private _gender!: string;
  private _dateOfBirth!: Date;

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

  get mobileNumber(): string {
    return this._mobileNumber;
  }

  set mobileNumber(value: string) {
    this._mobileNumber = value;
  }

  get password(): string {
    return this._password ?? '';
  }

  set password(value: string) {
    this._password = value;
  }

  get isActive(): boolean {
    return this._isActive ?? false;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName ?? '';
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get suffix(): string {
    return this._suffix ?? '';
  }

  set suffix(value: string) {
    this._suffix = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }
}