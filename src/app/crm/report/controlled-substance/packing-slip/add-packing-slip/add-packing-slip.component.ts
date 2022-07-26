import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model';
import { DeaformService } from '../../deaform41/deaform.service'; 
import { PackingFormService } from '../packingSlip-service';
import { PackingFormBean } from '../packingSlip-result-bean';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonService } from 'src/app/common-service/common.service';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ManufacturerFormBean } from '../manufacturer-result-bean';
import { ManufacturerFormService } from '../manufacturer-service';
@Component({
  selector: 'app-add-packing-slip',
  templateUrl: './add-packing-slip.component.html',
  styleUrls: ['./add-packing-slip.component.sass']
})
export class AddPackingSlipComponent implements OnInit {

  packingForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  customerMaster:CustomerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  allSelected: any;
  userTypeFilters: any;
  companyNameList: any;
  exampleDatabase: PackingFormService | null;
  exampleData: ManufacturerFormService | null;
  memoListDetails: any;
  memoInfoList: any;
  companyList =[];
  debitMemoList =[];
  manufacturerList =[];
  listDebitMemo =[];
  searchList: any;
  nonSearchList: any;
  docForm: FormGroup;
  packingList: any;
  manufacturerAddressList: any;
  dropdownSettings:IDropdownSettings={};
  hideFlag = false;
  
  constructor(private fb: FormBuilder,public router: Router, private packingFormService:PackingFormService, private manufacturerFormService:ManufacturerFormService,
   private httpService: HttpServiceService,public deaformService:DeaformService,
   public commonService: CommonService,    public debitmemoService: DebitmemoService
   ,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      company: ["", [Validators.required]],
      returnMemoNo: "",
      startDate:"",
      endDate:"",
      manufactureName:"",
    });
  }

  ngOnInit() {

        this.dropdownSettings = {
       singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    
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

      
      this.httpService.get<any>(this.commonService.getManufacturerList).subscribe(
        (data) => {
          this.manufacturerList = data.manufacturerList;
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

  hide()
  {
   this.hideFlag=true;

  }

  onItemSelect(roles: any) {
    console.log(roles);
    this.getManufacturer(roles.id);
  }
  onSelectAll(roles: any) {
    console.log(roles);
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

  

    
toggleAllSelection() {
  if (this.allSelected) {
    this.packingForm.controls.userType
    .patchValue([...this.userTypeFilters.map(item => item.key), 0]);
  } else {
    this.packingForm.controls.userType;
  }
}
 


getManufacturer(manufacturercode){
  this.httpService.get<any>(this.manufacturerFormService.manufacturerAddressUrl+"?manufacturercode="+manufacturercode).subscribe(
    (data) => {
      this.manufacturerAddressList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
    );
  }

print() {
  let newWin;
  var content = document.getElementById('packingSlipPrint').innerHTML;
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
          PDF.save('PackingSlip.pdf');
        });
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
  
    
}


