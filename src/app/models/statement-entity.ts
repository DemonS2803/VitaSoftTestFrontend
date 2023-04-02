import {UserEntity} from "./user-entity";

export class StatementEntity {
  id: number;
  title: string;
  content: string;
  status: string;
  created: string;
  owner: UserEntity;


  constructor(id: number, title: string, content: string, status: string, created: string, owner: UserEntity) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.created = created;
    this.owner = owner
  }
}
