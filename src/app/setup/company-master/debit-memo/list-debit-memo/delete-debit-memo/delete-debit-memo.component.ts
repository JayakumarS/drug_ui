import { DebitmemoService } from './../../debitmemo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-debit-memo',
  templateUrl: './delete-debit-memo.component.html',
  styleUrls: ['./delete-debit-memo.component.sass']
})
export class DeleteDebitMemoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteDebitMemoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public debitmemoService: DebitmemoService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.debitmemoService.debitMemoDelete(this.data.returnMemoNo);

    }
  ngOnInit(): void {
  }

}