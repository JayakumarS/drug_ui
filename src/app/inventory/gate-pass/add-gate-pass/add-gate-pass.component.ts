import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { GatePassService } from '../gate-pass.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GatePass } from '../gate-pass-model';

@Component({
  selector: 'app-add-gate-pass',
  templateUrl: './add-gate-pass.component.html',
  styleUrls: ['./add-gate-pass.component.sass']
})
export class AddGatePassComponent implements OnInit {
docForm: FormGroup;
  gatePass:GatePass;
  hide3 = true;
  agree3 = false;
  requestId: number;
  dataarray=[];
  itemList = [];
  dataarray1=[];
  gatePassdtlBean = [];
  cusMasterData =[];
  salesEntryData=[];
  minDate: any;
  
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean=false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public router:Router,
    private gatePassService : GatePassService,
    public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,) {

   
    
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
 
       this.fetchDetails(this.requestId) ;
      }
     });
     this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      organizationName: ["", [Validators.required]],
      manualGatePassNumber: ["", [Validators.required]],
      location: ["", [Validators.required]],
      gatePassDate: ["", [Validators.required]],
      address: ["",[Validators.required]],
      deliveryOrderNo: ["",[Validators.required]],
      party: ["",[Validators.required]],
      invoiceNo: ["",[Validators.required]],
      modeOfDelivery:["",[Validators.required]],
      vendor:["",[Validators.required]],
      personName:["",[Validators.required]],
      purchaseOrder: ["",[Validators.required]],
      reasonRemarks: ["",[Validators.required]],
     // workOrderDtlData:this.fb.array([this.createWorkOrderDtl()])
     gatePassdtlBean: this.fb.array([
      this.fb.group({
        outItemName:["", [Validators.required]],
        uom:[""],
        quantity:[""],
        alternateUOM:[""],
        alternateQuantity:[""],
        inItemName:[""],
        inVendorUOM:[""],
        receivingVendorQty:[""],
        comvertePurchaseQty:[""],
        approximateValue:[""],
        description:[""],
        action:[""],
       

      })
     ])

    });
    
     this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.gatePassdtlBean)

  }

 // Edit
 fetchDetails(countValue: any): void {
  this.httpService.get(this.gatePassService.editGatePass+"?gatePass="+countValue).subscribe((res: any)=> {
    console.log(countValue);

    this.docForm.patchValue({
      
      'organizationName': res.salesOrderBean.customer,
      'manualGatePassNumber' : res.salesOrderBean.customer,
      'location':res.salesOrderBean.customer,
      'gatePassDate':res.salesOrderBean.customer,
      'address':res.salesOrderBean.customer,
      'deliveryOrderNo':res.salesOrderBean.customer,
      'party': res.salesOrderBean.customer,
      'invoiceNo': res.salesOrderBean.customer,
      'modeOfDelivery':res.salesOrderBean.customer,
      'vendor':res.salesOrderBean.customer,
      'personName':res.salesOrderBean.customer,
      'purchaseOrder':res.salesOrderBean.customer,
      'reasonRemarks':res.salesOrderBean.customer,
      
   })

   let gatePassdtlArray = this.docForm.controls.gatePassdtlBean as FormArray;
   gatePassdtlArray.removeAt(0);
  res.gatePassdtlBean.forEach(element => {
      let gatePassdtlArray = this.docForm.controls.gatePassdtlBean as FormArray;
      let arraylen = gatePassdtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
     
      outItemName:[element.outItemName],
      uom:[element.uom],
      quantity:[element.quantity],
      alternateUOM:[element.alternateUOM],
      alternateQuantity:[element.alternateQuantity],
      inItemName:[element.inItemName],
      inVendorUOM:[element.inVendorUOM],
      receivingVendorQty:[element.receivingVendorQty],
      comvertePurchaseQty:[element.comvertePurchaseQty],
      approximateValue:[element.approximateValue],
      description:[element.description],
      action:[element.action],
    })
    gatePassdtlArray.insert(arraylen,newUsergroup);
      
    });
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
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
  this.gatePass = this.docForm.value;
  console.log(this.gatePass);
  this.gatePassService.addGatePass(this.gatePass);
  // logger msg
  this.showNotification(
    "snackbar-success",
    "Add Record Successfully...!!!",
    "bottom",
    "center"
  );
  this.router.navigate(['/marketing/gatePass/listSalesOrder']);
}

update(){
  this.docForm.patchValue({
    'countValue': this.requestId,    
 })
  
  this.gatePass = this.docForm.value;
  this.gatePassService.UpdateGatePass(this.gatePass);
  this.showNotification(
    "snackbar-success",
    "Edit Record Successfully...!!!",
    "bottom",
    "center"
  );
  this.router.navigate(['/inventory/gatePass/listGatePass']);

}
addRow(){
  this.gatePassdtlBean= this.gatePassdtlBean;
  this.dataarray.push(this.gatePassdtlBean)

}
removeRow(index){
  this.dataarray.splice(index, 1);
}

addRow1(){

  let gatePassdtlArray = this.docForm.controls.gatePassdtlBean as FormArray;
  let arraylen = gatePassdtlArray.length;
  let newUsergroup: FormGroup = this.fb.group({
    item:[""],
    qty:[""],
    price:[""]
  })
  gatePassdtlArray.insert(arraylen,newUsergroup);


  // this.salesOrderdtlBean= this.salesOrderdtlBean;
  // this.dataarray1.push(this.salesOrderdtlBean)

}
onCancel(){
  this.router.navigate(['/inventory/gatePass/listGatePass']);
}
reset(){}

removeRow1(index){

  let gatePassdtlArray = this.docForm.controls.gatePassdtlBean as FormArray;
  gatePassdtlArray.removeAt(index);

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

