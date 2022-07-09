import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DruginfoMasterRoutingModule } from './druginfo-master-routing.module';
import { AddDruginfoMasterComponent } from './add-druginfo-master/add-druginfo-master.component';
import { ListDruginfoMasterComponent } from './list-druginfo-master/list-druginfo-master.component';


@NgModule({
  declarations: [
    AddDruginfoMasterComponent,
    ListDruginfoMasterComponent
  ],
  imports: [
    CommonModule,
    DruginfoMasterRoutingModule
  ]
})
export class DruginfoMasterModule { }
