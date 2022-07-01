import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWholesalerComponent } from './list-wholesaler/list-wholesaler.component';
import { AddWholesalerComponent } from './add-wholesaler/add-wholesaler.component';

const routes: Routes = [
  // {
  //   path: "listWholesaler",component: ListWholesalerComponent,
  // },
  // {
  //   path: "addWholesaler/:id",component: AddWholesalerComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholeSalerRoutingModule { }
