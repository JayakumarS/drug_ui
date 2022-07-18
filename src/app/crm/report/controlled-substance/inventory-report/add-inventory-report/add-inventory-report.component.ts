import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse  } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { DeaformService } from '../../deaform41/deaform.service'; 
import { DEAFormBean } from '../../deaform41/deaform-result-bean'; 
import { InventoryFormBean } from '../inventory-result-bean';
import { InventoryformService } from '../inventory-service';
import { PackingFormService } from '../../packing-slip/packingSlip-service';
import { PackingFormBean } from '../../packing-slip/packingSlip-result-bean';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-add-inventory-report',
  templateUrl: './add-inventory-report.component.html',
  styleUrls: ['./add-inventory-report.component.sass']
})
export class AddInventoryReportComponent implements OnInit {
 
  inventoryForm: FormGroup;
  companyNameList: any;
  memoListDetails: any;
  exampleDatabase: DeaformService | null;
  memoInfoList: any;

  constructor(private fb: FormBuilder,public dialog: MatDialog,public router: Router, private packingFormService:PackingFormService,
    private inventoryformService:InventoryformService,private httpService: HttpServiceService,public deaformService:DeaformService
    ,public route: ActivatedRoute) {
    this.inventoryForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
      startDate:"",
      endDate:"",
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
    this.getMemoList();
    this.getMemoInfo();
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

  onOk() {
    
  }

  print() {
    let newWin;
    var content = document.getElementById('inventoryPrint').innerHTML;
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
        PDF.save('Inventory.pdf');
      });
    }
  
}