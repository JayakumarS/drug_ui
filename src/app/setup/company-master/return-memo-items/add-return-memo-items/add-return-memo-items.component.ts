import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DebitmemoService } from './../../debit-memo/debitmemo.service';
import { DebitMemo } from './../../debit-memo/debitmemo-model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-service/common.service';
import { ReturnMemoCalculatorComponent } from "./return-memo-calculator/return-memo-calculator.component";

@Component({
  selector: 'app-add-return-memo-items',
  templateUrl: './add-return-memo-items.component.html',
  styleUrls: ['./add-return-memo-items.component.sass']
})
export class AddReturnMemoItemsComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  companyList =[];
  debitMemo:DebitMemo;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor( public commonService: CommonService,public dialogRef: MatDialogRef<AddReturnMemoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private debitmemoService:DebitmemoService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog, private tokenStorage: TokenStorageService) {
    this.docForm = this.fb.group({
      entryNo: [""],
      ndcupcCode: ["", [Validators.required]],
      lotNo: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      expDate: ["", [Validators.required]],
      invoiceNo: [""],
      itemNo: [""],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
      returnTo: [""],
      manufacturer: [""],
      dosage: [""],
      estimatedValue: [""],
      strength: [""],
      returnMemoNo: [""],
      packageSize: [""],
      controlNo: [""],
      unitPackage: [""],
      upc: [""],
      return: [""],
    });

  }
  ngOnInit(): void {

    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
        this.docForm.patchValue({
          'company' : this.data,
       })

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }
  onSubmit() {
    
if (this.docForm.valid) {
  

    this.debitMemo = this.docForm.value;
    console.log(this.debitMemo);
    
    this.debitmemoService.addDebitMemo(this.debitMemo);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.dialogRef.close();
   // this.router.navigate(['/setup/debitMemo/listdebitMemo']);
  }
  }
  fetchDetails(cusCode: any): void {
    this.httpService.get(this.debitmemoService.editDebitMemo+"?company="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'company' : res.debitMemo.company,
        'returnMemoDate' : res.debitMemo.returnMemoDate,
        'returnMemoName' : res.debitMemo.returnMemoName,
        'returnMemoNo' : res.debitMemo.returnMemoNo
     })

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  
  update(){
    if (this.docForm.valid) {
    this.debitMemo = this.docForm.value;
    this.debitmemoService.debitMemoUpdate(this.debitMemo);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/debitMemo/listdebitMemo']);
  }
  }
  reset(){}

  addRow(){
    this.detailRowData=new DetailRowComponent()
    this.dataarray.push(this.detailRowData)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }
  onCancel(){
    this.dialogRef.close();
    //this.router.navigate(['/setup/debitMemo/listdebitMemo']);
   }
  



   keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getBoolean(value){
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
             return true;
         default: 
             return false;
     }
    }

    onCalculator(){
      const dialogRef = this.dialog.open(ReturnMemoCalculatorComponent, {
        disableClose: true ,
        height: "550px",
        width: "465px",
    
      });
    }
}
