import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from './../../crm/customer-master/customer-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster} from 'src/app/crm/customer-master/customer-master.model';

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
  customerMaster:CustomerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService
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
    this.customerMaster = this.docForm.value;
    console.log(this.customerMaster);
    this.customerMasterService.addCustomerMaster(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/wholeSaler/listWholesaler']);
  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'policyCode': res.customerMasterBean.policyCode,
        'wholesalerName': res.customerMasterBean.wholesalerName,
        'expiryPacket': res.customerMasterBean.expiryPacket,
        ' emailID': res.customerMasterBean. emailID,
        ' allowOverride': res.customerMasterBean. allowOverride,
        ' department': res.customerMasterBean. department,
        'street': res.customerMasterBean.street,
        'city': res.customerMasterBean.city,
        'zipCode': res.customerMasterBean.zipCode,
        'phoneNo': res.customerMasterBean.phoneNo,
        'tollFreeNo': res.customerMasterBean.tollFreeNo,
        'fax': res.customerMasterBean.fax,
        'contact': res.customerMasterBean.contact,

     
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
    this.router.navigate(['/wholeSaler/listWholesaler']);

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
    this.router.navigate(['/wholeSaler/listWholesaler']);
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
