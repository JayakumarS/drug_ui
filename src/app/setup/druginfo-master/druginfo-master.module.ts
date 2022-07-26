
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRadioModule } from '@angular/material/radio';

import { DruginfoMasterRoutingModule } from './druginfo-master-routing.module';
import { AddDruginfoMasterComponent } from './add-druginfo-master/add-druginfo-master.component';
import { ListDruginfoMasterComponent } from './list-druginfo-master/list-druginfo-master.component';
import { DeleteDrugInfoMasterComponent } from './list-druginfo-master/delete-drug-info-master/delete-drug-info-master.component';
import { AddDrugInfoReturnPolicyComponent } from './add-drug-info-return-policy/add-drug-info-return-policy.component';


@NgModule({
  declarations: [
    AddDruginfoMasterComponent,
    ListDruginfoMasterComponent,
    DeleteDrugInfoMasterComponent,
    AddDrugInfoReturnPolicyComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatRadioModule,
    CommonModule,
    DruginfoMasterRoutingModule
  ]
})
export class DruginfoMasterModule { }
