import { AddManufacturermasterComponent } from './add-manufacturermaster/add-manufacturermaster.component';
import { ListManufacturermasterComponent } from './list-manufacturermaster/list-manufacturermaster.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManufacturerReturnPolicyComponent } from './add-manufacturer-return-policy/add-manufacturer-return-policy.component';


const routes: Routes = [
  {
    path: "listManufacturermaster",
    component: ListManufacturermasterComponent,
  },{
    path: "addManufacturermaster/:id",
    component: AddManufacturermasterComponent,
  },{
    path: "addManufacturerReturnPolicy/:id",
    component: AddManufacturerReturnPolicyComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerMasterRoutingModule { }
