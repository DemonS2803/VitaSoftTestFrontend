import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AuthUserDto} from "../../models/auth-user-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient,
              private router: Router) {
    this.isRoleChoosed = false;
    this.rolesToChoose = [];
  }


  login: string = "";
  password: string = "";
  role: string = "";
  rolesToChoose: string[];
  token: string = "";
  isRoleChoosed: boolean;

  ngOnInit(): void {

  }

  sendAuthRequest() {
    let authdto = new AuthUserDto(this.login, this.password, "");
    console.log(authdto)
    this.http.post<any>(environment.backendURL + "/api/auth/login", JSON.stringify(authdto), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    }).subscribe(
      {
        next: ((response: any) => {
          console.log(response);
          this.token = response['user'].token;
          console.log(this.token);
          localStorage.setItem("login", response.user.login)
          localStorage.setItem("userId", response.user.id)
          localStorage.setItem("token", response.user.token);
          localStorage.setItem("currentRole", response['user'].role)
          this.router.navigate(["lk"]);

        }),
        error: (error => {
          console.log(authdto);
          console.log(error);
        })
      }
    )
  }

}
