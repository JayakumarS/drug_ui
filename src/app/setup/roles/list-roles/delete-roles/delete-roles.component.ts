import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../../roles.service';
@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.sass']
})
export class DeleteRolesComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rolesService: RolesService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.rolesService.deleteRoles(this.data.roleId);

    }
  ngOnInit(): void {
  }

}
