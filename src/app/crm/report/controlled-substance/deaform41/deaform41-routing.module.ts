import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDEAForm41Component } from './add-deaform41/add-deaform41.component';
import { AddFutureDatedComponent } from './add-future-dated/add-future-dated.component';
// import { AddManufactureReportComponent } from './add-manufacture-report/add-manufacture-report.component';
// import { AddPackagingReportComponent } from './add-packaging-report/add-packaging-report.component';
import { AddscheduleIIComponent } from './addschedule-ii/addschedule-ii.component';
import { AddscheduleIIIComponent } from './addschedule-iii/addschedule-iii.component';

const routes: Routes = [
  {
    path:'addDEAForm',
    component: AddDEAForm41Component
  },
  {
    path:'addScheduleII',
    component: AddscheduleIIComponent
  },
  {
    path:'addScheduleIII',
    component: AddscheduleIIIComponent
  },
  {
    path:'addFutureDated',
    component: AddFutureDatedComponent
  },
  // {
  //   path:'addManufactureReport',
  //   component: AddManufactureReportComponent
  // },
  // {
  //   path:'addPackagingReport',
  //   component: AddPackagingReportComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DEAForm41RoutingModule { }
