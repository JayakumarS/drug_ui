import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { DeaformService } from '../deaform.service';
import { DEAFormBean } from '../deaform-result-bean';
import { InventoryformService } from '../../inventory-report/inventory-service';
import { InventoryFormBean } from '../../inventory-report/inventory-result-bean';
import { PackingFormService } from '../../packing-slip/packingSlip-service';
import { PackingFormBean } from '../../packing-slip/packingSlip-result-bean';
import { DEAForm } from '../deaform-model';

@Component({
  selector: 'app-addschedule-ii',
  templateUrl: './addschedule-ii.component.html',
  styleUrls: ['./addschedule-ii.component.sass']
})
export class AddscheduleIIComponent implements OnInit {

  docForm: FormGroup;
  companyNameList: any;
  returnMemoNoList: any;
  exampleDatabase: DeaformService | null;
  memoListDetails: any;
  memoInfoList: any;
  searchList: any;
  dEAForm:DEAForm;
  constructor(private fb: FormBuilder,public router: Router,private inventoryformService:InventoryformService,
    private httpService: HttpServiceService,public deaformService:DeaformService,private packingFormService:PackingFormService,
    public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      companyName: "",
      returnMemoNo: "",
      // controlledSubstance: "",
      startDate:"",
      endDate:"",
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

    this.httpService.get<any>(this.deaformService.returnMemoNoUrl).subscribe(
      (data) => {
        this.returnMemoNoList = data.returnMemoNo;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    // this.getMemoList();
  //  this.getMemoInfo();
  this.onSearch();
  }

  getMemoList() {
      this.httpService.get<InventoryFormBean>(this.inventoryformService.memoListUrl).subscribe(
        (data) => {
          this.memoListDetails = data.memoList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }

    getMemoInfo() {
      this.httpService.get<PackingFormBean>(this.packingFormService.memoDetailsUrl).subscribe(
        (data) => {
          this.memoInfoList = data.memoDetails;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }

  print() {
    let newWin;
    var content = document.getElementById('scheduleIIPrint').innerHTML;
    var combined = document.createElement('div');
    combined.innerHTML = content; 
    combined.id = 'new';
    newWin= window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    newWin.document.open();
        newWin.document.write(`
        <html>
        <head>
          <title>Print tab</title>            
          <meta charset="utf-8">
          <link rel="icon" type="image/x-icon" href="../favicion.png">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Base64/1.1.0/base64.min.js"></script>
  
          <style type="text/css">
            input {
                outline: 0;
                border-width: 0 0 2px;
                width: 100px;
            }
      
            @page {
                size: auto;
                margin: 5mm;
            }
            
            @media print {
              .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
                float: left;
            }
            .col-md-12 {
                  width: 100%;
            }
            .col-md-11 {
                  width: 91.66666667%;
            }
            .col-md-10 {
                  width: 83.33333333%;
            }
            .col-md-9 {
                  width: 75%;
            }
            .col-md-8 {
                  width: 66.66666667%;
            }
            .col-md-7 {
                  width: 58.33333333%;
            }
            .col-md-6 {
                  width: 50%;
            }
            .col-md-5 {
                  width: 41.66666667%;
            }
            .col-md-4 {
                  width: 33.33333333%;
            }
            .col-md-3 {
                  width: 25%;
            }
            .col-md-2 {
                  width: 16.66666667%;
            }
            .col-md-1 {
                  width: 8.33333333%;
            }
            }
        </style>
      </head>
      <body onload="window.print();window.close()">${combined.outerHTML}</body>
      </html>`        
         );
    newWin.document.close();
    }


    onSearch()
    {
      // this.httpService.get<DEAFormBean>(this.deaformService.searchListUrl).subscribe(
      //   (data) => {
      //     this.searchList = data.searchList;
      //   },
      //   (error: HttpErrorResponse) => {
      //     console.log(error.name + " " + error.message);
      //   }
      // );



      if (this.docForm.valid) {
        this.dEAForm = this.docForm.value;
        console.log(this.dEAForm);
        this.deaformService.addScheduleInfo(this.dEAForm);
      }
    }
  
}

