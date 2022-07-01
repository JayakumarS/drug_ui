import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from '../customer-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster } from '../customer-master.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {
  companyAuthorizedClassesForm: FormGroup;

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  customerMaster:CustomerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
wholesalerAccount:["", [Validators.required]],
wholesalerName:["", [Validators.required]],
wholesalerContact:["", [Validators.required]],
wholesalerDepartment:["", [Validators.required]],
wholesalerStreet:["", [Validators.required]],
wholesalerCity:["", [Validators.required]],

companyName:["", [Validators.required]],
companyDba:["", [Validators.required]],
companyStreet:["", [Validators.required]],
companyCity:["", [Validators.required]],
companyState:["", [Validators.required]],
companyPincode:["", [Validators.required]],
companyPhone:["", [Validators.required]],
companyFax:["", [Validators.required]],
companyContact:["", [Validators.required]],
companyEmailID:["", [Validators.required]],
companyFacilityType:["", [Validators.required]],

defNumber:["", [Validators.required]],
defExpirationDate:["", [Validators.required]],

issuesCreditsName:["", [Validators.required]],

issuesCreditsStreet:["", [Validators.required]],
issuesCreditsCity:["", [Validators.required]],
issuesCreditsState:["", [Validators.required]],
issuesCreditsZipCode:["", [Validators.required]],
issuesCreditsPhone:["", [Validators.required]],

generalInfroWacAwapMyprice:["", [Validators.required]],
generalInfroWacAwapPer:[""],

myWholesalerPolicyType:["", [Validators.required]],
myWholesalerPolicyMonths:[""],
myWholesalerCpp:["false", [Validators.required]],
cppServiceRate:["", [Validators.required]],
cppShippingRate:["", [Validators.required]],
cppNoOfChecks:["", [Validators.required]],
    });

    this.companyAuthorizedClassesForm = this.fb.group({
      companyAuthorizedClasses2: false,
      companyAuthorizedClasses2N: false,
      companyAuthorizedClasses3: false,
      companyAuthorizedClasses3N: false,
      companyAuthorizedClasses4: false,
      companyAuthorizedClasses5: false,
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
    this.customerMaster = this.docForm.value;
    console.log(this.customerMaster);
    this.customerMasterService.addCustomerMaster(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/customerMaster/listCustomer']);
  }
  }
  fetchDetails(cusCode: any): void {
    this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'wholesalerAccount':res.customerMasterBean.wholesalerAccount,
        'wholesalerName':res.customerMasterBean.wholesalerName,
        'wholesalerContact': res.customerMasterBean.wholesalerContact,
        'wholesalerDepartment': res.customerMasterBean.wholesalerDepartment,
        'wholesalerStreet': res.customerMasterBean.wholesalerStreet,
        'wholesalerCity': res.customerMasterBean.wholesalerCity,
        
        'companyName': res.customerMasterBean.companyName,
        'companyDba': res.customerMasterBean.companyDba,
        'companyStreet': res.customerMasterBean.companyStreet,
        'companyCity': res.customerMasterBean.companyCity,
        'companyState': res.customerMasterBean.companyState,
        'companyPincode': res.customerMasterBean.companyPincode,
        'companyPhone': res.customerMasterBean.companyPhone,
        'companyFax': res.customerMasterBean.companyFax,
        'companyContact': res.customerMasterBean.companyContact,
        'companyEmailID': res.customerMasterBean.companyEmailID,
        'companyFacilityType': res.customerMasterBean.companyFacilityType,
        
        'defNumber': res.customerMasterBean.defNumber,
        'defExpirationDate': res.customerMasterBean.defExpirationDate,
        
        'issuesCreditsName': res.customerMasterBean.issuesCreditsName,
        
        'issuesCreditsStreet': res.customerMasterBean.issuesCreditsStreet,
        'issuesCreditsCity': res.customerMasterBean.issuesCreditsCity,
        'issuesCreditsState': res.customerMasterBean.issuesCreditsState,
        'issuesCreditsZipCode': res.customerMasterBean.issuesCreditsZipCode,
        'issuesCreditsPhone': res.customerMasterBean.issuesCreditsPhone,
        
        'generalInfroWacAwapMyprice': res.customerMasterBean.generalInfroWacAwapMyprice,
        'generalInfroWacAwapPer':res.customerMasterBean.generalInfroWacAwapPer,
        
        'myWholesalerPolicyType': res.customerMasterBean.myWholesalerPolicyType,
        'myWholesalerPolicyMonths':res.customerMasterBean.myWholesalerPolicyMonths,
        'myWholesalerCpp': res.customerMasterBean.myWholesalerCpp,
        'cppServiceRate': res.customerMasterBean.cppServiceRate,
        'cppShippingRate': res.customerMasterBean.cppShippingRate,
        'cppNoOfChecks': res.customerMasterBean.cppNoOfChecks
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.customerMaster = this.docForm.value;
    this.customerMasterService.customerMasterUpdate(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/customerMaster/listCustomer']);

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
    this.router.navigate(['/crm/customerMaster/listCustomer']);
   }
   autoFillClick(){
    
    this.docForm.patchValue({
      'issuesCreditsStreet': this.docForm.value.companyStreet,
      'issuesCreditsCity': this.docForm.value.companyCity,
      'issuesCreditsState': this.docForm.value.companyState,
      'issuesCreditsZipCode': this.docForm.value.companyPincode,
      'issuesCreditsPhone': this.docForm.value.companyPhone,     
   })

   }
   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
