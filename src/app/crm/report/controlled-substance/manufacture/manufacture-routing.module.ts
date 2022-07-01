import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManufactureReportComponent } from './add-manufacture-report/add-manufacture-report.component';

const routes: Routes = [
  {
    path:'addManufacturerReport',
    component: AddManufactureReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureRoutingModule { }
