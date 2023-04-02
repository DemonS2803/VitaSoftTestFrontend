import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StatementEntity} from "../../models/statement-entity";
import {UserEntity} from "../../models/user-entity";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit{

  offset: number;
  sortParam: string = "id";
  userStatementsInTable: StatementEntity[] = [];
  isOpenedWatchModalDiv: boolean = false;
  chosenComponent: StatementEntity = new StatementEntity(0, "", "", "", "", new UserEntity());
  userLoginPart: string = "";

  constructor(private http: HttpClient) {
    this.offset = 0
  }

  ngOnInit(): void {
    this.updateStatementsInTable()
  }

  updateStatementsInTable() {
    let params = new HttpParams();
    // if (this.chosenUserId != 1)
    console.log("name part: " + this.userLoginPart);
    params = params.append('userLoginPart', this.userLoginPart);
    params = params.append('offset', this.offset);
    params = params.append('limit', 5);
    params = params.append("sortParam", this.sortParam);
    if (this.sortParam == "createdrev") {
      params = params.set("sortParam", "created");
      params = params.append("isReverseSort", true)
    }
    this.http.get<any>(environment.backendURL + "/api/operator/", {
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
  }

  watchStatement(statement: StatementEntity) {
    this.chosenComponent = statement;
    console.log(this.chosenComponent)
    this.isOpenedWatchModalDiv = true;
  }
  handleStatement(isAccepted: boolean, statementId: number) {
    let params = new HttpParams();
    params = params.append('isAccepted', isAccepted);
    params = params.append('statementId', statementId);
    this.http.post<any>(environment.backendURL + "/api/operator/handle_statement", {}, {
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
