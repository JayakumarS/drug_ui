import { WholesalerService } from './../../wholesaler.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-wholesaler-master',
  templateUrl: './delete-wholesaler-master.component.html',
  styleUrls: ['./delete-wholesaler-master.component.sass']
})
export class DeleteWholesalerMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteWholesalerMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public wholesalerService: WholesalerService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.wholesalerService.WholesalerMasterDelete(this.data.wholesalerCode);

    }
  ngOnInit(): void {
  }

}