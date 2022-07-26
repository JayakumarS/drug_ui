import { Component, OnInit ,HostListener} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { PasswordStrengthValidator } from 'src/app/shared/passwordPolicy';
import { UsersResultBean } from '../users-result-bean';
import { UsersService } from '../users.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UsersMaster } from '../users-model';

@Component({
  selector: 'app-change-role-pop-up',
  templateUrl: './change-role-pop-up.component.html',
  styleUrls: ['./change-role-pop-up.component.sass']
})
export class ChangeRolePopUpComponent implements OnInit {
  docForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;
  hideconfirmNewPassword = true;
  oldPwd:boolean = false;
  roleListForPopUp:any;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ChangeRolePopUpComponent>,private httpService: HttpServiceService,
    private usersService:UsersService,private tokenStorage: TokenStorageService) { 
      dialogRef.disableClose = true;
    this.docForm = this.fb.group({
      roleNamePopUp:[""]
    });

  }

  ngOnInit(): void {
    this.roleListForPopUp = JSON.parse(this.tokenStorage.getRoleName());
  }

  cancel(){
    this.dialogRef.close();
  }

  updateRole(){
    if(this.docForm.valid){

    }
    else{
     alert("Please select and submit"); 
    }
    
  }

  roleNameChange(event){
    if(event==1){
      alert("Are you sure you want to switch role");
    }
    else if(event==2){
      alert("Are you sure you want to switch role");
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
}
