import { CompanyMasterService } from './../../company-master.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-company-master',
  templateUrl: './delete-company-master.component.html',
  styleUrls: ['./delete-company-master.component.sass']
})
export class DeleteCompanyMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteCompanyMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public companyMasterService: CompanyMasterService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.companyMasterService.companyMasterDelete(this.data.companyCode);

    }
  ngOnInit(): void {
  }

}
