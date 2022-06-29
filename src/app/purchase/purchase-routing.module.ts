import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
const routes: Routes = [
  {
    path: "purchaseRequest",
    loadChildren: () =>
      import("./purchase-request/purchase-request-routing.module").then((m) => m.PurchaseRequestRoutingModule),
  },

  {
    path: "lop",
    loadChildren: () =>
      import("./lop/lop-routing.module").then((m) => m.LopRoutingModule),
  },

  {
    path: "grn",
    loadChildren: () =>
      import("./grn/grn-routing.module").then((m) => m.GrnRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
     MatIconModule]
})
export class PurchaseRoutingModule { }
