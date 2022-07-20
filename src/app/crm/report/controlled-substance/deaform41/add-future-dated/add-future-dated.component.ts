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
    
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
      }
     });


    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
        this.docForm.patchValue({
          'company' : this.requestId,
       })

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

      this.httpService.get<any>(this.commonService.getdebitMemoDropdownList).subscribe(
        (data) => {
          this.debitMemoList = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );

        setTimeout(() => {
        this.searchData();
      }, 700);

      // this.getMemoList();
      // this.getMemoInfo();
  }

  searchData(){
    this.httpService.post<any>(this.deaformService.savedEAForm, this.docForm.value).subscribe(
      (data) => {
        this.searchList= data.listSearchBean;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }

   //Export PDF
   
   public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('ScheduleII.pdf');
    });
  }
}


