import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from 'src/app/crm/customer-master/customer-master.service'; 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model';
@Component({
  selector: 'app-add-future-dated',
  templateUrl: './add-future-dated.component.html',
  styleUrls: ['./add-future-dated.component.sass']
})
export class AddFutureDatedComponent implements OnInit {

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
      companyName: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
      }
     });
  }
  onOk() {
    
  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'companyName': res.companyMasterBean.companyName,
        'startDate': res.customerMasterBean.startDate,
        'endDate': res.customerMasterBean.endDate,
        'debitMemoNo': res.customerMasterBean.debitMemoNo,
        'controlledSubstance': res.customerMasterBean.ControlledSubstance,
        
     
     })
      },
      (err: HttpErrorResponse) => {
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

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}


