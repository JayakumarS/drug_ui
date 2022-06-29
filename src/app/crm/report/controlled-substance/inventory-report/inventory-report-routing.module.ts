import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryReportComponent } from './add-inventory-report/add-inventory-report.component';

const routes: Routes = [
  {
    path:'addInventoryReport',
    component: AddInventoryReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryReportRoutingModule { }
