import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { InventoryformService } from '../../inventory-report/inventory-service';
import { InventoryFormBean } from '../../inventory-report/inventory-result-bean';
import { PackingFormService } from '../../packing-slip/packingSlip-service';
import { CommonService } from 'src/app/common-service/common.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { DeaformService } from '../../deaform41/deaform.service';
import { DEAForm } from '../../deaform41/deaform-model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-inventory-report',
  templateUrl: './add-inventory-report.component.html',
  styleUrls: ['./add-inventory-report.component.sass']
})
export class AddInventoryReportComponent implements OnInit {
  [x: string]: any;

  @ViewChild('htmlData') htmlData!: ElementRef;

  docForm: FormGroup;
  exampleDatabase: DeaformService | null;
  dEAForm:DEAForm;
  requestId: any;
  searchList=[];
  nonSearchList=[];
  companyList =[];
  debitMemoList =[];
  hideFlag = false;

  constructor(private fb: FormBuilder,public router: Router,private inventoryformService:InventoryformService,
    private httpService: HttpServiceService,public deaformService:DeaformService,private packingFormService:PackingFormService,
    public route: ActivatedRoute,    public commonService: CommonService,    public debitmemoService: DebitmemoService

    ) {
    this.docForm = this.fb.group({
      company: ["", [Validators.required]],
      returnMemoNo: "",
      // controlledSubstance: "",
      startDate:"",
      endDate:"",
    });
  }
 

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };


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

      

        setTimeout(() => {
        this.debitMemoDropdownList(this.requestId);
        this.searchData();
      }, 700);
  }



  debitMemoDropdownList(companyId){
  this.httpService.get<any>(this.commonService.getdebitMemoDropdownList+"?companyId="+companyId).subscribe(
    (data) => {
      this.debitMemoList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
    );
  }


  getMemoList() {
      this.httpService.get<InventoryFormBean>(this.inventoryformService.inventoryUrl).subscribe(
        (data) => {
          this.inventoryList = data.inventoryList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }

    hide()
    {
     this.hideFlag=true;
 
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


 
  
    searchData(){
      this.httpService.post<any>(this.deaformService.savedEAForm, this.docForm.value).subscribe(
        (data) => {
          this.searchList= data.listSearchBean;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );

          
        this.httpService.post<any>(this.deaformService.savedEAForm14, this.docForm.value).subscribe(
          (data) => {
            this.nonSearchList= data.nonListSearchBean;
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
          );
    }


     
    reset(){
      this.docForm.patchValue({
        'company' : '',
        'returnMemoNo' : '',
        'startDate':'',
        'endDate':'',
     })
     this.page = 1;
     this.searchData();   
     this.searchList= [];
     this.nonSearchList= [];
     this.hideFlag = false;
 }
  
    //Export PDF
   
    // public openPDF(): void {
    //   let DATA: any = document.getElementById('htmlData');
    //   html2canvas(DATA).then((canvas) => {
    //     let fileWidth = 208;
    //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //     const FILEURI = canvas.toDataURL('image/png');
    //     let PDF = new jsPDF('p', 'mm', 'a4');
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //     PDF.save('ScheduleII.pdf');
    //   });
    // }


//     //Export PDF
    openPDF() {    
    if(this.searchList.length !== 0) {
    // this.entiymasterid = sessionStorage.getItem('entityId-usec'); 
    
    this.httpService.post<any>(this.inventoryformService.exportPDF, this.docForm.value).subscribe(
           (data) => {
        let file = new Blob([data], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  } else {
    this.tostar.error('No Record Found', 'Error', {
      timeOut: 2000
    });
  }

}


exportPdf() {
   
  this.httpService.post<any>(this.inventoryformService.exportPDF, this.docForm.value).subscribe(
    (data) => {
  //     var str = removeFirstandLast(data.exportPDF);
  //     str = str.substring(1, str.toString().length() - 1);
  // html2canvas(str).then((canvas) => {
  //       let fileWidth = 208;
  //       let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //       const FILEURI = canvas.toDataURL('image/png');
  //       let PDF = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  //       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //       PDF.save('ScheduleII.pdf');
  //     });

  let newWin;
  var datanew =  data.exportPDF.replace("<\"", '<').replace(">\"", '<');
  var content = datanew.innerHTML;
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
  
}, error => {
  console.log(error);
  this.helper.errorMessage(error);
 });
  }



}

