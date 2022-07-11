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
  cusMasterData =[];
  drugInfoMaster:DrugInfoMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private druginfoService:DruginfoService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      
      ndcupc: ["", [Validators.required]],
      manufacturerBy: ["", [Validators.required]],
      description: ["", [Validators.required]],
       strength: ["", [Validators.required]],
       control: ["", [Validators.required]],
       department: ["", [Validators.required]],
      packageSize: ["", [Validators.required]],
      rxOtc: ["", [Validators.required]],
      unitPerPackage:["", [Validators.required]],
      unitDose: ["false", [Validators.required]],
      dosage: ["", [Validators.required]],
      unitOfMeasure: ["", [Validators.required]],
      hazardous: ["false", [Validators.required]],
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
    this.drugInfoMaster = this.docForm.value;
    console.log(this.drugInfoMaster);
    this.druginfoService.adddrugInfoMaster(this.drugInfoMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    //this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
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
        'unitDose': res.drugInfoMasterBean.unitDose,
        'dosage': res.drugInfoMasterBean.dosage,
        'unitOfMeasure': res.drugInfoMasterBean.unitOfMeasure,
        'hazardous': res.drugInfoMasterBean.hazardous,
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
}
