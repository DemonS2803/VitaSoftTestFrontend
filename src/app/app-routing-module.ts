import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./lk/admin/admin.component";
import {OperatorComponent} from "./lk/operator/operator.component";
import {UserComponent} from "./lk/user/user.component";
import {LkComponent} from "./lk/lk.component";
import {LoginComponent} from "./common/login/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'lk', component: LkComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'operators', component: OperatorComponent},
  {path: 'users', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
