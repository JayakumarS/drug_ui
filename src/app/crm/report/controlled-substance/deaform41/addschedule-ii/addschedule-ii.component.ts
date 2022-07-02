import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { DeaformService } from '../deaform.service';
import { DEAFormBean } from '../deaform-result-bean';
@Component({
  selector: 'app-addschedule-ii',
  templateUrl: './addschedule-ii.component.html',
  styleUrls: ['./addschedule-ii.component.sass']
})
export class AddscheduleIIComponent implements OnInit {

  docForm: FormGroup;
  companyNameList: any;
  exampleDatabase: DeaformService | null;

  constructor(private fb: FormBuilder,public router: Router,
    private httpService: HttpServiceService,public deaformService:DeaformService
    ,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
    });
  }
 
  onOk() {
    
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

