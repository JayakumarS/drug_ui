import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFrequencyOfReturnComponent } from './add-frequency-of-return/add-frequency-of-return.component';
import { AddNonReturnableProductReportComponent } from './add-non-returnable-product-report/add-non-returnable-product-report.component';
import { AddReconcilliationReportComponent } from './add-reconcilliation-report/add-reconcilliation-report.component';
import { AddReturnableProductReportComponent } from './add-returnable-product-report/add-returnable-product-report.component';

const routes: Routes = [
  {
    path:'addNonReturnableProductReport',
    component: AddNonReturnableProductReportComponent
  },
  {
    path:'addReturnableProductReport',
    component: AddReturnableProductReportComponent
  },
  {
    path:'addFrequencyOfReturn',
    component: AddFrequencyOfReturnComponent
  },
  {
    path:'addReconcilliationReport',
    component: AddReconcilliationReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementReportRoutingModule { }
