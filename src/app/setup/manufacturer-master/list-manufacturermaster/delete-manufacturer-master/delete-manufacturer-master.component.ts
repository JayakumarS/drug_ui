import { ManufacturerService } from './../../manufacturer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-manufacturer-master',
  templateUrl: './delete-manufacturer-master.component.html',
  styleUrls: ['./delete-manufacturer-master.component.sass']
})
export class DeleteManufacturerMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteManufacturerMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manufacturerService: ManufacturerService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.manufacturerService.manufacturerMasterDelete(this.data.manufacturerCode);

    }
  ngOnInit(): void {
  }

}