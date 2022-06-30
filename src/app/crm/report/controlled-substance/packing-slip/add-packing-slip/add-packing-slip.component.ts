import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from 'src/app/crm/customer-master/customer-master.service'; 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model';
@Component({
  selector: 'app-add-packing-slip',
  templateUrl: './add-packing-slip.component.html',
  styleUrls: ['./add-packing-slip.component.sass']
})
export class AddPackingSlipComponent implements OnInit {

  packingForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  customerMaster:CustomerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  allSelected: any;
  userTypeFilters: any;

 

  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.packingForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
      onlyItem: ["", [Validators.required]],
      itemsReturned: ["", [Validators.required]],
      manufactureName: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
       this.toggleAllSelection();
       this.packingForm = this.fb.group({
        userType: new FormControl('')
      });
      
      const userTypeFilters = [
        {
          key: 1, value: 'Value 1',
        },
        {
          key: 2, value: 'Value 2',
        },
        {
          key: 3, value: 'Value 3',
        },
        {
          key: 4, value: 'Value 4',
        }
      ]
      
      }
     });
  }
  onOk() {
    
  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.packingForm.patchValue({
        'companyName': res.companyMasterBean.companyName,
        'startDate': res.customerMasterBean.startDate,
        'endDate': res.customerMasterBean.endDate,
        'debitMemoNo': res.customerMasterBean.debitMemoNo,
        'controlledSubstance': res.customerMasterBean.ControlledSubstance,
        'onlyItem': res.customerMasterBean.onlyItem,
        'itemsReturned': res.customerMasterBean.itemsReturned,
        'manufactureName': res.customerMasterBean.manufactureName,
     })
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  update(){

    this.customerMaster = this.packingForm.value;
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


toggleAllSelection() {
  if (this.allSelected.selected) {
    this.packingForm.controls.userType
    .patchValue([...this.userTypeFilters.map(item => item.key), 0]);
  } else {
    this.packingForm.controls.userType.patchValue([]);
  }
}
}


