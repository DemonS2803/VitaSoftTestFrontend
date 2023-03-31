import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserEntity} from "../../models/user-entity";
import {UserChangeRoleDto} from "../../models/user-change-role-dto";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  offset: number;
  currentUsersInTable: UserEntity[] = [];
  constructor(private http: HttpClient) {
    this.offset=0;
  }

  ngOnInit(): void {
    this.updateUsersInTable(this.offset)
    this.offset=0;
  }

  updateUsersInTable(offset: number) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', 5);
    this.http.get<any>(environment.backendURL + "/api/admin/", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        // 'Authorization': localStorage.getItem("token") || ""
      },
      params: params
    }).subscribe({
      next: ((response: any) => {
        this.currentUsersInTable = response["content"];
        console.log(this.currentUsersInTable);
        console.log("success");
      }),
      error: ((response: any) => {
        console.log(response)
      })
    });

  }

  changeUserRole(id: number, role: string) {
    console.log(id + " " + role);
    let userdto = new UserChangeRoleDto(id, role);
    console.log(userdto.role);
    // let params = new HttpParams();
    //
    // params = params.append('newRole', role);
    // params = params.append('userId', id);
    this.http.post<any>(environment.backendURL + "/api/admin/change_role", JSON.stringify(userdto), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        // 'Authorization': localStorage.getItem("token") || ""
      }
      // params: params
    }).subscribe({
      next: ((response: any) => {
        console.log(response)

      }),
      error: ((response: any) => {
        console.log(response)
      })
    });
    this.refresh();
  }

  nextPage() {
    this.offset++;
    this.updateUsersInTable(this.offset)
  }
  prevPage() {
    this.offset--;
    this.updateUsersInTable(this.offset)
  }

  refresh(): void {
    window.location.reload();
  }
}
