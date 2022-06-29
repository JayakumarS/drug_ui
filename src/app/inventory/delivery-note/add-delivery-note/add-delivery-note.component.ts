import { Component, OnInit } from '@angular/core';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeliveryNote } from '../delivery-note.model';
import { DeliveryNoteResultBean } from '../delivery-note-result-bean';
import { DeliveryNoteService } from '../delivery-note.service';
import * as moment from 'moment';
import { BomService } from 'src/app/operations/bom/bom.service';
import { CountryMasterResultBean } from 'src/app/master/country-master/country-master-result-bean';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';

@Component({
  selector: 'app-add-delivery-note',
  templateUrl: './add-delivery-note.component.html',
  styleUrls: ['./add-delivery-note.component.sass']
})
export class AddDeliveryNoteComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  addAction = "ADD";
  updateAction = "UPDATE";
  action : any;
  deliveryOrder : DeliveryNote;
  dataarray=[];
  dataarray1=[];
  requestId: number;
  edit: boolean=false;
  deliveryNote =[];
  deliveryOrderDtlList = [];
  cusMasterData =[];
  itemList=[];
  customerList=[];
  companyList=[];
  locationList=[];
  salesDetailRowData = new SalesEntryDetailRowComponent;
  constructor(
    private fb: FormBuilder,private authService: AuthService,public router:Router,
    private deliveryNoteService : DeliveryNoteService,public route: ActivatedRoute,
    private httpService: HttpServiceService, private snackBar:MatSnackBar,) { 
   
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
      companyCode: ["", [Validators.required]],
      deliveryDate: ["", [Validators.required]],
      customerCode: ["", [Validators.required]],
      ginId: [""],
      sourceLocationid: ["",[Validators.required]],
      destinationLocationid: ["",[Validators.required]],
      purposeOfDO: ["",[Validators.required]],
      personIncharge:["",[Validators.required]],
      remarks:["",[Validators.required]],
      customerAddress:[""],
      locationAddress:[""],
      action:[""],
      deliveryNo:[""],

      deliveryOrderDtlList: this.fb.array([
        this.fb.group({
          itemId:["", [Validators.required]],
          itemQty:[""],
          ginDtlId:[""],
          deliveryNo:[""],
          userId:[""]

  
        })
       ])
    });

     this.deliveryNote.push(this.docForm)
    this.deliveryNote.push(this.deliveryOrderDtlList)

//item dropdown
this.httpService.get<DeliveryNoteResultBean>(this.deliveryNoteService.itemList).subscribe(
  (data) => {
    console.log(data);
    this.itemList = data.itemList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);
// customer dropdown 
this.httpService.get<DeliveryNoteResultBean>(this.deliveryNoteService.customerList).subscribe(
  (data) => {
    console.log(data);
    this.customerList = data.customerList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);
// company list dropdown
this.httpService.get<DeliveryNoteResultBean>(this.deliveryNoteService.companyList).subscribe(
  (data) => {
    this.companyList = data.companyList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

//location List
this.httpService.get<DeliveryNoteResultBean>(this.deliveryNoteService.locationList).subscribe(
  (data) => {
    this.locationList = data.locationList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);



    
   }
  onSubmit(){
    this.deliveryOrder = this.docForm.value;
    this.deliveryOrder.action = this.addAction;
    this.deliveryNoteService.adddeliveryNote(this.deliveryOrder);
    // this.showNotification(
    //   "snackbar-success",
    //   "Add Record Successfully...!!!",
    //   "bottom",
    //   "center");
    //   this.router.navigate(['/inventory/item-properties/list-itemproperties']);
  }
  
  fetchDetails(deliveryNo: any): void {
    this.httpService.get(this.deliveryNoteService.editDeliveryNote+"?deliveryNo="+deliveryNo).subscribe((res: any)=> {
      console.log(deliveryNo);

      this.docForm.patchValue({
        'companyCode': res.deliveryOrder.companyCode,
        'deliveryDate': res.deliveryOrder.deliveryDate,
        'customer': res.deliveryOrder.customer,
        'ginId': res.deliveryOrder.ginId,
        'sourceLocationid': res.deliveryOrder.sourceLocationid,
        'destinationLocationid': res.deliveryOrder.destinationLocationid,
        'purposeOfDO': res.deliveryOrder.purposeOfDO,
        'personIncharge': res.deliveryOrder.personIncharge,
        'remarks': res.deliveryOrder.remarks,
        'customerAddress': res.deliveryOrder.customerAddress,
         
     })

     let deliveryNoteDtlArray = this.docForm.controls.deliveryOrderDtlList as FormArray;
     deliveryNoteDtlArray.removeAt(0);
    res.deliveryOrder.deliveryOrderDtlList.forEach(element => {
        let deliveryNoteDtlArray = this.docForm.controls.deliveryOrderDtlList as FormArray;
        let arraylen = deliveryNoteDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          itemId:[element.itemId],
          itemQty:[element.itemQty],
          ginDtlId:[element.ginDtlId],
          deliveryNo:[element.deliveryNo],
          userId:[element.userId]
      })
      deliveryNoteDtlArray.insert(arraylen,newUsergroup);
        
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
  addRow1(){

    let deliveryNoteDtlArray = this.docForm.controls.deliveryOrderDtlList as FormArray;
    let arraylen = deliveryNoteDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      itemCode:["", [Validators.required]],
          itemName:[""],
          itemdesc:[""],
          quantity:[""],
          batchNo:[""],
    })
    deliveryNoteDtlArray.insert(arraylen,newUsergroup);


    // this.salesOrderdtlBean= this.salesOrderdtlBean;
    // this.dataarray1.push(this.salesOrderdtlBean)

  }
  
  removeRow1(index){

    let deliveryNoteDtlArray = this.docForm.controls.deliveryOrderDtlList as FormArray;
    deliveryNoteDtlArray.removeAt(index);

    // this.dataarray1.splice(index, 1);

  }

  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  update() {
    this.docForm.patchValue({
      'deliveryNo': this.requestId,
    })
    this.deliveryOrder = this.docForm.value;
    this.deliveryOrder.action = this.updateAction;
    this.deliveryNoteService.adddeliveryNote(this.deliveryOrder);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesQuote/listSalesQuote']);

  }

  onCancel(){
    this.router.navigate(['/inventory/deliveryNote/listDeliveryNote']);
   }

   reset(){}

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });

}
}
