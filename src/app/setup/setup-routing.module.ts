import { RolesModule } from './roles/roles.module';
import { Role } from 'src/app/core/models/role';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from  './users/users.module';
import { RoleRightsModule } from './role-rights/role-rights.module';
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
  },{
    path: "rolerights",
    loadChildren: () =>
      import("./role-rights/role-rights.module").then((m) => m.RoleRightsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SetupRoutingModule { }
