import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-service/common.service';
import { ReturnMemoCalculatorComponent } from "./return-memo-calculator/return-memo-calculator.component";
import { ReturnMemoItems } from './../return-memo-items-model';
import { ReturnMemoItemsService } from './../return-memo-items.service';

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
  manufacturerList = [];
  returnMemoItems:ReturnMemoItems;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor( public commonService: CommonService,public dialogRef: MatDialogRef<AddReturnMemoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private returnMemoItemsService:ReturnMemoItemsService,private httpService: HttpServiceService
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
      manufacturerBy: [""],
      dosage: [""],
      estimatedValue: [""],
      strength: [""],
      availableVia: [""],
      packageSize: [""],
      controlNo: [""],
      unitPackage: [""],
      upc: [""],
      return: [""],
      returnMemoNo: [""],
      createdBy: this.tokenStorage.getUsername()
    });

  }
  ngOnInit(): void {

  if(this.data.type=='Edit'){
      this.edit=true;
 this.fetchDetails(this.data.returnMemoNo)
  }else if(this.data.type=='Add'){
    this.edit=false;
   
  }

      this.httpService.get<any>(this.commonService.getManufacturerList).subscribe(
        (data) => {
          this.manufacturerList = data.manufacturerList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );

  }
  onSubmit() {
    
if (this.docForm.valid) {
  

    this.returnMemoItems = this.docForm.value;
    console.log(this.returnMemoItems);
    
    this.returnMemoItemsService.addReturnMemoItems(this.returnMemoItems);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.dialogRef.close();
   // this.router.navigate(['/setup/returnMemoItems/listreturnMemoItems']);
  }
  }

  findAllDetailsByndcupcCode() {
    this.httpService.get(this.returnMemoItemsService.findAllDetailsByndcupcCode+"?drugInfoId="+this.docForm.value.ndcupcCode).subscribe((res: any)=> {


      this.docForm.patchValue({
 
        'manufacturerBy': res.drugInfoMasterBean.manufacturerBy,
//         'description': res.drugInfoMasterBean.description,
        'strength': res.drugInfoMasterBean.strength,
         'controlNo': res.drugInfoMasterBean.control,
//         'department': res.drugInfoMasterBean.department,
         'unitPackage': res.drugInfoMasterBean.packageSize,
//         'rxOtc': res.drugInfoMasterBean.rxOtc,
//         'unitPerPackage': res.drugInfoMasterBean.unitPerPackage,
//         'unitDose': this.getBoolean(res.drugInfoMasterBean.unitDose),
         'dosage': res.drugInfoMasterBean.dosage,
//         'unitOfMeasure': res.drugInfoMasterBean.unitOfMeasure,
//         'hazardous': this.getBoolean(res.drugInfoMasterBean.hazardous),
// 'awp': res.drugInfoMasterBean.awp,
// 'wap': res.drugInfoMasterBean.wap,
// 'myPrice': res.drugInfoMasterBean.myPrice,
     
     })

     

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.returnMemoItemsService.editReturnMemoItems+"?returnMemoNo="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'returnMemoNo' : res.returnMemoItems.returnMemoNo,
'ndcupcCode' : res.returnMemoItems.ndcupcCode,
'lotNo' : res.returnMemoItems.lotNo,
'reason' : res.returnMemoItems.reason,
'expDate' : res.returnMemoItems.expDate,
'invoiceNo' : res.returnMemoItems.invoiceNo,
'itemNo' : res.returnMemoItems.itemNo,
'quantity' : res.returnMemoItems.quantity,
'price' : res.returnMemoItems.price
     })

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  
  update(){
    if (this.docForm.valid) {
    this.returnMemoItems = this.docForm.value;
    this.returnMemoItemsService.returnMemoItemsUpdate(this.returnMemoItems);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.dialogRef.close();
   // this.router.navigate(['/setup/returnMemoItems/listreturnMemoItems']);
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
    //this.router.navigate(['/setup/returnMemoItems/listreturnMemoItems']);
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
