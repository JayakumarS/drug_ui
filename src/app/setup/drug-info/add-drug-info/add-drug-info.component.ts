import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster} from 'src/app/crm/customer-master/customer-master.model';
import { CustomerMasterService } from 'src/app/crm/customer-master/customer-master.service';
@Component({
  selector: 'app-add-drug-info',
  templateUrl: './add-drug-info.component.html',
  styleUrls: ['./add-drug-info.component.sass']
})
export class AddDrugInfoComponent implements OnInit {

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
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      ndcupc: ["", [Validators.required]],
      manufacturer: ["", [Validators.required]],
      description: ["", [Validators.required]],
       strength: ["", [Validators.required]],
       control: ["", [Validators.required]],
       department: ["", [Validators.required]],
      packageSize: ["", [Validators.required]],
      rxOtc: ["", [Validators.required]],
      unitPerPackage:["", [Validators.required]],
      unitDose: ["", [Validators.required]],
      dosage: ["", [Validators.required]],
      unitOfMeasure: ["", [Validators.required]],
      hazardous: ["", [Validators.required]],
      awp: ["", [Validators.required]],
      wap: ["", [Validators.required]],
      myPrice: ["", [Validators.required]],
           
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
    this.customerMaster = this.docForm.value;
    console.log(this.customerMaster);
    this.customerMasterService.addCustomerMaster(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/drugInfo/ListDrugInfo']);
  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'ndcupc': res.customerMasterBean.ndcupc,
        'manufacturer': res.customerMasterBean.manufacturer,
        'description': res.customerMasterBean.description,
        ' strength': res.customerMasterBean. strength,
        ' control': res.customerMasterBean. control,
        ' department': res.customerMasterBean. department,
        'packageSize': res.customerMasterBean.packageSize,
        'rxOtc': res.customerMasterBean.rxOtc,
        'unitPerPackage': res.customerMasterBean.unitPerPackage,
        'unitDose': res.customerMasterBean.unitDose,
        'dosage': res.customerMasterBean.dosage,
        'unitOfMeasure': res.customerMasterBean.unitOfMeasure,
        'hazardous': res.customerMasterBean.hazardous,
'awp': res.customerMasterBean.awp,
'wap': res.customerMasterBean.wap,
'myPrice': res.customerMasterBean.myPrice,
     
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
    this.router.navigate(['/setup/drugInfo/ListDrugInfo']);

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
    this.router.navigate(['/setup/drugInfo/ListDrugInfo']);
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
