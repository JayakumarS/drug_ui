import { DrugInfoMasterResultBean } from './../druginfo-result-bean';
import { DrugInfoMaster } from './../druginfo-model';
import { DruginfoService } from './../druginfo.service';
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
  selector: 'app-add-drug-info-return-policy',
  templateUrl: './add-drug-info-return-policy.component.html',
  styleUrls: ['./add-drug-info-return-policy.component.sass']
})
export class AddDrugInfoReturnPolicyComponent implements OnInit {
  packageoriginalityForm: FormGroup;
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  manufacturerList=[];
  drugInfoMaster:DrugInfoMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private druginfoService:DruginfoService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
     
      this.packageoriginalityForm = this.fb.group({
        checkPackageOriginality: false
      });

    this.docForm = this.fb.group({
      ndcupcCode: ["", [Validators.required]],
      noMonthsBeforeExpiration: ["", [Validators.required]],
      noMonthsAfterExpiration: ["", [Validators.required]],
      acceptReturns: ["", [Validators.required]],
      acceptPartialReturns: ["", [Validators.required]],
      acceptpercentage: ["", [Validators.required]],
      checkPackageOriginality: ["", [Validators.required]],
           
    });

    

  }
  ngOnInit(): void {

    this.httpService.get<DrugInfoMasterResultBean>(this.druginfoService.getManufacturerList).subscribe(
      (data) => {
        this.manufacturerList = data.manufacturerList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
       this.docForm.patchValue({
        'ndcupcCode': this.requestId
     })
      }
     });
  }

  drugInfo() {
    this.router.navigate(['/setup/druginfoMaster/addDruginfoMaster/',this.requestId]);
  }
  
  onSubmit() {
    
    this.docForm.patchValue({
      'checkPackageOriginality': this.packageoriginalityForm.value.checkPackageOriginality
    });

  if (this.docForm.valid) {
    this.httpService.post<any>(this.druginfoService.adddruginfoReturnPolicy, this.docForm.value).subscribe(
      (data) => {
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        
        this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
    
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

    
  }  
  }

  fetchDetails(ndcupc: any): void {
    
    this.httpService.get(this.druginfoService.editdrugInfoReturnPolicy+"?drugInfoId="+ndcupc).subscribe((res: any)=> {
     // console.log(ndcupc);
     this.packageoriginalityForm.patchValue({
      'checkPackageOriginality': this.getBoolean(res.druginfoReturnPolicyBean.checkPackageOriginality)
    });

      this.docForm.patchValue({
        'ndcupcCode': res.druginfoReturnPolicyBean.ndcupcCode,
        'noMonthsBeforeExpiration': res.druginfoReturnPolicyBean.noMonthsBeforeExpiration,
        'noMonthsAfterExpiration': res.druginfoReturnPolicyBean.noMonthsAfterExpiration,
        'acceptReturns': this.getBoolean(res.druginfoReturnPolicyBean.acceptReturns).toString(),
        'acceptPartialReturns': this.getBoolean(res.druginfoReturnPolicyBean.acceptPartialReturns).toString(),
        'acceptpercentage': res.druginfoReturnPolicyBean.acceptpercentage,
     })

     

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){
    if (this.docForm.valid) {
    this.drugInfoMaster = this.docForm.value;
    this.druginfoService.drugInfoMasterUpdate(this.drugInfoMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
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
    this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
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
          case "t":
             return true;
         default: 
             return false;
     }
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
