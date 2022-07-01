import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from 'src/app/crm/customer-master/customer-master.service'; 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model';
import { DeaformService } from '../../deaform41/deaform.service'; 
import { ManagementFormService } from '../management-service';
import { ManagementFormBean } from '../management-result-bean';
@Component({
  selector: 'app-add-returnable-product-report',
  templateUrl: './add-returnable-product-report.component.html',
  styleUrls: ['./add-returnable-product-report.component.sass']
})
export class AddReturnableProductReportComponent implements OnInit {

  managementForm: FormGroup;
  companyNameList: any;
  exampleDatabase: ManagementFormService | null;
  
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,public deaformService:DeaformService,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.managementForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
    });
  }
 
  onOk() {
    
  }

  ngOnInit() {
    this.httpService.get<ManagementFormBean>(this.deaformService.companyNameUrl).subscribe(
      (data) => {
        this.companyNameList = data.companyNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}


