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
  selector: 'app-add-manufacturermaster',
  templateUrl: './add-manufacturermaster.component.html',
  styleUrls: ['./add-manufacturermaster.component.sass']
})
export class AddManufacturermasterComponent implements OnInit {

 
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
      manufacturerCode: [""],
      manufacturerName: ["", [Validators.required]],
      linkTo: ["", [Validators.required]],
      billTo: ["", [Validators.required]],
      returnService: ["", [Validators.required]],
      contact: ["", [Validators.required]],
       emailId: ["", [Validators.required]],
       departmentName: ["", [Validators.required]],
      streetName: ["", [Validators.required]],
      cityName: ["", [Validators.required]],
      stateName: ["", [Validators.required]],
      zipCode:["", [Validators.required]],
      phoneNo: ["", [Validators.required]],
      tollFreeNo: ["", [Validators.required]],
      fax: ["", [Validators.required]],
      useName: this.tokenStorage.getUsername()
     
    });
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
  onSubmit() {
  if (this.docForm.valid) {
    this.manufacturerMaster = this.docForm.value;
    console.log(this.manufacturerMaster);
    this.manufacturerService.addmanufacturerMaster(this.manufacturerMaster);
   
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    
    this.router.navigate(['/setup/manufacturer/listManufacturermaster']);

  }
}

  fetchDetails(whoCode: any): void {
    this.httpService.get(this.manufacturerService.editmanufacturerMaster+"?manufacturerId="+whoCode).subscribe((res: any)=> {
    

      this.docForm.patchValue({
        'manufacturerCode': res.manufacturerMasterBean.manufacturerCode,
        'manufacturerName': res.manufacturerMasterBean.manufacturerName,
        'linkTo': res.manufacturerMasterBean.linkTo,
        'billTo': res.manufacturerMasterBean.billTo,
        'returnService': res.manufacturerMasterBean.returnService,
        'contact': res.manufacturerMasterBean.contact,
        'emailId': res.manufacturerMasterBean.emailId,
        'departmentName': res.manufacturerMasterBean. departmentName,
        'streetName': res.manufacturerMasterBean.streetName,
        'cityName': res.manufacturerMasterBean.cityName,
        'stateName': res.manufacturerMasterBean.stateName,
        'zipCode': res.manufacturerMasterBean.zipCode,
        'phoneNo': res.manufacturerMasterBean.phoneNo,
        'tollFreeNo': res.manufacturerMasterBean.tollFreeNo,
        'fax': res.manufacturerMasterBean.fax,
       
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
  
}
