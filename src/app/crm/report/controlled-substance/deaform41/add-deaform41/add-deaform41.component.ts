import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model'; 
import { DEAFormBean } from '../deaform-result-bean';
import { DeaformService } from '../deaform.service';
@Component({
  selector: 'app-add-deaform41',
  templateUrl: './add-deaform41.component.html',
  styleUrls: ['./add-deaform41.component.sass']
})
export class AddDEAForm41Component implements OnInit {

  docForm: FormGroup;
  companyNameList: any;
  exampleDatabase: DeaformService | null;

  constructor(private fb: FormBuilder,public deaformService:DeaformService,public router: Router,private httpService: HttpServiceService,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
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
