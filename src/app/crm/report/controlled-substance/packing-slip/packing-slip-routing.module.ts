import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPackingSlipComponent } from './add-packing-slip/add-packing-slip.component';

const routes: Routes = [
  {
    path:'addPackingSlip',
    component: AddPackingSlipComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingSlipRoutingModule { }
