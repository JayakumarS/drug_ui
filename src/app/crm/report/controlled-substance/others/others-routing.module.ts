import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOthersComponent } from './add-others/add-others.component';

const routes: Routes = [
  {
    path:'addOthers',
    component: AddOthersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
