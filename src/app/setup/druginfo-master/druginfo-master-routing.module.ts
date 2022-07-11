import { AddDruginfoMasterComponent } from './add-druginfo-master/add-druginfo-master.component';
import { ListDruginfoMasterComponent } from './list-druginfo-master/list-druginfo-master.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "listDruginfoMaster",
    component: ListDruginfoMasterComponent,
  },{
    path: "addDruginfoMaster/:id",
    component: AddDruginfoMasterComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DruginfoMasterRoutingModule { }
