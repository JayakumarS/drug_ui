import { WholesalerMaster } from './../wholesaler-model';
import { WholesalerService } from './../wholesaler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-wholesaler',
  templateUrl: './add-wholesaler.component.html',
  styleUrls: ['./add-wholesaler.component.sass']
})
export class AddWholesalerComponent implements OnInit {

 
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  wholesalerMaster:WholesalerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private wholesalerService:WholesalerService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      policyCode: ["", [Validators.required]],
      wholesalerName: ["", [Validators.required]],
      expiryPacket: ["", [Validators.required]],
       emailID: ["", [Validators.required]],
       allowOverride: ["", [Validators.required]],
       department: ["", [Validators.required]],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zipCode:["", [Validators.required]],
      phoneNo: ["", [Validators.required]],
      tollFreeNo: ["", [Validators.required]],
      fax: ["", [Validators.required]],
      contact: ["", [Validators.required]],
     
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
    this.wholesalerMaster = this.docForm.value;
    console.log(this.wholesalerMaster);
    this.wholesalerService.addWholesalerMaster(this.wholesalerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
   // this.router.navigate(['/setup/wholesaler/ListWholesaler']);
  }
}

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.wholesalerService.editWholesalerMaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'policyCode': res.wholesalerMasterBeanBean.policyCode,
        'wholesalerName': res.wholesalerMasterBeanBean.wholesalerName,
        'expiryPacket': res.wholesalerMasterBeanBean.expiryPacket,
        ' emailID': res.wholesalerMasterBeanBean. emailID,
        ' allowOverride': res.wholesalerMasterBeanBean. allowOverride,
        ' department': res.wholesalerMasterBeanBean. department,
        'street': res.wholesalerMasterBeanBean.street,
        'city': res.wholesalerMasterBeanBean.city,
        'state': res.wholesalerMasterBeanBean.state,
        'zipCode': res.wholesalerMasterBeanBean.zipCode,
        'phoneNo': res.wholesalerMasterBeanBean.phoneNo,
        'tollFreeNo': res.wholesalerMasterBeanBean.tollFreeNo,
        'fax': res.wholesalerMasterBeanBean.fax,
        'contact': res.wholesalerMasterBeanBean.contact,

     
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.wholesalerMaster = this.docForm.value;
    this.wholesalerService.WholesalerMasterUpdate(this.wholesalerMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/wholesaler/ListWholesaler']);

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
    this.router.navigate(['/setup/wholesaler/ListWholesaler']);
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
