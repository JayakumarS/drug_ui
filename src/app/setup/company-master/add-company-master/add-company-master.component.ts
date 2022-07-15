import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CompanyMasterService } from './../company-master.service';
import { CompanyMaster } from './../company-model';

@Component({
  selector: 'app-add-company-master',
  templateUrl: './add-company-master.component.html',
  styleUrls: ['./add-company-master.component.sass']
})
export class AddCompanyMasterComponent implements OnInit {
  companyAuthorizedClassesForm: FormGroup;

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  companyMaster:CompanyMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private companyMasterService:CompanyMasterService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      wholesalerCode: [""],
      wholesalerPolicyCode: ["", [Validators.required]],
      wholesalerName: ["", [Validators.required]],
      wholesalerExpiryPacket: [""],
      wholesalerEmailID: ["", [Validators.required]],
      wholesalerAllowOverride: [""],
      wholesalerDepartment: ["", [Validators.required]],
      wholesalerStreet: ["", [Validators.required]],
      wholesalerCity: ["", [Validators.required]],
      wholesalerState: ["", [Validators.required]],
      wholesalerZipCode:["", [Validators.required]],
      wholesalerPhoneNo: ["", [Validators.required]],
      wholesalerTollFreeNo: ["", [Validators.required]],
      wholesalerFax: ["", [Validators.required]],
      wholesalerPhone: ["", [Validators.required]],

      companyCode: [""],
companyName:["", [Validators.required]],
companyDba:[""],
companyStreet:["", [Validators.required]],
companyCity:["", [Validators.required]],
companyState:["", [Validators.required]],
companyPincode:["", [Validators.required]],
companyPhone:["", [Validators.required]],
companyFax:["", [Validators.required]],
companyContact:["", [Validators.required]],
companyEmailID:["", [Validators.required]],

authorizedClasses:[""],


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
  this.docForm.patchValue({
    'authorizedClasses': this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2N+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3N+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses4+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses5
  });

    this.companyMaster = this.docForm.value;
    console.log(this.companyMaster);
    
    this.companyMasterService.addCompanyMaster(this.companyMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/companyMaster/listCompanyMaster']);
  }
  }
  fetchDetails(cusCode: any): void {
    this.httpService.get(this.companyMasterService.editCompanyMaster+"?company="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'wholesalerCode' : res.companyMaster.wholesalerCode,
        'wholesalerPolicyCode' : res.companyMaster.wholesalerPolicyCode,
        'wholesalerName' : res.companyMaster.wholesalerName,
        'wholesalerExpiryPacket' : res.companyMaster.wholesalerExpiryPacket,
        'wholesalerEmailID' : res.companyMaster.wholesalerEmailID,
        'wholesalerAllowOverride' : res.companyMaster.wholesalerAllowOverride,
        'wholesalerDepartment' : res.companyMaster.wholesalerDepartment,
        'wholesalerStreet' : res.companyMaster.wholesalerStreet,
        'wholesalerCity' : res.companyMaster.wholesalerCity,
        'wholesalerState' : res.companyMaster.wholesalerState,
        'wholesalerZipCode' : res.companyMaster.wholesalerZipCode,
        'wholesalerPhoneNo' : res.companyMaster.wholesalerPhoneNo,
        'wholesalerTollFreeNo' : res.companyMaster.wholesalerTollFreeNo,
        'wholesalerFax' : res.companyMaster.wholesalerFax,
        'wholesalerPhone' : res.companyMaster.wholesalerPhone,
        
        'companyCode': res.companyMaster.companyCode,
        'companyName': res.companyMaster.companyName,
        'companyDba': res.companyMaster.companyDba,
        'companyStreet': res.companyMaster.companyStreet,
        'companyCity': res.companyMaster.companyCity,
        'companyState': res.companyMaster.companyState,
        'companyPincode': res.companyMaster.companyPincode,
        'companyPhone': res.companyMaster.companyPhone,
        'companyFax': res.companyMaster.companyFax,
        'companyContact': res.companyMaster.companyContact,
        'companyEmailID': res.companyMaster.companyEmailID,
        'companyFacilityType': res.companyMaster.companyFacilityType,
        
        'defNumber': res.companyMaster.defNumber,
        'defExpirationDate': res.companyMaster.defExpirationDate,
        
        'issuesCreditsName': res.companyMaster.issuesCreditsName,
        
        'issuesCreditsStreet': res.companyMaster.issuesCreditsStreet,
        'issuesCreditsCity': res.companyMaster.issuesCreditsCity,
        'issuesCreditsState': res.companyMaster.issuesCreditsState,
        'issuesCreditsZipCode': res.companyMaster.issuesCreditsZipCode,
        'issuesCreditsPhone': res.companyMaster.issuesCreditsPhone,
        
        'generalInfroWacAwapMyprice': res.companyMaster.generalInfroWacAwapMyprice,
        'generalInfroWacAwapPer':res.companyMaster.generalInfroWacAwapPer,
        
        'myWholesalerPolicyType': res.companyMaster.myWholesalerPolicyType.toString(),
        'myWholesalerPolicyMonths':res.companyMaster.myWholesalerPolicyMonths,
        'myWholesalerCpp': res.companyMaster.myWholesalerCpp.toString(),
        'cppServiceRate': res.companyMaster.cppServiceRate,
        'cppShippingRate': res.companyMaster.cppShippingRate,
        'cppNoOfChecks': res.companyMaster.cppNoOfChecks
     })

 var companyAuthorizedSplitedList=res.companyMaster.authorizedClasses.split(',');

     this.companyAuthorizedClassesForm.patchValue({
      'companyAuthorizedClasses2': this.getBoolean(companyAuthorizedSplitedList[0]),
      'companyAuthorizedClasses2N': this.getBoolean(companyAuthorizedSplitedList[1]),
      'companyAuthorizedClasses3': this.getBoolean(companyAuthorizedSplitedList[2]),
      'companyAuthorizedClasses3N': this.getBoolean(companyAuthorizedSplitedList[3]),
      'companyAuthorizedClasses4': this.getBoolean(companyAuthorizedSplitedList[4]),
      'companyAuthorizedClasses5': this.getBoolean(companyAuthorizedSplitedList[5]),  
   })

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  
  update(){
    if (this.docForm.valid) {
    this.docForm.patchValue({
      'authorizedClasses': this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses2N+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses3N+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses4+','+this.companyAuthorizedClassesForm.value.companyAuthorizedClasses5
    });

    this.companyMaster = this.docForm.value;
    this.companyMasterService.companyMasterUpdate(this.companyMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/companyMaster/listCompanyMaster']);

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
    this.router.navigate(['/setup/companyMaster/listCompanyMaster']);
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

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
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
