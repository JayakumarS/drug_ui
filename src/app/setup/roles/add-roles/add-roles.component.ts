
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RolesResultBean } from './../roles-result-bean';
import { RolesMaster } from './../roles-model';
import { RolesService } from './../roles.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.sass']
})
export class AddRolesComponent implements OnInit{

  docForm: FormGroup;
  edit: boolean=false;
  requestId: number;
  constructor( private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private rolesService:RolesService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      roleName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      remarks: [""],
      userName: this.tokenStorage.getUsername()
    });
  }
  onSubmit() {
    console.log("Form Role Value", this.docForm.value);

    this.httpService.post<RolesResultBean>(this.rolesService.saveUrl, this.docForm.value).subscribe(data => {
      console.log(data);
        if(data.success){
          this.showNotification(
            "snackbar-success",
            "Role Added.",
            "top",
            "right");
          this.router.navigate(['/setup/roles/listRoles']);
        }else{
          
        }
      },
      (err: HttpErrorResponse) => {
        
    });

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onCancel(){
    this.router.navigate(['/setup/roles/listRoles']);
  }
  ngOnInit(): void {
    
     this.route.params.subscribe(params => {
       if(params.id!=undefined && params.id!=0){
        this.requestId = params.id;
        this.edit=true;
        //For User login Editable mode
        this.fetchDetails(this.requestId) ;
       }
      });
 
 
      
   }


   fetchDetails(id: any): void {
    this.httpService.get(this.rolesService.editUrl+"?id="+id).subscribe((res: any)=> {
      console.log(id);

      this.docForm.patchValue({
        'roleName': res.rolesMasterBean.roleName,
        'remarks': res.rolesMasterBean.remarks
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
