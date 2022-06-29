import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from 'moment';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { GrnService } from '../../grn.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.sass']
})
export class BatchComponent implements OnInit {
  docForm: FormGroup;
  itemBatch : any;
  itemExpDate : any;
  itemManufacture : any;
  itemMrp : any;

  batchListItem : any;
  edit:boolean = false;
 

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<BatchComponent>, private snackBar: MatSnackBar,private httpService: HttpServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any, @Inject(MAT_DIALOG_DATA) public isedit: any,
    public grnService: GrnService) { }

    onNoClick(): void {
      this.dialogRef.close();
     
    }
  // confirmDelete(): void {
  //   this.grnService.workOrderDelete(this.data.workorderNo);
  //   }

  @Output() emitService  = new EventEmitter<string>();
  ngOnInit(): void {

    

    this.docForm = this.fb.group({

    batchDetails : this.fb.array([
      this.fb.group({
        batchItemId : this.data.detailData.controls.dtlItemId,
        batchItemName : this.data.detailData.controls.dtlItemName,
        batchQty : [""],
        lotNo : [""],
        expiryDate : [""],
        originalConvertedQty : 0,
        manufactureDef : [""],
        mrp : [""]
       
    })
  ])
 
  
})
let batcharray =  this.docForm.controls.batchDetails as FormArray

if (this.data.isEdit == true)
{
this.edit = true;


//this.docForm.controls.batchDetails = this.data['controls'].batchDetails['controls'];
this.data.detailData['controls'].batchDetails['controls'].forEach(element => {
    let batcharray =  this.docForm.controls.batchDetails as FormArray
    let arraylen = batcharray.length;
    let newUsergroup: FormGroup = this.fb.group({
      batchItemId : [element.value.batchItemId],
      batchItemCode : [element.value.dtlItemCode],
      batchItemName : [element.value.batchItemName],
      batchQty : [element.value.batchQty],
      lotNo : [element.value.lotNo],
      expiryDate : [element.value.expiryDate],
      originalConvertedQty : 0,
      manufactureDef : [element.value.manufactureDef],
      mrp : [element.value.mrp]
    })
  
    batcharray.insert(arraylen,newUsergroup);
  });
    batcharray.removeAt(0);
}



this.httpService.get(this.grnService.itemAttributes+"?itemId="+this.data.detailData['controls'].dtlItemCode.value).subscribe((res: any)=> {
  

 
    this.itemBatch = res.itemAttributes.itemBatch;
    this.itemExpDate = res.itemAttributes.itemExpDate;
    this.itemManufacture = res.itemAttributes.itemManufacture;
    this.itemMrp = res.itemAttributes.itemMrp;
    

  })
}
  addRow(){
    
    let batcharray = this.docForm.controls.batchDetails as FormArray;
    let arraylen = batcharray.length;
    let newUsergroup: FormGroup = this.fb.group({
      batchItemId : this.data.detailData['controls'].dtlItemId,
      batchItemCode : this.data.detailData['controls'].dtlItemCode,
      batchItemName : this.data.detailData['controls'].dtlItemName,
      batchQty : [""],
      lotNo : [""],
      expiryDate : [""],
      originalConvertedQty : 0,
      manufactureDef : [""],
      mrp : [""]
    })
    batcharray.insert(arraylen,newUsergroup);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  removeRow(index){

    let dataarray1 = this.docForm.controls.batchDetails as FormArray;
    if (index > 0){
    dataarray1.removeAt(index);
    }else {
      this.showNotification(
        "snackbar-danger",
        "Item Batch Details Should have Atleast One Row!!!",
        "top",
        "right"
      );
    }
  
  }




  saveBatchDetails(){
    var isValidDate = true;
    var isValidBatch = true;
    var validFlag = true;
    

    //this.batchListItem.forEach(value => {
      this.batchListItem = this.docForm.controls.batchDetails as FormArray;
      for (let i =0;i< this.batchListItem.length;i++) {
        if (this.batchListItem['controls'][i]['controls'].expiryDate.value != undefined && this.batchListItem['controls'][i]['controls'].expiryDate.value != null && this.batchListItem['controls'][i]['controls'].expiryDate.value != "") {
            var expDate = this.batchListItem['controls'][i]['controls'].expiryDate.value;
            expDate = expDate.split("/");
            expDate = new Date(expDate[2], expDate[1] - 1, expDate[0]);
            if (expDate < moment()) {
                isValidDate = false;
            }
        }
        if (this.itemBatch) {
            if (this.batchListItem['controls'][i]['controls'].lotNo.value == undefined || this.batchListItem['controls'][i]['controls'].lotNo.value == null || this.batchListItem['controls'][i]['controls'].lotNo.value == "") {
                isValidBatch = false;
            }
        }

    }
    if (isValidDate && isValidBatch && this.batchListItem['controls'][0]['controls'].batchQty.value != "") {
      this.emitService.emit(this.batchListItem);
      this.showNotification(
        "snackbar-success",
        "Batch Details added Successfully...!!!",
        "top",
        "right"
      );
    
      this.dialogRef.close();
        
    } else {
        if (!isValidDate) {
          this.showNotification(
            "snackbar-danger",
            "Expiry Date is less than the current date!!!",
            "top",
            "right"
          );
           
        }
        if (!isValidBatch) {
          this.showNotification(
            "snackbar-danger",
            "Please Enter Batch Number!!!",
            "top",
            "right"
          );
           
        }

    }

  }
}
