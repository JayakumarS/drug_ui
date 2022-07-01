import { DEAForm41Module } from './deaform41/deaform41.module';
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
      import("./deaform41/deaform41.module").then((m) => m.DEAForm41Module),
   },
   {
    path: "inventoryReport",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./inventory-report/inventory-report.module").then((m) => m.InventoryReportModule),
   },
   {
    path: "managementReport",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./management-report/management-report.module").then((m) => m.ManagementReportModule),
   },
   {
    path: "packingSlip",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./packing-slip/packing-slip.module").then((m) => m.PackingSlipModule),
   },
   {
    path: "shippingLables",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./shipping-lables/shipping-lables.module").then((m) => m.ShippingLablesModule),
   },
   {
    path: "others",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./others/others-routing.module").then((m) => m.OthersRoutingModule),
   },
   {
    path: "manufacturerReport",
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import("./manufacture/manufacture.module").then((m) => m.ManufactureModule),
   },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlledSubstanceRoutingModule { }
