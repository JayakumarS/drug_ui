
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
import {MatRadioModule} from '@angular/material/radio';

import { ManufacturerMasterRoutingModule } from './manufacturer-master-routing.module';
import { AddManufacturermasterComponent } from './add-manufacturermaster/add-manufacturermaster.component';
import { ListManufacturermasterComponent } from './list-manufacturermaster/list-manufacturermaster.component';
import { DeleteManufacturerMasterComponent } from './list-manufacturermaster/delete-manufacturer-master/delete-manufacturer-master.component';
import { AddManufacturerReturnPolicyComponent } from './add-manufacturer-return-policy/add-manufacturer-return-policy.component';


@NgModule({
  declarations: [
    AddManufacturermasterComponent,
    ListManufacturermasterComponent,
    DeleteManufacturerMasterComponent,
    AddManufacturerReturnPolicyComponent
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
    ManufacturerMasterRoutingModule
  ]
})
export class ManufacturerMasterModule { }
