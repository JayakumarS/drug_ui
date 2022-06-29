import { Component, OnInit } from '@angular/core';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesOrder } from '../sales-order.model';
import { SalesOrderResultBean } from '../sales-order-result-bean';
import { SalesOrderService } from '../sales-order.service';
import * as moment from 'moment';
import { BomService } from 'src/app/operations/bom/bom.service';
import { CountryMasterResultBean } from 'src/app/master/country-master/country-master-result-bean';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { SalesQuoteService } from '../../sales-quote/sales-quote.service';
import { SalesQuoteResultBean } from '../../sales-quote/sales-quote-result-bean';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.sass']
})
export class AddOrderComponent implements OnInit {
  docForm: FormGroup;
  salesOrder:SalesOrder;
  hide3 = true;
  agree3 = false;
  requestId: number;
  dataarray=[];
  itemList = [];
  dataarray1=[];
  currencyList = [];
  customerList = [];
  salesOrderList =[];
  salesOrderdtlBean = [];
  cusMasterData =[];
  salesEntryData=[];
  minDate: any;
  salesDetailRowData = new SalesEntryDetailRowComponent;
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean=false;

  constructor(private fb: FormBuilder,private authService: AuthService,public router:Router,
    private salesOrderService : SalesOrderService,private salesQuoteService: SalesQuoteService,public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private countryMasterService:CountryMasterService,
    private snackBar:MatSnackBar,public bomService:BomService) {

   
    
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
     this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      customer: ["", [Validators.required]],
      text: [""],
      validFrom: [""],
      currency:[""],
      item:[""],
      qty:[""],
      price:[""],
      deliveryDate:[""],
      validTo:[""],
      countValue:[""],
      salesQuoteNo:[""],
      termCondition:[""],
      expectedDate : [""],
     // workOrderDtlData:this.fb.array([this.createWorkOrderDtl()])
     salesOrderdtlBean: this.fb.array([
      this.fb.group({
        item:["", [Validators.required]],
        qty:[""],
        price:[""],
        id:[""],
        text:[""],

      })
     ])

    });
    
    // this.cusMasterData.push(this.docForm)
    // this.cusMasterData.push(this.salesOrderdtlBean)
//item dropdown
    this.httpService.get<SalesOrderResultBean>(this.salesOrderService.itemNameList).subscribe(
      (data) => {
        console.log(data);
        this.itemList = data.itemList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
// customer dropdown 
    this.httpService.get<SalesOrderResultBean>(this.salesOrderService.customerList).subscribe(
      (data) => {
        console.log(data);
        this.customerList = data.customerList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    // Currency list dropdown
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.currencyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
      //Sales Quote dropdown
    this.httpService.get<SalesOrderResultBean>(this.salesOrderService.salesOrderUrl).subscribe(
      (data) => {
        this.salesOrderList = data.salesOrderList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  fetchSalesQuoteDetails(salesQuoteNo: any): void {
    this.httpService.get(this.salesOrderService.fetchSalesQuote + "?salesQuote=" + salesQuoteNo).subscribe((res: any) => {
      console.log(salesQuoteNo);

      this.docForm.patchValue({
        'customer': res.salesOrderBean.customer,
        'validFrom': res.salesOrderBean.validFrom,
        'validTo': res.salesOrderBean.validTo,
        'termCondition': res.salesOrderBean.termCondition,
        'currency': res.salesOrderBean.currency,
        'expectedDate': res.salesOrderBean.expectedDate,
        // 'countValue': res.salesOrderBean.countValue,
        'salesQuoteNo' : res.salesOrderBean.salesQuoteNo,

      })
      let salesOrderDtlArray = this.docForm.controls.salesOrderdtlBean as FormArray;
      salesOrderDtlArray.removeAt(0);
      res.salesOrderdtlBean.forEach(element => {
        let salesOrderDtlArray = this.docForm.controls.salesOrderdtlBean as FormArray;
        let arraylen = salesOrderDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          countValue: [element.countValue],
          item: [element.item],
          qty: [element.qty],
          price: [element.price]

        })
        salesOrderDtlArray.insert(arraylen, newUsergroup);

      });


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

  // Edit
  fetchDetails(countValue: any): void {
    this.httpService.get(this.salesOrderService.editSalesOrder+"?salesOrder="+countValue).subscribe((res: any)=> {
      console.log(countValue);

      this.docForm.patchValue({
        'customer': res.salesOrderBean.customer,
        'validFrom': res.salesOrderBean.validFrom,
        'validTo': res.salesOrderBean.validTo,
        'termCondition': res.salesOrderBean.termCondition,
        'currency': res.salesOrderBean.currency,
        // 'item' : res.salesOrderBean.item,
        'expectedDate': res.salesOrderBean.deliveryDate,
        'salesQuoteNo': res.salesOrderBean.salesQuoteNo,
        
     })

     let salesOrderDtlArray = this.docForm.controls.salesOrderdtlBean as FormArray;
     salesOrderDtlArray.removeAt(0);
    res.salesOrderdtlBean.forEach(element => {
        let salesOrderDtlArray = this.docForm.controls.salesOrderdtlBean as FormArray;
        let arraylen = salesOrderDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
        item:[element.item],
        qty:[element.qty],
        price:[element.price]
      })
      salesOrderDtlArray.insert(arraylen,newUsergroup);
        
      });
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
  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit() {
    this.salesOrder = this.docForm.value;
    console.log(this.salesOrder);
    this.salesOrderService.addSalesOrder(this.salesOrder);
    // logger msg
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);
  }

  update(){
    this.docForm.patchValue({
      'countValue': this.requestId,    
   })
    
    this.salesOrder = this.docForm.value;
    this.salesOrderService.UpdateSalesOrder(this.salesOrder);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);

  }
  addRow(){
    this.salesOrderdtlBean= this.salesOrderdtlBean;
    this.dataarray.push(this.salesOrderdtlBean)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }

  addRow1(){

    let salesOrderDtlArray = this.docForm.controls.salesOrderdtlBean as FormArray;
    let arraylen = salesOrderDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      item:[""],
      qty:[""],
      price:[""]
    })
    salesOrderDtlArray.insert(arraylen,newUsergroup);


    // this.salesOrderdtlBean= this.salesOrderdtlBean;
    // this.dataarray1.push(this.salesOrderdtlBean)

  }
  onCancel(){
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);
  }
  reset(){}
  
  removeRow1(index){

    let salesOrderDtlArray = this.docForm.controls.salesOrderdtlBean as FormArray;
    salesOrderDtlArray.removeAt(index);

    // this.dataarray1.splice(index, 1);

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}


