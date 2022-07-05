import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import {MatRadioModule} from '@angular/material/radio';

import { DEAForm41RoutingModule } from './deaform41-routing.module';
import { AddDEAForm41Component } from './add-deaform41/add-deaform41.component';
import { AddscheduleIIComponent } from './addschedule-ii/addschedule-ii.component';
import { AddscheduleIIIComponent } from './addschedule-iii/addschedule-iii.component';
import { AddFutureDatedComponent } from './add-future-dated/add-future-dated.component';
// import { AddManufactureReportComponent } from './add-manufacture-report/add-manufacture-report.component';
// import { AddPackagingReportComponent } from './add-packaging-report/add-packaging-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { ManufacturePopupComponent } from './add-manufacture-report/manufacture-popup/manufacture-popup.component';


@NgModule({
  declarations: [
    AddDEAForm41Component,
    AddscheduleIIComponent,
    AddscheduleIIIComponent,
    AddFutureDatedComponent,
    // AddManufactureReportComponent,
    // AddPackagingReportComponent,
    // ManufacturePopupComponent,
    
  ],
  imports: [
    CommonModule,
    DEAForm41RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,

  ],
})
export class DEAForm41Module { }
