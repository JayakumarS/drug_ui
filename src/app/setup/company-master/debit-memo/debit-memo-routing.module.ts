import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDebitMemoComponent } from './list-debit-memo/list-debit-memo.component';
import { AddDebitMemoComponent } from './add-debit-memo/add-debit-memo.component';

const routes: Routes = [
  {
    path: "listDebitMemo/:id",
    component: ListDebitMemoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitMemoRoutingModule { }
