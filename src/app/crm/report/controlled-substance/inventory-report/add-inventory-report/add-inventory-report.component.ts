import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from 'src/app/crm/customer-master/customer-master.service'; 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse  } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { DeaformService } from '../../dEAForm41/deaform.service';
import { DEAFormBean } from '../../dEAForm41/deaform-result-bean';
@Component({
  selector: 'app-add-inventory-report',
  templateUrl: './add-inventory-report.component.html',
  styleUrls: ['./add-inventory-report.component.sass']
})
export class AddInventoryReportComponent implements OnInit {

  inventoryForm: FormGroup;
  companyNameList: any;
  exampleDatabase: DeaformService | null;

  constructor(private fb: FormBuilder,public dialog: MatDialog,private authService: AuthService,public router: Router,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService,public deaformService:DeaformService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.inventoryForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
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
  onOk() {
    
  }

}