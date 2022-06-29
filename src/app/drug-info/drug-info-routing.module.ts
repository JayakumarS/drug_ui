import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDrugManagementComponent } from './add-drug-management/add-drug-management.component';
import { ListDrugManagementComponent } from './list-drug-management/list-drug-management.component';

const routes: Routes = [
  {
    path: "listDrugManagement",component: ListDrugManagementComponent,
  },
  {
    path: "addDrugManagement/:id",component: AddDrugManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugInfoRoutingModule { }
