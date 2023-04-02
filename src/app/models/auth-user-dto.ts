export class AuthUserDto {
  login: string;
  password: string;
  token: string;

  constructor(login: string, password: string, token: string) {
    this.login = login;
    this.password = password;
    this.token = token;
  }
}
