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
  selector: 'app-add-druginfo-master',
  templateUrl: './add-druginfo-master.component.html',
  styleUrls: ['./add-druginfo-master.component.sass']
})
export class AddDruginfoMasterComponent implements OnInit {

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
    this.docForm = this.fb.group({
      
      ndcupc: ["", [Validators.required]],
      manufacturerBy: ["", [Validators.required]],
      description: ["", [Validators.required]],
       strength: ["", [Validators.required]],
       control: ["", [Validators.required]],
       department: [""],
      packageSize: ["", [Validators.required]],
      rxOtc: ["", [Validators.required]],
      unitPerPackage:["", [Validators.required]],
      unitDose: [""],
      dosage: ["", [Validators.required]],
      unitOfMeasure: ["", [Validators.required]],
      hazardous: [""],
      awp: ["", [Validators.required]],
      wap: ["", [Validators.required]],
      myPrice: ["", [Validators.required]],
    //  userName: this.tokenStorage.getUsername()
           
    });

    this.docForm.patchValue({
      'unitDose': false,
      'hazardous': false,
   })

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
      }
     });
  }

  returnPolicy() {
    this.router.navigate(['/setup/druginfoMaster/addDrugInfoReturnPolicy/',this.requestId]);
  }
  
  onSubmit() {
    if (this.docForm.valid) {
    this.drugInfoMaster = this.docForm.value;
    console.log(this.drugInfoMaster);
    this.druginfoService.adddrugInfoMaster(this.drugInfoMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
  }
  }
  fetchDetails(ndcupc: any): void {
    this.httpService.get(this.druginfoService.editdrugInfoMaster+"?drugInfoId="+ndcupc).subscribe((res: any)=> {
      console.log(ndcupc);

      this.docForm.patchValue({
        'ndcupc': res.drugInfoMasterBean.ndcupc,
        'manufacturerBy': res.drugInfoMasterBean.manufacturerBy,
        'description': res.drugInfoMasterBean.description,
        'strength': res.drugInfoMasterBean.strength,
        'control': res.drugInfoMasterBean.control,
        'department': res.drugInfoMasterBean.department,
        'packageSize': res.drugInfoMasterBean.packageSize,
        'rxOtc': res.drugInfoMasterBean.rxOtc,
        'unitPerPackage': res.drugInfoMasterBean.unitPerPackage,
        'unitDose': this.getBoolean(res.drugInfoMasterBean.unitDose),
        'dosage': res.drugInfoMasterBean.dosage,
        'unitOfMeasure': res.drugInfoMasterBean.unitOfMeasure,
        'hazardous': this.getBoolean(res.drugInfoMasterBean.hazardous),
        'awp': res.drugInfoMasterBean.awp,
        'wap': res.drugInfoMasterBean.wap,
        'myPrice': res.drugInfoMasterBean.myPrice,
     
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
