export class UserChangeRoleDto {
  id: number;
  role: string;


  constructor(id: number, rele: string) {
    this.id = id;
    this.role = rele;
  }
}
