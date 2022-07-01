import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDrugInfoComponent } from './add-drug-info/add-drug-info.component';
import { ListDrugInfoComponent } from './list-drug-info/list-drug-info.component';

const routes: Routes = [
  {
    path: "AddDrugInfo/:id",
    component: AddDrugInfoComponent,
  },
  {
    path: "ListDrugInfo",
    component: ListDrugInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugInfoRoutingModule { }
