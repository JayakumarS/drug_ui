import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from 'src/app/crm/customer-master/customer-master.service'; 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { ManufacturePopupComponent } from './manufacture-popup/manufacture-popup.component';
import { DeaformService } from '../deaform.service';
import { DEAFormBean } from '../deaform-result-bean';
@Component({
  selector: 'app-add-manufacture-report',
  templateUrl: './add-manufacture-report.component.html',
  styleUrls: ['./add-manufacture-report.component.sass']
})
export class AddManufactureReportComponent implements OnInit {

  docForm: FormGroup;
  companyNameList: any;
  exampleDatabase: DeaformService | null;
  
  constructor(private fb: FormBuilder,public dialog: MatDialog,public router: Router,
  private httpService: HttpServiceService,public deaformService:DeaformService
    ,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
    });
  }

  onOk() {
    
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";  
    }
    const dialogRef = this.dialog.open(ManufacturePopupComponent, {
      height: "450px",
      width: "550px",
      direction: tempDirection,
    });
   
    
  }


  ngOnInit() {
    this.httpService.get<DEAFormBean>(this.deaformService.companyNameUrl).subscribe(
      (data) => {
        this.companyNameList = data.companyNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  
}


