import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWholesalerComponent } from './add-wholesaler/add-wholesaler.component';
import { ListWholesalerComponent } from './list-wholesaler/list-wholesaler.component';

const routes: Routes = [
  {
    path: "AddWholesaler/:id",
    component: AddWholesalerComponent,
  },
  {
    path: "ListWholesaler",
    component: ListWholesalerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerRoutingModule { }
