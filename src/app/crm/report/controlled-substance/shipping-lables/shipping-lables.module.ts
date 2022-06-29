import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingLablesRoutingModule } from './shipping-lables-routing.module';
import { AddShippingLablesComponent } from './add-shipping-lables/add-shipping-lables.component';


@NgModule({
  declarations: [
    AddShippingLablesComponent
  ],
  imports: [
    CommonModule,
    ShippingLablesRoutingModule
  ]
})
export class ShippingLablesModule { }
