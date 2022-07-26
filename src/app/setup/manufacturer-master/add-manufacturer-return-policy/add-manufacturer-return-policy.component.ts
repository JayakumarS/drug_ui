import { AddManufactureReportComponent } from './../../../crm/report/controlled-substance/manufacture/add-manufacture-report/add-manufacture-report.component';
import { ManufacturerService } from './../manufacturer.service';
import { ManufacturerMaster } from './../manufacturer-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-manufacturer-return-policy',
  templateUrl: './add-manufacturer-return-policy.component.html',
  styleUrls: ['./add-manufacturer-return-policy.component.sass']
})
export class AddManufacturerReturnPolicyComponent  implements OnInit {

 
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  manufacturerMaster:ManufacturerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private manufacturerService:ManufacturerService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      manufacturerCode:  ["", [Validators.required]],
      noMonthsBeforeExpiration: ["", [Validators.required]],
      noMonthsAfterExpiration: ["", [Validators.required]],
      acceptReturns: ["", [Validators.required]],
      acceptPartialReturns: ["", [Validators.required]],
      acceptpercentage: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
       this.docForm.patchValue({
        'manufacturerCode': this.requestId
     })

      }
     });
  }
  onSubmit() {
  if (this.docForm.valid) {
    this.httpService.post<any>(this.manufacturerService.addManufactureReturnPolicy, this.docForm.value).subscribe(
      (data) => {
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        
        this.router.navigate(['/setup/manufacturer/listManufacturermaster']);
    
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

    
  }
}

  fetchDetails(whoCode: any): void {
    this.httpService.get(this.manufacturerService.editmanufacturerReturnPolicy+"?manufacturerId="+whoCode).subscribe((res: any)=> {
    

      this.docForm.patchValue({
        'manufacturerCode': res.manufactureReturnPolicyBean.manufacturerCode,
        'noMonthsBeforeExpiration': res.manufactureReturnPolicyBean.noMonthsBeforeExpiration,
        'noMonthsAfterExpiration': res.manufactureReturnPolicyBean.noMonthsAfterExpiration,
        'acceptReturns': this.getBoolean(res.manufactureReturnPolicyBean.acceptReturns).toString(),
        'acceptPartialReturns': this.getBoolean(res.manufactureReturnPolicyBean.acceptPartialReturns).toString(),
        'acceptpercentage': res.manufactureReturnPolicyBean.acceptpercentage,
       
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){
    if (this.docForm.valid) {
    this.manufacturerMaster = this.docForm.value;
    this.manufacturerService.manufacturerMasterUpdate(this.manufacturerMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/manufacturer/listManufacturermaster']);

  }
  }
  manufacturer() {
    this.router.navigate(['/setup/manufacturer/addManufacturerReturnPolicy/0']);
  }

  reset(){}

  addRow(){
    this.detailRowData=new DetailRowComponent()
    this.dataarray.push(this.detailRowData)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }
  onCancel(){
    this.router.navigate(['/setup/manufacturer/listManufacturermaster']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  

  getBoolean(value){
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
             return true;
         default: 
             return false;
     }
    }


}
