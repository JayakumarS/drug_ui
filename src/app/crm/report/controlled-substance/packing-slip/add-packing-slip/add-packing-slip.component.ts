import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model';
import { DeaformService } from '../../deaform41/deaform.service'; 
import { PackingFormService } from '../packingSlip-service';
import { PackingFormBean } from '../packingSlip-result-bean';
import { InventoryFormBean } from '../../inventory-report/inventory-result-bean';
import { InventoryformService } from '../../inventory-report/inventory-service';
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
  memoListDetails: any;

  constructor(private fb: FormBuilder,public router: Router,private inventoryformService:InventoryformService,
   private httpService: HttpServiceService,public deaformService:DeaformService
   ,public route: ActivatedRoute) {
    this.packingForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
      onlyItem: ["", [Validators.required]],
      itemsReturned: ["", [Validators.required]],
      manufactureName: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.httpService.get<PackingFormBean>(this.deaformService.companyNameUrl).subscribe(
      (data) => {
        this.companyNameList = data.companyNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.route.params.subscribe(params => {
       this.toggleAllSelection();
       this.packingForm = this.fb.group({
        userType: new FormControl('')
      });
      
      const userTypeFilters = [
        {
          key: 1, value: 'Value 1',
        },
        {
          key: 2, value: 'Value 2',
        },
        {
          key: 3, value: 'Value 3',
        },
        {
          key: 4, value: 'Value 4',
        }
      ]
      
      
     });
  }
  onOk() {
    
  }

toggleAllSelection() {
  if (this.allSelected.selected) {
    this.packingForm.controls.userType
    .patchValue([...this.userTypeFilters.map(item => item.key), 0]);
  } else {
    this.packingForm.controls.userType.patchValue([]);
  }
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
}


