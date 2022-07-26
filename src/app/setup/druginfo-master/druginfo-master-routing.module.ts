import { AddDruginfoMasterComponent } from './add-druginfo-master/add-druginfo-master.component';
import { ListDruginfoMasterComponent } from './list-druginfo-master/list-druginfo-master.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDrugInfoReturnPolicyComponent } from './add-drug-info-return-policy/add-drug-info-return-policy.component';

const routes: Routes = [
  {
    path: "listDruginfoMaster",
    component: ListDruginfoMasterComponent,
  },{
    path: "addDruginfoMaster/:id",
    component: AddDruginfoMasterComponent,
  },{
    path: "addDrugInfoReturnPolicy/:id",
    component: AddDrugInfoReturnPolicyComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DruginfoMasterRoutingModule { }
