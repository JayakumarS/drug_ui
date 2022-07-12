import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyMasterComponent } from './add-company-master/add-company-master.component';
import { ListCompanyMasterComponent } from './list-company-master/list-company-master.component';

const routes: Routes = [
  {
    path: "listCompanyMaster",
    component: ListCompanyMasterComponent,
  },{
    path: "addCompanyMaster/:id",
    component: AddCompanyMasterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyMasterRoutingModule { }
