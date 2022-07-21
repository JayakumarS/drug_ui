import { UsersResultBean } from './../users-result-bean';
import { UsersMaster } from './../users-model';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersService } from './../users.service';
import { PasswordStrengthValidator } from './../../../shared/passwordPolicy';
import { MustMatch } from './../../../shared/mustMatch';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  roles:[];
 
  dropdownList = [];
  dropdownSettings:IDropdownSettings={};
  //  selectedItems = [];
  constructor( private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private usersService:UsersService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      newUserName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      firstName: ["", [Validators.required]],
      lastName: [""],
      mobileNo: ["", [Validators.required]],
      // newPassword: ["", Validators.compose([Validators.required, PasswordStrengthValidator, Validators.minLength(6)])],
      // confirmPassword: ["", [Validators.required]],
      newPassword: [""],
      confirmPassword: [""],
      emailId: [ "",[Validators.required, Validators.email, Validators.minLength(5)],],
   //   uploadImg: ["",[Validators.required]],
   //   roles: ["", [Validators.required]],
      uploadImg: [""],
      roles: [, [Validators.required]],
      fileUploadUrl:[""],
      companyCode:["", [Validators.required]],
      userName: this.tokenStorage.getUsername(),
      roleName:[""],

    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  keyPresshas(event: any) {
    // debugger;
     if (event.keyCode == 35) {
       event.preventDefault();
     }
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
    if(this.docForm.valid){
      this.httpService.post<UsersResultBean>(this.usersService.saveUrl, this.docForm.value).subscribe(data => {
        console.log(data);
          if(data.success){
            this.showNotification(
              "snackbar-success",
              "User Added",
              "top",
              "right"
            );
            this.router.navigate(['/setup/users/listUsers']);
          }else{
            
          }
        },
        (err: HttpErrorResponse) => {
          
      }
      );
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill required details.",
        "top",
        "right"
      );
    }
    

  }


  onCancel(){
    this.router.navigate(['/setup/users/listUsers']);
  }

  ngOnInit() {
 
    this.dropdownSettings = {
       singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  
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
    //    this.roleList = data.roleList;
        this.dropdownList =data.roleList
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
        'roles': res.roles,
        
     })
   
     this.dropdownList=res.roles;
      },
      (err: HttpErrorResponse) => {
       
      }
    );
  }

 
  userNameValidation(event){
    this.httpService.get<any>(this.usersService.uniqueValidateUrl+ "?tableName=" +"user_details"+"&columnName="+"emp_user_id"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['newUserName'].setErrors({ userValid: true });
      }else{
        this.docForm.controls['newUserName'].setErrors(null);
      }
    });
  }

  emailIdValidation(event){
    this.httpService.get<any>(this.usersService.uniqueValidateUrl+ "?tableName=" +"user_details"+"&columnName="+"email_id"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['emailId'].setErrors({ emailValid: true });
      }else{
        this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }

  phoneNoValidation(event){
    this.httpService.get<any>(this.usersService.uniqueValidateUrl+ "?tableName=" +"user_details"+"&columnName="+"phone_no"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['mobileNo'].setErrors({ mobileNoValid: true });
      }else{
        this.docForm.controls['mobileNo'].setErrors(null);
      }
    });
  }
  onItemSelect(roles: any) {
    console.log(roles);
  }
  onSelectAll(roles: any) {
    console.log(roles);
  }
  
}
