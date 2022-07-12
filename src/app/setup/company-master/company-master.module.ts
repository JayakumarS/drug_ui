import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyMasterRoutingModule } from './company-master-routing.module';
import { AddCompanyMasterComponent } from './add-company-master/add-company-master.component';
import { ListCompanyMasterComponent } from './list-company-master/list-company-master.component';


@NgModule({
  declarations: [
    AddCompanyMasterComponent,
    ListCompanyMasterComponent
  ],
  imports: [
    CommonModule,
    CompanyMasterRoutingModule
  ]
})
export class CompanyMasterModule { }
