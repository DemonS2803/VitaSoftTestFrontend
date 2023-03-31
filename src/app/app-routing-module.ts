import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./lk/admin/admin.component";
import {OperatorComponent} from "./lk/operator/operator.component";


const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {path: 'admin', component: AdminComponent},
  {path: 'operators', component: OperatorComponent},
  {path: 'users', component: OperatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
