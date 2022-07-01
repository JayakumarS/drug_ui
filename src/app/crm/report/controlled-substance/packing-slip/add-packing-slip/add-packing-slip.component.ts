import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { CustomerMaster } from 'src/app/crm/customer-master/customer-master.model';
import { DeaformService } from '../../deaform41/deaform.service'; 
import { PackingFormService } from '../packingSlip-service';
import { PackingFormBean } from '../packingSlip-result-bean';
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
  companyNameList: any;
  exampleDatabase: PackingFormService | null;

  constructor(private fb: FormBuilder,public router: Router,
   private httpService: HttpServiceService,public deaformService:DeaformService
   ,public route: ActivatedRoute) {
    this.packingForm = this.fb.group({
      companyName: ["", [Validators.required]],
      debitMemoNo: ["", [Validators.required]],
      controlledSubstance: ["", [Validators.required]],
      onlyItem: ["", [Validators.required]],
      itemsReturned: ["", [Validators.required]],
      manufactureName: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.httpService.get<PackingFormBean>(this.deaformService.companyNameUrl).subscribe(
      (data) => {
        this.companyNameList = data.companyNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.route.params.subscribe(params => {
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
      
      
     });
  }
  onOk() {
    
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


