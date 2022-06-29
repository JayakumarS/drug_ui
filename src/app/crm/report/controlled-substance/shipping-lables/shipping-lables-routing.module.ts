import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShippingLablesComponent } from './add-shipping-lables/add-shipping-lables.component';

const routes: Routes = [
  {
    path:'addShippingLables',
    component: AddShippingLablesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingLablesRoutingModule { }
