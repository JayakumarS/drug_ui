import { ReturnMemoItemsService } from './../../return-memo-items.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-override-repackaged-product-pop-up',
  templateUrl: './override-repackaged-product-pop-up.component.html',
  styleUrls: ['./override-repackaged-product-pop-up.component.sass']
})
export class OverrideRepackagedProductPopUpComponent implements OnInit {
  overrideRepackagedProductForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<OverrideRepackagedProductPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public fb: FormBuilder,
    public returnMemoItemsService: ReturnMemoItemsService) {
      this.overrideRepackagedProductForm = this.fb.group({
        overrideRepackagedProduct: false
      });
     }

    checkOveridePolicyAndSetValue(){
      this.dialogRef.close({ data: this.overrideRepackagedProductForm.value })
    }
  ngOnInit(): void {
  }

}
