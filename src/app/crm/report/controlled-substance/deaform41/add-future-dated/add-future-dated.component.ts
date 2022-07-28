import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { DeaformService } from '../deaform.service';
import { DEAFormBean } from '../deaform-result-bean';
import { CommonService } from 'src/app/common-service/common.service';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-add-future-dated',
  templateUrl: './add-future-dated.component.html',
  styleUrls: ['./add-future-dated.component.sass']
})
export class AddFutureDatedComponent implements OnInit {

  docForm: FormGroup;

  companyNameList: any;
  exampleDatabase: DeaformService | null;
  requestId: any;
  companyList =[];
  debitMemoList =[];
  listDebitMemo =[];
  searchList: any;


  constructor(private fb: FormBuilder,public router: Router,
   private httpService: HttpServiceService,public deaformService:DeaformService
    ,public route: ActivatedRoute,
    public commonService: CommonService,    public debitmemoService: DebitmemoService) {
      this.docForm = this.fb.group({
        company: ["", [Validators.required]],
        returnMemoNo: "",
        startDate:"",
        endDate:"",
      });
  }
 
 

  ngOnInit(): void {
    
  
  }

   
}


