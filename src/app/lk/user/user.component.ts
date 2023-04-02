import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {StatementEntity} from "../../models/statement-entity";
import {environment} from "../../../environments/environment";
import {UserEntity} from "../../models/user-entity";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  offset: number;

  userStatementsInTable: StatementEntity[] = [];
  chosenComponent: StatementEntity = new StatementEntity(0, "", "", "", "", new UserEntity());
  chosenStatementId: number = 0;
  currentUserId: number = Number(localStorage.getItem("userId")) || 0;
  sortParam: string = "id";
  openedModalTitle: string = "";
  openedModalContent: string = "";
  isOpenedCreateModalDiv: boolean = false;
  isOpenedEditModalDiv: boolean = false;
  isOpenedWatchModalDiv: boolean = false;
  constructor(private http: HttpClient) {
    this.offset = 0;
  }
  ngOnInit(): void {
    this.updateStatementsInTable()

  }

  updateStatementsInTable() {
    let params = new HttpParams();
    params = params.append('userId', this.currentUserId);
    params = params.append('offset', this.offset);
    params = params.append('limit', 5);
    params = params.append("sortParam", this.sortParam);
    if (this.sortParam == "createdrev") {
      params = params.set("sortParam", "created");
      params = params.append("isReverseSort", true)
    }
    this.http.get<any>(environment.backendURL + "/api/user/", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': localStorage.getItem("token") || ""
      },
      params: params
    }).subscribe({
      next: ((response: any) => {
        console.log(response);
        this.userStatementsInTable = response;
        console.log(this.userStatementsInTable);
        console.log("success");
      }),
      error: ((response: any) => {
        console.log(response);
      })
    });
    this.isOpenedEditModalDiv = false;
    this.isOpenedCreateModalDiv = false;
    this.isOpenedWatchModalDiv = false;
  }

  watchStatement(statement: StatementEntity) {
    this.isOpenedCreateModalDiv = false;
    this.isOpenedEditModalDiv = false;
    this.chosenComponent = statement;
    console.log(this.chosenComponent)
    this.isOpenedWatchModalDiv = true;
  }
  editStatement(statement: StatementEntity) {
    this.isOpenedCreateModalDiv = false;
    this.isOpenedWatchModalDiv = false;
    this.chosenComponent = statement;
    this.chosenStatementId = statement.id;
    console.log(this.chosenComponent);
    console.log(this.chosenStatementId)
    this.isOpenedEditModalDiv = true;
  }

  sendEditedStatement() {
    this.chosenComponent.id = this.chosenStatementId;
    console.log(this.chosenComponent)
    // console.log(state)
    this.http.post<any>(environment.backendURL + "/api/user/update_statement", JSON.stringify(this.chosenComponent), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': localStorage.getItem("token") || ""
      },
    }).subscribe({
      next: ((response: any) => {
        console.log(response);
        this.updateStatementsInTable();
      }),
      error: ((error: any) => {
        console.log(error);
      })
    });
    this.isOpenedEditModalDiv = false;
  }

  createStatement() {
    this.isOpenedEditModalDiv = false;
    this.isOpenedWatchModalDiv = false;
    this.chosenComponent = new StatementEntity(0, "", "", "", "", new UserEntity());
    this.isOpenedCreateModalDiv = true;
  }

  sendCreatedStatement() {
    this.chosenComponent.id=100;
    this.chosenComponent.title = this.openedModalTitle;
    this.chosenComponent.content = this.openedModalContent;
    let params = new HttpParams();
    params = params.append('userId', this.currentUserId);
    console.log(this.openedModalTitle + " " + this.openedModalContent)
    this.http.post<any>(environment.backendURL + "/api/user/create_statement", JSON.stringify(this.chosenComponent), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': localStorage.getItem("token") || ""
      },
      params: params
    }).subscribe({
      next: ((response: any) => {
        console.log(response);
      }),
      error: ((error: any) => {
        console.log(error);
      })
    });
    this.isOpenedCreateModalDiv = false;
  }

  sendStatementToOperator(statementId: number) {
    let params = new HttpParams();
    params = params.append('statementId', statementId);
    this.http.post<any>(environment.backendURL + "/api/user/send_statement", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': localStorage.getItem("token") || ""
      },
      params: params
    }).subscribe({
      next: ((response: any) => {
        console.log(response);
        this.updateStatementsInTable();
      }),
      error: ((error: any) => {
        console.log(error);
      })
    });
  }

  nextPage() {
    this.offset++;
    this.updateStatementsInTable()
  }
  prevPage() {
    this.offset--;
    this.updateStatementsInTable()
  }

  refresh(): void {
    window.location.reload();
  }


}
