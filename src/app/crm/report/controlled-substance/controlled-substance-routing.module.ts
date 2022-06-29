import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { Role } from 'src/app/core/models/role';
const routes: Routes = [
  {
    path: "dEAForm41",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./dEAForm41/dEAForm41.module").then((m) => m.DEAForm41Module),
   },
  //  {
  //   path: "inventoryReport",
  //   canActivate: [AuthGuard],
  //   data: {
  //     role: Role.Admin,
  //   },
  //   loadChildren: () =>
  //     import("./inventory-report/inventory-report.module").then((m) => m.InventoryReportModule),
  //  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlledSubstanceRoutingModule { }
