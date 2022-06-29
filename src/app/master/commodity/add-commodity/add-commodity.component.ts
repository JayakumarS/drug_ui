import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CommodityService } from '../commodity.service';
import { Commodity } from '../commodity.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommodityResultBean } from '../commodity-result-bean';





@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.sass']
})
export class AddCommodityComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  classificationNameList:[];
  commodityMaster : Commodity;
  requestId: number;
  edit:boolean=false;
  constructor(private fb: FormBuilder,private router:Router,
    public route: ActivatedRoute,private snackBar: MatSnackBar,
    private commodityService: CommodityService,private httpService: HttpServiceService) {
    this.docForm = this.fb.group({
      commodity: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      imdgClass: [""],
      classification: ["", [Validators.required]],
      hazardous: [""],
      hsCode: ["", [Validators.required]],
      imdgcodePage: [""],
      blClause: [""],
      unNo: [""],
      flashPoint: [ "",[Validators.required]],
      active: [""],
      commodityCode:[""],


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

    this.httpService.get<CommodityResultBean>(this.commodityService.classificationName).subscribe(
      (data) => {
        console.log(data);
        this.classificationNameList = data.classificationNameList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  onSubmit(){
    this.commodityMaster = this.docForm.value;
    console.log(this.commodityMaster);
    this.commodityService.addCommodity(this.commodityMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/commodity/listCommodity']);
    
  }

  fetchDetails(commodityCode: any): void {
    this.httpService.get(this.commodityService.editcommodity+"?commodity="+commodityCode).subscribe((res: any)=> {
      console.log(commodityCode);

      this.docForm.patchValue({
        'commodityCode': res.commodityBean.commodityCode,
        'commodity': res.commodityBean.commodity,
        'imdgClass': res.commodityBean.imdgClass,
        'hazardous': res.commodityBean.hazardous,
        'classification': res.commodityBean.classification,
        'remarks' : res.commodityBean.remarks,
        'hsCode': res.commodityBean.hsCode,
        'imdgcodePage': res.commodityBean.imdgcodePage,
        'blClause': res.commodityBean.blClause,
        'unNo' : res.commodityBean.unNo,
        'flashPoint' : res.commodityBean.flashPoint,
        'active': res.commodityBean.active,
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }

  update(){

    this.commodityMaster = this.docForm.value;
    this.commodityService.updateCommodity(this.commodityMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/commodity/listCommodity']);

  }

  onCancel(){
    this.router.navigate(['/master/commodity/listCommodity']);
  
  }
  
  reset(){}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
