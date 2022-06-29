import { RolesModule } from './roles/roles.module';
import { Role } from 'src/app/core/models/role';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from  './users/users.module';
const routes: Routes = [
  {
    path: "users",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./roles/roles.module").then((m) => m.RolesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
