import { AddRolesComponent } from './add-roles/add-roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "listRoles",
    component: ListRolesComponent,
  },{
    path: "addRoles/:id",
    component: AddRolesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
