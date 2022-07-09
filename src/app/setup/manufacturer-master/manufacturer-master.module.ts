import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerMasterRoutingModule } from './manufacturer-master-routing.module';
import { AddManufacturermasterComponent } from './add-manufacturermaster/add-manufacturermaster.component';
import { ListManufacturermasterComponent } from './list-manufacturermaster/list-manufacturermaster.component';


@NgModule({
  declarations: [
    AddManufacturermasterComponent,
    ListManufacturermasterComponent
  ],
  imports: [
    CommonModule,
    ManufacturerMasterRoutingModule
  ]
})
export class ManufacturerMasterModule { }
