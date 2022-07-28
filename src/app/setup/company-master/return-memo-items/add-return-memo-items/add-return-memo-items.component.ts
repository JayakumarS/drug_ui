import { OverrideRepackagedProductPopUpComponent } from './override-repackaged-product-pop-up/override-repackaged-product-pop-up.component';
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
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";


@Component({
  selector: 'app-add-return-memo-items',
  templateUrl: './add-return-memo-items.component.html',
  styleUrls: ['./add-return-memo-items.component.sass']
})
export class AddReturnMemoItemsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

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
  submitted: boolean=false;
  defaultNDCUPC: boolean=true;
  greenNDCUPC: boolean=false;
  redNDCUPC: boolean=false;


  constructor( public commonService: CommonService,public dialogRef: MatDialogRef<AddReturnMemoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private returnMemoItemsService:ReturnMemoItemsService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog, private tokenStorage: TokenStorageService) {
      super();
    this.docForm = this.fb.group({
      returnMemoItemsCode: [""],
      entryNo: [""],
      ndcupcCode: ["", [Validators.required]],
      lotNo: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      expDate: ["", [Validators.required]],
      invoiceNo: [""],
      itemNo: [""],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
      
      manufacturerBy: [""],
      dosage: [""],
      estimatedValue: [""],
      strength: [""],
      availableVia: [""],
      packageSize: [""],
      controlNo: [""],
      unitPackage: [""],
      description: [""],
      return: [""],
      returnMemoNo: [""],
      createdBy: this.tokenStorage.getUsername(),
     
      returnTo: [""],
      returnable: false,
      fullParticalProduct: ["", [Validators.required]],
      repackagedProduct: false,
      overrideRepackagedProduct: false
    });

  }
  ngOnInit(): void {


   

  if(this.data.type=='Edit'){
      this.edit=true;
      


 this.docForm.patchValue({
  'returnMemoNo': this.data.returnMemoNo,
  'returnMemoItemsCode': this.data.returnMemoItemsCode,
  'ndcupcCode': this.data.ndcupcCode,
})
this.fetchreturnMemoNamebyId(this.data.returnMemoNo);
this.findAllDetailsByndcupcCode();
this.fetchDetails(this.data.returnMemoItemsCode);
  }else if(this.data.type=='Add'){
    this.edit=false;
    this.fetchreturnMemoNamebyId(this.data.returnMemoNo);
    this.docForm.patchValue({
      'returnMemoNo': this.data.returnMemoNo,
    })
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
    this.submitted=true;
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
 
  fetchreturnMemoNamebyId(cusCode: any){
    this.httpService.get<any>(this.returnMemoItemsService.fetchreturnMemoNamebyId+"?returnMemoNo="+cusCode).subscribe(
      (data) => {
        this.docForm.patchValue({
          'return': data.text,
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }

  checkDrugIsReturnable(){
    this.httpService.post<any>(this.returnMemoItemsService.checkDrugIsReturnable, this.docForm.value).subscribe(
      (data) => {
        if(data.text=='YES'){
        this.docForm.patchValue({
          'returnable': true,
        })
      }else{
        if(data.text!=null){
        this.showNotification(
          "snackbar-danger",
          data.text,
          "bottom",
          "center"
        );
        }
      }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }

  

  findAllDetailsByndcupcCode() {
    this.httpService.get(this.returnMemoItemsService.findAllDetailsByndcupcCode+"?drugInfoId="+this.docForm.value.ndcupcCode).subscribe((res: any)=> {


      this.docForm.patchValue({
 
        'manufacturerBy': res.drugInfoMasterBean.manufacturerBy,
        'returnTo': res.drugInfoMasterBean.manufacturerBy,
         'description': res.drugInfoMasterBean.description,
        'strength': res.drugInfoMasterBean.strength,
         'controlNo': res.drugInfoMasterBean.control,
//         'department': res.drugInfoMasterBean.department,
         'unitPackage': res.drugInfoMasterBean.unitPerPackage,
//         'rxOtc': res.drugInfoMasterBean.rxOtc,
         'packageSize': res.drugInfoMasterBean.packageSize,
//         'unitDose': this.getBoolean(res.drugInfoMasterBean.unitDose),
         'dosage': res.drugInfoMasterBean.dosage,
//         'unitOfMeasure': res.drugInfoMasterBean.unitOfMeasure,
//         'hazardous': this.getBoolean(res.drugInfoMasterBean.hazardous),
// 'awp': res.drugInfoMasterBean.awp,
// 'wap': res.drugInfoMasterBean.wap,
// 'myPrice': res.drugInfoMasterBean.myPrice,
     
     })

     if(res.drugInfoMasterBean.control==2){
this.defaultNDCUPC=false;
this.greenNDCUPC=false;
this.redNDCUPC=true;
     }else{
      this.defaultNDCUPC=false;
      this.greenNDCUPC=true;
      this.redNDCUPC=false;
     }

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
'price' : res.returnMemoItems.price,
      'returnTo': res.returnMemoItems.returnTo,
      'returnable': this.getBoolean(res.returnMemoItems.returnable),
      'fullParticalProduct': this.getBoolean(res.returnMemoItems.fullParticalProduct).toString(),
      'repackagedProduct': this.getBoolean(res.returnMemoItems.repackagedProduct),
      'overrideRepackagedProduct': this.getBoolean(res.returnMemoItems.overrideRepackagedProduct),
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
  

   repackagedProduct(){
    
    if(this.docForm.value.repackagedProduct==false){
   
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(OverrideRepackagedProductPopUpComponent, {
     height: "270px",
     width: "400px",
     data: "22",
     direction: tempDirection,
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     
    this.docForm.patchValue({
      'repackagedProduct': data.data.overrideRepackagedProduct,
    })
   });
   
  }

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
