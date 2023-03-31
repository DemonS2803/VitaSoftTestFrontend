import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LkComponent } from './lk/lk.component';
import { AdminComponent } from './lk/admin/admin.component';
import { UserComponent } from './lk/user/user.component';
import { OperatorComponent } from './lk/operator/operator.component';
import {AppRoutingModule} from "./app-routing-module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LkComponent,
    AdminComponent,
    UserComponent,
    OperatorComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
