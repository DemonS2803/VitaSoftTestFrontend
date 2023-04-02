import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LkComponent } from './lk/lk.component';
import { AdminComponent } from './lk/admin/admin.component';
import { UserComponent } from './lk/user/user.component';
import { OperatorComponent } from './lk/operator/operator.component';
import {AppRoutingModule} from "./app-routing-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './common/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LkComponent,
    AdminComponent,
    UserComponent,
    OperatorComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
