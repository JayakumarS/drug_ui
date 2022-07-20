import { ReturnMemoItemsService } from './../../return-memo-items.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-return-memo-items',
  templateUrl: './delete-return-memo-items.component.html',
  styleUrls: ['./delete-return-memo-items.component.sass']
})
export class DeleteReturnMemoItemsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteReturnMemoItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public returnMemoItemsService: ReturnMemoItemsService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.returnMemoItemsService.returnMemoItemsDelete(this.data.returnMemoNo);

    }
  ngOnInit(): void {
  }

}
