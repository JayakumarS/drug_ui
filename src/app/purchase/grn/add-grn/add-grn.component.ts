import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { WorkOrderResultBean } from 'src/app/operations/work-order/work-order-result-bean';
import { Grn } from '../grn.model';
import { GrnService } from '../grn.service';
import { MatDialog } from "@angular/material/dialog";
import { BatchComponent } from './batch/batch.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-grn',
  templateUrl: './add-grn.component.html',
  styleUrls: ['./add-grn.component.sass']
})
export class AddGrnComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  grn: Grn;
  batchComponent : BatchComponent;
  docForm: FormGroup;

 
  itemList=[];
  listOfItem = [];
  locationList = [];
  uomList = [];
  poList = [];
  vendorList = [];

  grnCode:number;
  edit:boolean=false;
  isRate:boolean = false;
  flag:boolean = false;
  
  totPrice : any;

  curSchQty : any;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,
    private grnService: GrnService,private httpService: HttpServiceService, public route: ActivatedRoute,public dialog: MatDialog,) {
     
      super();
  }

 

  ngOnInit(): void {  

    this.docForm = this.fb.group({
      companyId: ["", [Validators.required]],
      poId: ["",[Validators.required]],
      poType: ["", [Validators.required]],
      requestDate: ["", [Validators.required]],
      locId: ["",[Validators.required]],
      dstLocId: ["",[Validators.required]],
      costCenter: [""],
      requestedBy: [""],
      reqNumber: [""],
      poRequisition:[""],
      poRequisitionId : [""],
      dtlItemId : [""],
      grnDate:[moment().format('YYYY-MM-DD'),[Validators.required]],
      address:[""],
      city:[""],
      state:[""],
      country: [""],
      invoiceNo: [""],
      vendorId: [""],
      invoiceDate: [moment().format('YYYY-MM-DD')],
      dueDate: [""],
      delOrderNo: [""],
      description:[""],
      delOrderDate:[""],
      subTotal:[""],
      discount:[""],
      cgst:[""],
      sgst:[""],
      igst:[""],
      freight:[""],
      otherCharges:[""],
      total:[""],
      remarks:[""],
      transMode:1,
      grnCode:[""],


    poDetailData: this.fb.array([
      this.fb.group({
        dtlItemCode: [""],
        dtlItemName: [""],
        dtlItemDesc: [""],
        costcenter:[""],
        dtlPrice: [""],
        purchaseUOM: [""],
        purchaseQty:[""],
        vendorUOM:[""],
        pendingQty:[""],
        dtlQty:[""],
        convertedQty:[""],
        autoIssue:[""],
        isConvertedQtyFlag : true,
        balanceConvertedQtyNew : [""],
        dtlItemId : [""],
        dtlPODtlId : [""],
        vendorQuantity : [""],
        purReqQuantity : [""],

        batchDetails : this.fb.array([
          this.fb.group({
          batchItemId : [""],
          batchItemName : [""],
          batchQty : [""],
          lotNo : [""],
          expiryDate : [""],
          originalConvertedQty : 0,
          manufactureDef : [""],
          mrp : [""]
         
        })
        ])
      })
     ]),

    poDetailData2: this.fb.array([
      this.fb.group({
      dtlItemCode: [""],
      price: [""],
      discount: [""],
      discountPercentage:[""],
      netPrice: [""],
      taxCGST: [""],
      taxSGST:[""],
      taxIGST:[""],
      taxCGSTinPercent:[""],
      taxSGSTinPercent:[""],
      taxIGSTinPercent:[""],
      finalTotal:[""],
    })
  ]),

  scheduleData : this.fb.array([
    this.fb.group({
      select : [""],
      scheduleId : [""],
      scheduleItemCode : [""],
      scheduleItemName : [""],
      scheduleQty : [""],
      schedulePendingQty : [""],
      scheduleItemDate : [""],
      scheduleItemQty : [""],
      purReqQuantity : [""],
      vendorQuantity : [""],
      
     
  })
]),
 

 
  });

  
// this.docForm.value.poDetailData["dtlQty"].valueChanges.subscribe((value) => {
//       // called everytime when form control value is updated
//       this.docForm.value;  // call the method that you are trying to call on (change)
//    });

//source and dest loc
  this.httpService.get(this.grnService.getLocationVal).subscribe((res: any)=> {
    
      this.locationList = res.lLocationLst;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

//vendor list
this.httpService.get(this.grnService.vendorListVal).subscribe((res: any)=> {
    
  this.vendorList = res.lVendor;
},
(error: HttpErrorResponse) => {
  console.log(error.name + " " + error.message);
}
);


//uom
  this.httpService.get<WorkOrderResultBean>(this.grnService.uomListVal).subscribe(
    (data) => {
     // console.log(data);
      this.uomList = data.uomList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  //getPOListVal
  this.httpService.get(this.grnService.getPOListVal).subscribe((res: any)=> {
   
     // console.log(res);
      this.poList = res.lPurchaseOrder;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

//view   
  this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.grnCode = params.id;
     this.edit=true;
     //For User login Editable mode
     this.getEditData(this.grnCode) ;
    }
    else{
      
    }
   });

}
//vendor address
getVendorAddress(vendorId : any){
  this.httpService.get(this.grnService.vendorAddressVal+"?vendorId="+vendorId).subscribe((res: any)=> {

    this.docForm.patchValue({
      'address': res.lVendorAddressDtl[0].address,//city, state, country      
     
   })

  })

  console.log("Batch Details"  + BatchComponent);

}


selectedPOChange() {
  this.getPurchaseOrderDetails();

}
//for rate contract
getCurrentQty(scheduledata : any){
  this.curSchQty = scheduledata.get('scheduleItemQty').value;
}

getScheduleQty(scheduledata : any, isChange : any){

  let item = scheduledata.get('scheduleItemCode').value, qty = scheduledata.get('scheduleItemQty').value;

  let dataarray1  = this.docForm.get('poDetailData') as FormArray;
  if (isChange == true) {
  this.docForm.controls.poDetailData['controls'].forEach(element => {
    let dataarray1 =  this.docForm.get('poDetailData') as FormArray;
    let arraylen = dataarray1.length;
    let newUsergroup: FormGroup = this.fb.group({   
      dtlItemCode: [element.value.dtlItemCode],
        dtlItemName: [element.value.dtlItemName],
        dtlItemDesc: [element.value.dtlItemDesc],
        costcenter:[element.value.costcenter],
        dtlPrice: [element.value.dtlPrice],
        purchaseUOM: [element.value.purchaseUOM],
        purchaseQty:[element.value.purchaseQty],
        vendorUOM:[element.value.vendorUOM],
        pendingQty:[element.value.pendingQty],
        dtlQty:[element.value.dtlQty - parseInt(this.curSchQty) + parseInt(qty)],
        convertedQty:[element.value.dtlQty],
        autoIssue:[element.value.autoIssue],
        isConvertedQtyFlag : true,
        balanceConvertedQtyNew : [element.value.balanceConvertedQtyNew],
        dtlItemId : [element.value.dtlItemId],
        dtlPODtlId : [element.value.dtlPODtlId],
        vendorQuantity : [element.value.vendorQuantity],
        purReqQuantity : [element.value.purReqQuantity],

        batchDetails : this.fb.array([
          this.fb.group({
          batchItemId : [""],
          batchItemName : [""],
          batchQty : [""],
          lotNo : [""],
          expiryDate : [""],
          originalConvertedQty : 0,
          manufactureDef : [""],
          mrp : [""]
         
        })
        ])
      })

  
    dataarray1.insert(arraylen,newUsergroup);
  });
  dataarray1.removeAt(0);

  //for batch
  this.docForm.controls.poDetailData['controls'].forEach(element => {
  let dataarray4 = this.docForm.controls.poDetailData['controls'][0]['controls']['batchDetails'] as FormArray;
      let arraylen = dataarray4.length;
      element['controls'].batchDetails['controls'].forEach(ele => {       
      let newUsergroup: FormGroup = this.fb.group({
      
        batchItemId : [ele.batchItemId],
        batchItemCode : [ele.batchItemCode],
        batchItemName : [ele.batchItemName],
        batchQty : [ele.batchQty],
        lotNo : [ele.lotNo],
        expiryDate : [ele.expiryDate],
        originalConvertedQty : [ele.originalConvertedQty],
        manufactureDef : [ele.manufactureDef],
        mrp : [ele.mrp]
      })
      dataarray4.insert(arraylen, newUsergroup);
  
      
    })
    dataarray4.removeAt(0);
  });
}else {
  this.docForm.controls.poDetailData['controls'].forEach(element => {
    let dataarray1 =  this.docForm.get('poDetailData') as FormArray;
    let arraylen = dataarray1.length;
    let newUsergroup: FormGroup = this.fb.group({   
      dtlItemCode: [element.value.dtlItemCode],
        dtlItemName: [element.value.dtlItemName],
        dtlItemDesc: [element.value.dtlItemDesc],
        costcenter:[element.value.costcenter],
        dtlPrice: [element.value.dtlPrice],
        purchaseUOM: [element.value.purchaseUOM],
        purchaseQty:[element.value.purchaseQty],
        vendorUOM:[element.value.vendorUOM],
        pendingQty:[element.value.pendingQty],
        dtlQty:[element.value.dtlQty + parseInt(qty)],
        convertedQty:[element.value.dtlQty],
        autoIssue:[element.value.autoIssue],
        isConvertedQtyFlag : true,
        balanceConvertedQtyNew : [element.value.balanceConvertedQtyNew],
        dtlItemId : [element.value.dtlItemId],
        dtlPODtlId : [element.value.dtlPODtlId],
        vendorQuantity : [element.value.vendorQuantity],
        purReqQuantity : [element.value.purReqQuantity],

        batchDetails : this.fb.array([
          this.fb.group({
          batchItemId : [""],
          batchItemName : [""],
          batchQty : [""],
          lotNo : [""],
          expiryDate : [""],
          originalConvertedQty : 0,
          manufactureDef : [""],
          mrp : [""]
         
        })
        ])
      })

  
    dataarray1.insert(arraylen,newUsergroup);
  });
  dataarray1.removeAt(0);

  //for batch
  this.docForm.controls.poDetailData['controls'].forEach(element => {
    let dataarray4 = this.docForm.controls.poDetailData['controls'][0]['controls']['batchDetails'] as FormArray;
        let arraylen = dataarray4.length;
        element['controls'].batchDetails['controls'].forEach(ele => {       
        let newUsergroup: FormGroup = this.fb.group({
        
          batchItemId : [ele.batchItemId],
          batchItemCode : [ele.batchItemCode],
          batchItemName : [ele.batchItemName],
          batchQty : [ele.batchQty],
          lotNo : [ele.lotNo],
          expiryDate : [ele.expiryDate],
          originalConvertedQty : [ele.originalConvertedQty],
          manufactureDef : [ele.manufactureDef],
          mrp : [ele.mrp]
        })
        dataarray4.insert(arraylen, newUsergroup);
    
        
      })
      dataarray4.removeAt(0);
    });
}
if (scheduledata.get('scheduleItemQty').value > scheduledata.get('schedulePendingQty').value){ 
  this.showNotification(
    "snackbar-danger",
    "Receiving Qty should not Exceed Pending Qty!",
    "top",
    "right");
  }
}





  calculateConvertedQuantity(event, detailData, index : number){
  let dataarray1 = this.docForm.controls.poDetailData as FormArray;
  if (detailData.get('dtlQty').value > detailData.get('purchaseQty').value){
    this.showNotification(
      "snackbar-danger",
      "Receiving Quantity Cannot be more than Purchase Quantity!",
      "top",
      "right");

      dataarray1.value[index].dtlQty = 0;
      dataarray1.value[index].convertedQty = 0;
  }else {
      dataarray1.value[index].convertedQty = detailData.value.dtlQty;
  }

  this.uomValidation( detailData.value.purchaseUOM,detailData.value.vendorUOM,index, detailData.value.dtlQty);
}

uomValidation ( purchaseUom,vendorUom,index,recQty ) {
  let dataarray1 = this.docForm.controls.poDetailData as FormArray;
  if (purchaseUom != vendorUom){
    this.showNotification(
      "snackbar-danger",
      "Vendor UOM should be same as Purchase UOM!",
      "top",
      "right");
      dataarray1.value[index].dtlQty = 0;
      dataarray1.value[index].convertedQty = 0;
    
  }else {
     dataarray1.value[index].convertedQty = recQty;
     
  }
}


calculateTotalAmount(poDetailData, index : number, isedit : boolean){
  let dataarray1 = this.docForm.controls.poDetailData as FormArray;
  let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;

  this.docForm.controls.poDetailData['controls'].forEach(element => {
    let dataarray1 =  this.docForm.get('poDetailData') as FormArray;
    let arraylen = dataarray1.length;
    let newUsergroup: FormGroup = this.fb.group({   
      dtlItemCode: [element.value.dtlItemCode],
        dtlItemName: [element.value.dtlItemName],
        dtlItemDesc: [element.value.dtlItemDesc],
        costcenter:[element.value.costcenter],
        dtlPrice: [element.value.dtlPrice],
        purchaseUOM: [element.value.purchaseUOM],
        purchaseQty:[element.value.purchaseQty],
        vendorUOM:[element.value.vendorUOM],
        pendingQty:[element.value.pendingQty],
        dtlQty:[element.value.dtlQty],
        convertedQty:[element.value.dtlQty],
        autoIssue:[element.value.autoIssue],
        isConvertedQtyFlag : true,
        balanceConvertedQtyNew : [element.value.balanceConvertedQtyNew],
        dtlItemId : [element.value.dtlItemId],
        dtlPODtlId : [element.value.dtlPODtlId],
        vendorQuantity : [element.value.vendorQuantity],
        purReqQuantity : [element.value.purReqQuantity],

        batchDetails : this.fb.array([
          this.fb.group({
          batchItemId : [""],
          batchItemName : [""],
          batchQty : [""],
          lotNo : [""],
          expiryDate : [""],
          originalConvertedQty : 0,
          manufactureDef : [""],
          mrp : [""]
         
        })
        ])
      })

  
    dataarray1.insert(arraylen,newUsergroup);
  });
  dataarray1.removeAt(0);

  if (isedit == true){
  //for batch
  this.docForm.controls.poDetailData['controls'].forEach(element => {
    let dataarray4 = this.docForm.controls.poDetailData['controls'][0]['controls']['batchDetails'] as FormArray;
        let arraylen = dataarray4.length;
        poDetailData.batchDetails.forEach(ele => {       
        let newUsergroup: FormGroup = this.fb.group({
        
          batchItemId : [ele.batchItemId],
          batchItemCode : [ele.batchItemCode],
          batchItemName : [ele.batchItemName],
          batchQty : [ele.batchQty],
          lotNo : [ele.lotNo],
          expiryDate : [ele.expiryDate],
          originalConvertedQty : [ele.originalConvertedQty],
          manufactureDef : [ele.manufactureDef],
          mrp : [ele.mrp]
        })
        dataarray4.insert(arraylen, newUsergroup);
    
        
      })
      dataarray4.removeAt(0);
    });
}
  this.docForm.controls.poDetailData2['controls'].forEach((element, index) => {
    this.totPrice = Number(Number(dataarray1.value[index].convertedQty) * Number(dataarray1.value[index].dtlPrice)).toFixed(2)
    let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
    let arraylen = dataarray2.length;
    let newUsergroup: FormGroup = this.fb.group({
      dtlItemCode: [element.value.dtlItemCode],
      price: [Number(Number(dataarray1.value[index].convertedQty) * Number(dataarray1.value[index].dtlPrice)).toFixed(2)],
      discount: [element.value.discount],
      discountPercentage:[element.value.discountPercentage],
      netPrice: [this.totPrice - element.value.discount],
      taxCGST: [((this.totPrice - element.value.discount) * ((element.value.taxCGSTinPercent) / 100)).toFixed(2)],
      taxSGST:[((this.totPrice - element.value.discount) * ((element.value.taxSGSTinPercent) / 100)).toFixed(2)],
      taxIGST:[((this.totPrice - element.value.discount) * ((element.value.taxIGSTinPercent) / 100)).toFixed(2)],
      taxCGSTinPercent:[element.value.taxCGSTinPercent],
      taxSGSTinPercent:[element.value.taxSGSTinPercent],
      taxIGSTinPercent:[element.value.taxIGSTinPercent],
      finalTotal:[(Number(this.totPrice - element.value.discount) + Number(((this.totPrice - element.value.discount) *
         ((element.value.taxCGSTinPercent) / 100)).toFixed(2)) + Number(((this.totPrice - element.value.discount) * 
         ((element.value.taxSGSTinPercent) / 100)).toFixed(2))
          + Number(((this.totPrice - element.value.discount) * ((element.value.taxIGSTinPercent) / 100)).toFixed(2))).toFixed(2)],
  })
  dataarray2.insert(arraylen, newUsergroup);
    
  });
  dataarray2.removeAt(0);      
      
      this.calculateTotal();

   
}

calculateTotal = function() {
  let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
  var subTotal = 0;
  var totalDiscount = 0;
  var totalTax = 0;

  var totalTaxCGST = 0;
  var totalTaxSGST = 0;
  var totalTaxIGST = 0;
  for (var i = 0; i < dataarray2.length; i++) {
     
          var rowObj = dataarray2.value[i];
         
          rowObj.price = rowObj.price ? rowObj.price : 0;
          rowObj.discount = rowObj.discount ? rowObj.discount : 0;
      
          subTotal += Number(rowObj.price);

          totalDiscount += Number(rowObj.discount);
          totalTax += Number(rowObj.tax);
          
          totalTaxCGST += Number(rowObj.taxCGST);
          totalTaxSGST += Number(rowObj.taxSGST);
          totalTaxIGST += Number(rowObj.taxIGST);

      }

      totalDiscount = totalDiscount ? totalDiscount : 0;   

 
  totalTax = totalTax ? totalTax : 0;
 

  var freight = this.docForm.value.freight;
  var othercharges = this.docForm.value.otherCharges;
  
  var cal = Number(freight) + Number(othercharges) + Number(totalTaxCGST) + Number(totalTaxSGST) + Number(totalTaxIGST);
  
  var tAmount = (Number(Number(subTotal).toFixed(2)) + cal) - Number(totalDiscount.toFixed(2));

  this.docForm.patchValue({
    'subTotal': Number(subTotal).toFixed(2),
    'discount': Number(totalDiscount).toFixed(2),//TotalCal calculation
    'cgst': Number(totalTaxCGST).toFixed(2),
    'sgst':Number(totalTaxSGST).toFixed(2),
    'igst':Number(totalTaxIGST).toFixed(2),
    'total': Number(Math.round(Number(tAmount) * 100) / 100).toFixed(2),
    'freight' : Number(freight) ,
    'otherCharges' : Number(othercharges)
   
 })



}

  onSubmit() {

    this.grn = this.docForm.value;
    //if (this.docForm.valid){
      let aFormArray  = this.docForm.get('poDetailData') as FormArray;
      for (let c of aFormArray.controls) {
        if(c['controls']['dtlQty'].value == 0){
          this.flag = true;
        }
      }
    if (this.docForm.value.companyId != "" && this.docForm.value.poId != "" && this.docForm.value.grnDate != "" && this.docForm.value.poType != "" && this.docForm.value.vendorId != ""
    && this.docForm.value.transMode != "" && this.docForm.value.locId != "" && this.docForm.value.dstLocId != ""){

    if (this.flag == false){      

    this.grnService.addGRN(this.grn);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "top",
      "right");

      this.router.navigate(['/purchase/grn/listGrn']);

    }else {
      this.showNotification(
        "snackbar-danger",
        "Receiving Quantity cannot be empty!",
        "top",
        "right");
    }
   } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  
  }

  removeRow1(index){

    let dataarray1 = this.docForm.controls.poDetailData as FormArray;
    dataarray1.removeAt(index);
  
  }

removeRow2(index){
  let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
  dataarray2.removeAt(index);
  //this.dataarray2.splice(index, 1);
}

removeRow3(index){

  let dataarray3 = this.docForm.controls.scheduleData as FormArray;
  dataarray3.removeAt(index);

}

  
onCancel(){
  this.router.navigate(['/purchase/grn/listGrn']);
 }
 reset(){}

 getProductInfo(detailData : any, isEdit : any, index : any){

  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(BatchComponent, {
    height: "415px",
    width: "900px",
    data: {detailData,isEdit},
    direction: tempDirection,
  });
 

  dialogRef.componentInstance.emitService.subscribe((emmitedValue : any) => {
    let dataarray4 = this.docForm['controls'].poDetailData['controls'][0]['controls'].batchDetails as FormArray;
    dataarray4.removeAt(0);
    // do sth with emmitedValue
    for (let i =0;i< emmitedValue.length;i++) {
  //  emmitedValue.forEach(element => {
    
      let dataarray4 = this.docForm['controls'].poDetailData['controls'][0]['controls'].batchDetails as FormArray;
      let arraylen = dataarray4.length;
      let newUsergroup: FormGroup = this.fb.group({
        batchItemId: [emmitedValue['controls'][i]['controls'].batchItemId.value],
        batchItemName: [emmitedValue['controls'][i]['controls'].batchItemName.value],
        batchQty: [emmitedValue['controls'][i]['controls'].batchQty.value],
        lotNo:[emmitedValue['controls'][i]['controls'].lotNo.value],
        expiryDate: [emmitedValue['controls'][i]['controls'].expiryDate.value],
        originalConvertedQty: [emmitedValue['controls'][i]['controls'].originalConvertedQty.value],
        manufactureDef:[emmitedValue['controls'][i]['controls'].manufactureDef.value],
        mrp:[emmitedValue['controls'][i]['controls'].mrp.value],
        
    })
    dataarray4.insert(arraylen, newUsergroup);
    }
    
  });


}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  getPurchaseOrderDetails(): void {

  this.httpService.get(this.grnService.getPOListVal).subscribe((res: any)=> {
  

   this.docForm.patchValue({
     'dstLocId': res.lPurchaseOrder[0].locId,
     'poType': res.lPurchaseOrder[0].poType,//for freight and other charges - check with POD
     'freight':res.lPurchaseOrder[0].freight,
     'otherCharges':res.lPurchaseOrder[0].otherCharges,//ng-blur for CalculateTotalAmount() added
     'remarks':res.lPurchaseOrder[0].remarksforother,
     'total':res.lPurchaseOrder[0].totalAmount
     
  })

  if (res.lPurchaseOrder[0].poType == 'Rate Contract') {
      this.isRate = true;
    } else {
      this.isRate = false;
  }

  
 
  this.getPODtlList(res.lPurchaseOrder[0].id);
  this.getRequisition(res.lPurchaseOrder[0].id);
},
  (err: HttpErrorResponse) => {
    // error code here
  }
  );



}

getRequisition(poId: any): void {
  this.httpService.get(this.grnService.getRequisitionVal+"?poId="+poId).subscribe((res: any)=> {

    this.docForm.patchValue({
      'poRequisition': res.lRequisitionList[0].text,
      'poRequisitionId' : res.lRequisitionList[0].id,
     
   }) 

  },
  (err: HttpErrorResponse) => {
    // error code here
  }
  );

}

  
  getPODtlList(poId: any): void {

    this.httpService.get(this.grnService.getPODListVal+"?poId="+poId).subscribe((res: any)=> {

      let freightCheck :any= this.docForm.value.freight;
      let otherChargesCheck :any = this.docForm.value.otherCharges;

      //get GRN Freight and Other charges
                
      freightCheck = freightCheck - res.grnFreight;
      
      otherChargesCheck = otherChargesCheck - res.grnOtherCharges;         
       
      this.docForm.patchValue({
        'subTotal': res.lPurchaseOrderDtl[0].subTotal,
        'discount': res.lPurchaseOrderDtl[0].totalDiscount,//TotalCal calculation
        'cgst':res.lPurchaseOrderDtl[0].totalTaxCGST,
        'sgst':res.lPurchaseOrderDtl[0].totalTaxSGST,
        'igst':res.lPurchaseOrderDtl[0].totalTaxIGST,
        'freight': Number(freightCheck).toFixed(2),
        'otherCharges': Number(otherChargesCheck).toFixed(2)
       
     }) 
      
  

    let dataarray1 = this.docForm.controls.poDetailData as FormArray;
    dataarray1.removeAt(0);
    let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
    dataarray2.removeAt(0);

       //scheduleData - rate constract
    let dataarray3 = this.docForm.controls.scheduleData as FormArray;
    dataarray3.removeAt(0);

    //if (this.isRate == true){
    res.lPurchaseOrderDtl.forEach(element => {
        let dataarray1 = this.docForm.controls.poDetailData as FormArray;
        let arraylen = dataarray1.length;
        let newUsergroup: FormGroup = this.fb.group({
        dtlItemCode: [element.dtlItemCode],
        dtlItemName: [element.dtlItemName],
        dtlItemDesc: [element.dtlItemDesc],
        costcenter:[element.costcenter],
        dtlPrice: [element.dtlPrice],
        purchaseUOM: [element.purchaseUOM],
        purchaseQty:[element.purchaseQty],
        vendorUOM:[element.vendorUOM],
        pendingQty:[element.purchaseQty],
        dtlQty:[0],//ng-blur for calculating total
        convertedQty:[0],//converted Qty popup added with action - only when converted qty is given receiving qty can be given
        autoIssue:['N'],//default value set,
        convertedQtyFlag: true,
        balanceConvertedQtyNew : Number([element.purchaseQty]) - Number([element.convertedQty]),
        dtlItemId : [element.dtlItemId],
        dtlPODtlId : [element.dtlPODtlId],
        vendorQuantity : [element.vendorQuantity],
        purReqQuantity : [element.purReqQuantity],
        batchDetails : this.fb.array([ 
          this.fb.group({
          batchItemId : [""],
          batchItemName : [""],
          batchQty : [""],
          lotNo : [""],
          expiryDate : [""],
          originalConvertedQty : [""],
          manufactureDef : [""],
          mrp : [""]
        })  
      ]) })
      dataarray1.insert(arraylen, newUsergroup);
      
    
   });
  //}
   res.lPurchaseOrderDtl.forEach(element => {
    let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
    let arraylen = dataarray2.length;
    let newUsergroup: FormGroup = this.fb.group({
      dtlItemCode: [element.dtlItemCode],
      price: [element.price],
      discount: [element.discount],
      discountPercentage:[element.discountPercentage],
      netPrice: [element.netPrice],
      taxCGST: [element.taxCGST],
      taxSGST:[element.taxSGST],
      taxIGST:[element.taxIGST],
      taxCGSTinPercent:[element.taxCGSTinPercent],
      taxSGSTinPercent:[element.taxSGSTinPercent],
      taxIGSTinPercent:[element.taxIGSTinPercent],
      finalTotal:[element.finalTotal],
  })
  dataarray2.insert(arraylen, newUsergroup);
});


//rate contract
//if (this.isRate != true){
  res.lPurchaseOrderDtl.forEach(element => {
    let dataarray3 = this.docForm.controls.scheduleData as FormArray;
    let arraylen = dataarray3.length;
    let newUsergroup: FormGroup
    element.scheduleList.forEach(ele => { 
    
    newUsergroup = this.fb.group({
      scheduleId : [ele.scheduleId],
      scheduleItemCode: [ele.scheduleItemCode],
      scheduleItemName: [ele.scheduleItemName],
      scheduleQty: [ele.scheduleQty],
      schedulePendingQty:[ele.schedulePendingQty],
      scheduleItemQty : [ele.schedulePendingQty],
      scheduleItemDate: [ele.scheduleItemDate]
  })
  dataarray3.insert(arraylen, newUsergroup);
  
});

});
//}    
   
},
  (err: HttpErrorResponse) => {
    // error code here
  }
  );
}

getEditData(grnCode: any): void {

  this.httpService.get(this.grnService.viewGRN+"?grnCode="+grnCode).subscribe((res: any)=> {   
     
    this.docForm.patchValue({
      companyId:res.editBeanData.companyId,
      poId: res.editBeanData.poId,
      poType: res.editBeanData.poType,
      requestDate: res.editBeanData.requestDate,
      locId: res.editBeanData.locId,
      dstLocId: res.editBeanData.dstLocId,
      costCenter: res.editBeanData.costCenter,
      requestedBy: res.editBeanData.requestedBy,
      reqNumber: res.editBeanData.reqNumber,
      poRequisition:res.editBeanData.poRequisition,
      dtlItemId : res.editBeanData.dtlItemId,
      address:res.editBeanData.vendorAddress,
      city:res.editBeanData.city,
      state:res.editBeanData.state,
      country: res.editBeanData.country,
      invoiceNo: res.editBeanData.invoiceNo,
      vendorId: res.editBeanData.vendorId,      
      delOrderNo:res.editBeanData.delOrderNo,
      description:res.editBeanData.description,     
      remarks:res.editBeanData.remarksforother,
      transMode:res.editBeanData.transMode,
      grnCode : res.editBeanData.grnCode
   
   }) 
   if (res.editBeanData.grnDate != '0001-01-01' && res.editBeanData.invoiceDate != '0001-01-01' && res.editBeanData.delOrderDate != '0001-01-01' && res.editBeanData.dueDate != '0001-01-01') {
    this.docForm.patchValue({
      grnDate : res.editBeanData.grnDate,
      DelOrderDate:res.editBeanData.delOrderDate,
      invoiceDate: res.editBeanData.invoiceDate,
      dueDate: res.editBeanData.dueDate,     
   })
   }
   
   

  let dataarray1 = this.docForm.controls.poDetailData as FormArray;
  dataarray1.removeAt(0);
  let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
  dataarray2.removeAt(0);
  let dataarray3 = this.docForm.controls.scheduleData as FormArray;
  dataarray3.removeAt(0);


  res.editBeanData.poDetailData.forEach(element => {
   
      let dataarray1 = this.docForm.controls.poDetailData as FormArray;
      let arraylen = dataarray1.length;
      let newUsergroup: FormGroup = this.fb.group({
      dtlItemCode: [element.dtlItemCode],
      dtlItemName: [element.dtlItemName],
      dtlItemDesc: [element.dtlItemDesc],
      costcenter:[element.costcenter],
      dtlPrice: [parseFloat(element.dtlPrice).toFixed(2)],
      purchaseUOM: [element.dtlUOM],
      purchaseQty:[element.purchaseQty],
      vendorUOM:[element.vendorUOM],
      pendingQty:[element.pendingQty],
      dtlQty:[element.dtlQty],
      convertedQty:[element.convertedQty],
      autoIssue:['N'],//default value set,
      convertedQtyFlag: true,
      balanceConvertedQtyNew : Number([element.purchaseQty]) - Number([element.convertedQty]),
      dtlItemId : [element.dtlItemId],
      dtlPODtlId : [element.dtlPODtlId],
      batchDetails : this.fb.array([
      this.fb.group({
        batchItemId : [""],
        batchItemCode : [""],
        batchItemName :  [""],
        batchQty :  [""],
        lotNo :  [""],
        expiryDate :  [""],
        originalConvertedQty : [""],
        manufactureDef :  [""],
        mrp :  [""]
      })
      ])
    });
    dataarray1.insert(arraylen, newUsergroup);
  });

    res.editBeanData.poDetailData.forEach(element => {
      let dataarray4 = this.docForm.controls.poDetailData['controls'][0]['controls']['batchDetails'] as FormArray;
      let arraylen = dataarray4.length;
      element.batchDetails.forEach(ele => {       
      let newUsergroup: FormGroup = this.fb.group({
      
        batchItemId : [ele.batchItemId],
        batchItemCode : [ele.batchItemCode],
        batchItemName : [ele.batchItemName],
        batchQty : [ele.batchQty],
        lotNo : [ele.lotNo],
        expiryDate : [ele.expiryDate],
        originalConvertedQty : [ele.originalConvertedQty],
        manufactureDef : [ele.manufactureDef],
        mrp : [ele.mrp]
      })
      dataarray4.insert(arraylen, newUsergroup);
  
      
    })
    dataarray4.removeAt(0);
   
    console.log("Batch Array",dataarray4);
    console.log("POD Detail Array",dataarray1);
  });
 

 res.editBeanData.poDetailData.forEach((element, index) => {
  let dataarray2 = this.docForm.controls.poDetailData2 as FormArray;
  let arraylen = dataarray2.length;
  let newUsergroup: FormGroup = this.fb.group({
    dtlItemCode: [element.dtlItemCode],
    price: [element.price],
    discount: [element.discount],
    discountPercentage:[element.discountPercentage],
    netPrice: [element.netPrice],
    taxCGST: [element.taxCGST],
    taxSGST:[element.taxSGST],
    taxIGST:[element.taxIGST],
    taxCGSTinPercent:[element.taxCGSTinPercent],
    taxSGSTinPercent:[element.taxSGSTinPercent],
    taxIGSTinPercent:[element.taxIGSTinPercent],
    finalTotal:[element.finalTotal],
})
dataarray2.insert(arraylen, newUsergroup);
  this.calculateTotalAmount( element, index, this.edit);
});

res.editBeanData.poDetailData.forEach(element => {
  let dataarray3 = this.docForm.controls.scheduleData as FormArray;
  let arraylen = dataarray3.length;
  let newUsergroup: FormGroup
  element.scheduleList.forEach(ele => { 
  
  newUsergroup = this.fb.group({
    scheduleId : [ele.scheduleId],
    scheduleItemCode: [ele.scheduleItemCode],
    scheduleItemName: [ele.scheduleItemName],
    scheduleQty: [ele.scheduleQty],
    schedulePendingQty:[ele.schedulePendingQty],
    scheduleItemQty : [ele.schedulePendingQty],
    scheduleItemDate: [ele.scheduleItemDate]
})
dataarray3.insert(arraylen, newUsergroup);

});

});
   
 
},
(err: HttpErrorResponse) => {
  // error code here
}
);
}

}
