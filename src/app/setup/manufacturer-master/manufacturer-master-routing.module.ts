import { AddManufacturermasterComponent } from './add-manufacturermaster/add-manufacturermaster.component';
import { ListManufacturermasterComponent } from './list-manufacturermaster/list-manufacturermaster.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "listManufacturermaster",
    component: ListManufacturermasterComponent,
  },{
    path: "addManufacturermaster/:id",
    component: AddManufacturermasterComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerMasterRoutingModule { }
