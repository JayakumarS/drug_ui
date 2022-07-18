import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReturnMemoItemsComponent } from './list-return-memo-items/list-return-memo-items.component';

const routes: Routes = [
  {
    path: "listReturnMemoItems/:id",
    component: ListReturnMemoItemsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnMemoItemsRoutingModule { }
