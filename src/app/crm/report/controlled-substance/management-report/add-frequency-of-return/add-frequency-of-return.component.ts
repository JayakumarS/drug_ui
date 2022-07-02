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
import { ManagementFormBean } from '../management-result-bean';
import { ManagementFormService } from '../management-service';
import { DeaformService } from '../../deaform41/deaform.service'; 
@Component({
  selector: 'app-add-frequency-of-return',
  templateUrl: './add-frequency-of-return.component.html',
  styleUrls: ['./add-frequency-of-return.component.sass']
})
export class AddFrequencyOfReturnComponent implements OnInit {

 
  docForm: FormGroup;
  companyNameList: any;
  exampleDatabase: ManagementFormService | null;

  constructor(private fb: FormBuilder,public router: Router,
  private httpService: HttpServiceService,public deaformService:DeaformService
    ,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
      onlyItem: ["", [Validators.required]],
      itemsReturned: ["", [Validators.required]],
    });
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
  
  onOk() {
    
  }
}

