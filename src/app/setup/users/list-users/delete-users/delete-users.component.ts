import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.sass']
})
export class DeleteUsersComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: UsersService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.usersService.deleteUsers(this.data.empId);

    }
  ngOnInit(): void {
  }

}
