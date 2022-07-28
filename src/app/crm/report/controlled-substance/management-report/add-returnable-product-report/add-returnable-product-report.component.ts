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
import { MatDialog } from '@angular/material/dialog';
import { CalculatorReturnableComponent } from './calculator-returnable/calculator-returnable.component';
import { CommonService } from 'src/app/common-service/common.service';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
@Component({
  selector: 'app-add-returnable-product-report',
  templateUrl: './add-returnable-product-report.component.html',
  styleUrls: ['./add-returnable-product-report.component.sass']
})
export class AddReturnableProductReportComponent implements OnInit {

  docForm: FormGroup;
  companyNameList: any;
  exampleDatabase: ManagementFormService | null;
  requestId: any;
  companyList =[];
  debitMemoList =[];
  listDebitMemo =[];
  searchList: any;
  
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,public deaformService:DeaformService,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService,
    public dialog: MatDialog,private snackBar: MatSnackBar,public route: ActivatedRoute,
    public commonService: CommonService,    public debitmemoService: DebitmemoService) {
      this.docForm = this.fb.group({
        company: ["", [Validators.required]],
        returnMemoNo: "",
        startDate:"",
        endDate:"",
      });
  }
 
  onOk() {
    
  }

  ngOnInit(): void {
    
   
  }

 

}


