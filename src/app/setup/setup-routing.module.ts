
import { DebitMemoModule } from './company-master/debit-memo/debit-memo.module';
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
  },
  {
    path: "wholesaler",
    loadChildren: () =>
      import("./wholesaler/wholesaler.module").then((m) => m.WholesalerModule),
  },
  {
    path: "manufacturer",
    loadChildren: () =>
      import("./manufacturer-master/manufacturer-master.module").then((m) => m.ManufacturerMasterModule),
  },
  {
    path: "druginfoMaster",
    loadChildren: () =>
      import("./druginfo-master/druginfo-master.module").then((m) => m.DruginfoMasterModule),
  },
  {
    path: "companyMaster",
    loadChildren: () =>
      import("./company-master/company-master.module").then((m) => m.CompanyMasterModule),
  },
  {
    path: "debitMemo",
    loadChildren: () =>
      import("./company-master/debit-memo/debit-memo.module").then((m) => m.DebitMemoModule),
  },
  {
    path: "returnMemoItems",
    loadChildren: () =>
      import("./company-master/return-memo-items/return-memo-items.module").then((m) => m.ReturnMemoItemsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SetupRoutingModule { }
