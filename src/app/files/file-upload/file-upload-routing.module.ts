import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFilesComponent} from 'src/app/files/file-upload/list-files/list-files.component';
import { AddFilesComponent } from 'src/app/files/file-upload/add-files/add-files.component';
const routes: Routes = [
  {
    path: "listFiles",
    component: ListFilesComponent,
  },{
    path: "addFiles/:id",
    component: AddFilesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
