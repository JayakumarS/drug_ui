import { UsersResultBean } from './../users-result-bean';
import { UsersMaster } from './../users-model';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersService } from './../users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.sass']
})
export class AddUsersComponent  implements OnInit  {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  roleList:[];
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private usersService:UsersService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      newUserName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      firstName: ["", [Validators.required]],
      lastName: [""],
      mobileNo: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      emailId: [ "",[Validators.required, Validators.email, Validators.minLength(5)],],
      uploadImg: [""],
      roles: ["", [Validators.required]],
      fileUploadUrl:[""],

    });
  }
  uploadFile(event){

  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  

  
  this.httpService.post<any>(this.usersService.addUserFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        this.docForm.patchValue({
          'fileUploadUrl': data.filePath     
         
       })
      }else{
        this.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
      
      },
      (err: HttpErrorResponse) => {
        
    });

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    console.log("Form Value", this.docForm.value);

    this.httpService.post<UsersResultBean>(this.usersService.saveUrl, this.docForm.value).subscribe(data => {
      console.log(data);
        if(data.success){
          this.showNotification(
            "snackbar-success",
            "User Added",
            "bottom",
            "center"
          );
          this.router.navigate(['/setup/users/listUsers']);
        }else{
          
        }
      },
      (err: HttpErrorResponse) => {
        
    }
    );

  }

  onCancel(){
    this.router.navigate(['/setup/users/listUsers']);
  }

  ngOnInit() {
    this.httpService.get<UsersResultBean>(this.usersService.roleListUrl).subscribe(
      (data) => {
        this.roleList = data.roleList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  
}
