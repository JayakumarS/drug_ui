import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleRights } from './../role-rights-model';
import { RoleRightsService } from './../role-rights.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-role-rights',
  templateUrl: './add-role-rights.component.html',
  styleUrls: ['./add-role-rights.component.sass']
})
export class AddRoleRightsComponent implements OnInit{

  docForm: FormGroup;
  edit: boolean=false;
  requestId: number;
  roleList:[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private roleRightsService:RoleRightsService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      roleName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      remarks: [""]
    });
  }
  onSubmit() {
    console.log("Form Role Value", this.docForm.value);

    this.httpService.post<any>(this.roleRightsService.saveUrl, this.docForm.value).subscribe(data => {
      console.log(data);
        if(data.success){
          alert("Record Added");
          window.history.back();
        }else{
          
        }
      },
      (err: HttpErrorResponse) => {
        
    });

  }

  onCancel(){
    window.history.back();
  }
  ngOnInit(): void {
    
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


      this.httpService.get<any>(this.roleRightsService.roleListUrl).subscribe(
        (data) => {
          this.roleList = data.roleList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      
   }

   onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

   fetchDetails(id: any): void {
    this.httpService.get(this.roleRightsService.editUrl+"?id="+id).subscribe((res: any)=> {
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
