import { Component, OnInit } from "@angular/core";
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User } from "src/app/core/models/user";
import { BehaviorSubject,Observable } from 'rxjs';
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  userName : string ='';
   userObj = {};
   login:boolean=false;
   private currentUserSubject: BehaviorSubject<User>;
  private loginInfo: AuthLoginInfo;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private app:AppService,
    private tokenStorage: TokenStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      otpValue: [""]
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@software.com");
    this.authForm.get("password").setValue("admin@123");
  }
  employeeSet() {
    this.authForm.get("username").setValue("employee@software.com");
    this.authForm.get("password").setValue("employee@123");
  }
  clientSet() {
    this.authForm.get("username").setValue("client@software.com");
    this.authForm.get("password").setValue("client@123");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {

      this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.otpValue.value);


      this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {        

        if (data) {
              if(data.success){
                  setTimeout(() => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);
                this.tokenStorage.saveUserId(data.email);
                this.tokenStorage.saveDefaultRoleId(data.defaultRoleId);
                this.tokenStorage.saveDefaultRole(data.defaultRole);
                this.loading = false;  
                this.login=true;             
        //        this.router.navigate(["/admin/dashboard/main"]);
              }, 1000);
              }else{
                 this.submitted = false;
                  this.loading = false;
                  this.error = data.message;
                console.log(data.message); 
              }
              
            } else {
              this.submitted = false;
              this.loading = false;
              this.error = "Invalid Login";
            console.log(data.message);
            }
        
      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error); 
            
        }
      );

    }
  }

  verifyOtp(){
    this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.otpValue.value);
    console.log(this.loginInfo);
    this.authService.attemptOtpValidation(this.loginInfo).subscribe(
      data => {        

        if (data) {
              if(data.success){
                  setTimeout(() => {
                this.loading = false; 

               this.router.navigate(["/admin/dashboard/main"]);
              }, 1000);
              }else{
                  this.submitted = false;
                  this.loading = false;
                  this.error = data.message;
                console.log(data.message); 
              }
              
            } else {
              this.error = "Invalid OTP";
            }
        
      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error); 
            
        }
      );
  }

  resendOtpNo(){
    this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.otpValue.value);
    console.log(this.loginInfo);
    this.login=true;
    this.authService.resendOtp(this.loginInfo).subscribe(
      data => {        
       if(data) {
            if(!data.success){
              setTimeout(() => {
                this.submitted = false;
                this.loading = false;
                this.error = data.message;
          }, 1000);
          }
       }
      },
        
      );
  }

}
