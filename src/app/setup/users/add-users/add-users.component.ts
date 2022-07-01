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
  edit: boolean=false;
  requestId: number;
  hide3 = true;
  agree3 = false;
  roleList:[];
  companyList:[];
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
      companyCode:["", [Validators.required]],
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
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });

    this.httpService.get<UsersResultBean>(this.usersService.roleListUrl).subscribe(
      (data) => {
        this.roleList = data.roleList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.httpService.get<any>(this.usersService.customerList).subscribe(
      (data) => {
        this.companyList = data.customerList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  fetchDetails(empId: any): void {
    this.httpService.get(this.usersService.editUsers+"?usersId="+empId).subscribe((res: any)=> {
      console.log(empId);

      this.docForm.patchValue({
        'newUserName': res.usersMasterBean.newUserName,
        'firstName': res.usersMasterBean.firstName,
        'lastName': res.usersMasterBean.lastName,
        'mobileNo': res.usersMasterBean.mobileNo,
        'emailId': res.usersMasterBean.emailId,
        'uploadImg' : res.usersMasterBean.uploadImg,
        'roles': res.usersMasterBean.roles,
        
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  
}
