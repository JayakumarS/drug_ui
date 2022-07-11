import { DruginfoService } from './../../druginfo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-drug-info-master',
  templateUrl: './delete-drug-info-master.component.html',
  styleUrls: ['./delete-drug-info-master.component.sass']
})
export class DeleteDrugInfoMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteDrugInfoMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public druginfoService: DruginfoService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.druginfoService.drugInfoMasterDelete(this.data.ndcupc);

    }
  ngOnInit(): void {
  }

}