import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";


import { DetailRowComponent } from 'src/app/purchase/purchase-request/detail-row/detail-row.component';


import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { LopService } from '../lop.service';

import { Lop } from '../lop.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';





@Component({
  selector: 'addLop',
  templateUrl: './add-lop.component.html',
  styleUrls: ['./add-lop.component.sass']
})
export class AddLopComponent implements OnInit {
  docForm: FormGroup;
  requestId: number;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  lopDetails: [];


  purchaseRequestDetail= new DetailRowComponent;
  lop: Lop
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean=false;
  lpoDtlBeanOne: any;
  lpoDtlBeanTwo: any;
 
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public router:Router,
    private snackBar: MatSnackBar,
    private lopService: LopService,
    public route: ActivatedRoute,
    private httpService: HttpServiceService) { 
    
  }
  ngOnInit(): void {

     this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      purchaseReqNo:[""],
      organizationName: [""],
      poNumber: [""],
      requestType: [""],
      poDate: [""],
      woType: [""],
      purchaseType: [""],
      purchaseFor: [""],
      Vendor: [""],
      destinationLocation: [""],
      Advance: [""],
      currency: [""],
      costCenter: [""],
      termsConditions:[""],
      remarks: [""],
      paymentTerms:[""],
      vendorAddress: [""],
      vendorCity: [""],
      vendorState:  [""],
      vendorZip:  [""],
      vendorCountry:  [""],
      destinationAddress: [""],
      destinationCity:  [""],
      destinationState: [""],
      destinationZip:  [""],
      destinationCountry: [""],
   //  lpoDtlOnelData:this.fb.array([this.createWorkOrderDtl()])
     lpoDtlBeanOne: this.fb.array([
      this.fb.group({
        purchaseReqNo:["", [Validators.required]],
        itemCodeItemName:[""],
        itemDescription:[""],
        edd:[""],
        purchaseUOM:[""],
        purchaseQty:[""],
        vendorUOM:[""],
        vendorQty:[""],
        availableQty:[""],
        unitPrice:[""],
        oldUnitPrice:[""],
        price:[""],
        discountType:[""],
        discountPercent:[""],
        costCenter:[""],
        netPrice:[""],
        cgst:[""],
        sgst:[""],
        igst:[""],
        cgstPercent:[""],
        sgstPercent:[""],
        igstPercent:[""],
        total:[""],
        

      })
     ]),
     lpoDtlBeanTwo: this.fb.array([
      this.fb.group({
        subTotal:[""],
        discount:[""],
        cgst:[""],
        sgst:[""],
        iGST:[""],
        freight:[""],
        freightTaxPercent:[""],
        freightTotal:[""],
        otherCharges:[""],
        remarks:[""],
        total:[""],

      })
     ])

    });
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
       // this.fetchDetails(this.requestId);

      }
    });


  // Edit
  // fetchDetails(purchaseReqNo: any): void {
  //    this.httpService.get(this.lopService.editSalesOrder+"?lop="+purchaseReqNo).subscribe((res: any)=> {
  //   console.log(purchaseReqNo);

    //   this.docForm.patchValue({
    //     'customer': res.salesOrderBean.customer,
    //     'validFrom': res.salesOrderBean.validFrom,
    //     'validTo': res.salesOrderBean.validTo,
    //     'text': res.salesOrderBean.text,
    //     'currency': res.salesOrderBean.currency,
    //     'deliveryDate': res.salesOrderBean.deliveryDate,
    //     'countValue': res.salesOrderBean.countValue,
        
    //  })

    //  let lpoDtlOneArray = this.docForm.controls.salesOrderdtlBean as FormArray;
    //  lpoDtlOneArray.removeAt(0);
    // res.salesOrderdtlBean.forEach(element => {
    //     let lpoDtlOneArray = this.docForm.controls.salesOrderdtlBean as FormArray;
    //     let arraylen = lpoDtlOneArray.length;
    //     let newUsergroup: FormGroup = this.fb.group({
    //     item:[element.item],
    //     qty:[element.qty],
    //     price:[element.price]
    //   })
    //   lpoDtlOneArray.insert(arraylen,newUsergroup);
        
    //   });
    //   },
    //   (err: HttpErrorResponse) => {
    //      // error code here
    //   }
    // );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit() {
    this.lop = this.docForm.value;
    console.log(this.lop);
   // this.lopService.addLop(this.lop);
    this.showNotification(
    
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/purchase/lop/listLpo']);
  }

  update(){
    this.docForm.patchValue({
      'countValue': this.requestId,    
   })
    
    this.lop = this.docForm.value;
    this.lopService.updateLop(this.lop);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/lop/listSalesOrder']);

  }
  addRow1(){
    this.lpoDtlBeanOne= this.lpoDtlBeanOne;
    this.dataarray.push(this.lpoDtlBeanOne)

  }
  removeRow(i){
    let lpoDtlOneArray = this.docForm.controls.lpoDtlBeanOne as FormArray;
    lpoDtlOneArray.removeAt(i);
  }

  addRow11(){

    let lpoDtlOneArray = this.docForm.controls.lpoDtlBeanOne as FormArray;
    let arraylen = lpoDtlOneArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      purchaseReqNo:["", [Validators.required]],
      itemCodeItemName:[""],
      itemDescription:[""],
      edd:[""],
      purchaseUOM:[""],
      purchaseQty:[""],
      vendorUOM:[""],
      vendorQty:[""],
      availableQty:[""],
      unitPrice:[""],
      oldUnitPrice:[""],
      price:[""],
      discountType:[""],
      discountPercent:[""],
      costCenter:[""],
      netPrice:[""],
      cgst:[""],
      sgst:[""],
      igst:[""],
      cgstPercent:[""],
      sgstPercent:[""],
      igstPercent:[""],
      total:[""],
    })
    lpoDtlOneArray.insert(arraylen,newUsergroup);


    // this.salesOrderdtlBean= this.salesOrderdtlBean;
    // this.dataarray1.push(this.salesOrderdtlBean)

  }
  addRow2(){
    this.lpoDtlBeanTwo= this.lpoDtlBeanTwo;
    this.dataarray.push(this.lpoDtlBeanTwo)

  }
  removeRow2(i){
    let lpoDtlTwoArray = this.docForm.controls.lpoDtlBeanTwo as FormArray;
    lpoDtlTwoArray.removeAt(i);
  }

  addRow22(){

    let lpoDtlTwoArray = this.docForm.controls.lpoDtlBeanTwo as FormArray;
    let arraylen = lpoDtlTwoArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      subTotal:[""],
      discount:[""],
      cgst:[""],
      sgst:[""],
      iGST:[""],
      freight:[""],
      freightTaxPercent:[""],
      freightTotal:[""],
      otherCharges:[""],
      remarks:[""],
      total:[""],
    })
    lpoDtlTwoArray.insert(arraylen,newUsergroup);


    // this.salesOrderdtlBean= this.salesOrderdtlBean;
    // this.dataarray1.push(this.salesOrderdtlBean)

  }
  onCancel(){
    this.router.navigate(['/purchase/lop/listLpo']);
  }
  reset(){}
  
  removeRow1(index){

    let lpoDtlOneArray = this.docForm.controls.lpoDtlBeanOne as FormArray;
    lpoDtlOneArray.removeAt(index);

    // this.dataarray1.splice(index, 1);

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}



 