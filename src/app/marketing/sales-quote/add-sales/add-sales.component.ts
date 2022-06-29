import { Component, OnInit } from '@angular/core';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesQuote } from '../sales-quote.model';
import { SalesQuoteService } from '../sales-quote.service';
 import { SalesQuoteResultBean } from '../sales-quote-result-bean';
 import { SalesOrderResultBean } from 'src/app/marketing/sales-order/sales-order-result-bean';
import * as moment from 'moment';
import { SalesOrderService } from 'src/app/marketing/sales-order/sales-order.service';
import { CountryMasterResultBean } from 'src/app/master/country-master/country-master-result-bean';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';

 @Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.sass']
})
export class AddSalesComponent implements OnInit {
  docForm: FormGroup;
  salesQuote: SalesQuote;
  hide3 = true;
  agree3 = false;
  requestId: number;
  itemList = [];
  dataarray=[];
  dataarray1 = [];
  currencyList = [];
  customerList = [];
  salesOrderList = [];
  salesQuoteDetailBean = [];
  cusMasterData = [];
  salesEntryData = [];
  minDate: any;
  salesDetailRowData = new SalesEntryDetailRowComponent;
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean = false;




  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,
    private salesQuoteService: SalesQuoteService, public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    public salesOrderService:SalesOrderService,
    public countryMasterService:CountryMasterService) {


  }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      customer: ["", [Validators.required]],
      validFrom: ["", [Validators.required]],
      validTo: ["", [Validators.required]],
      termCondition: ["", [Validators.required]],
      // emailId: [
      //        "",
      //        [Validators.required, Validators.email, Validators.minLength(5)],
      //      ],
      // personMet: [""],
      // assignTo: [""],

      expectedDate: [""],
      currency: [""],
      countValue: [""],

      salesQuoteDetailBean: this.fb.array([
        this.fb.group({
          countValue: [""],
          item: [""],
          qty: [""],
          price: [""]

        })
      ])
    });
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);

      }
    });

    this.httpService.get<SalesQuoteResultBean>(this.salesQuoteService.itemNameList).subscribe(
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
 
  }

  onSubmit() {
    this.salesQuote = this.docForm.value;
    this.salesQuoteService.addSalesQuote(this.salesQuote);
    // logger msg
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesQuote/listSalesQuote']);

  }
  // Edit
  fetchDetails(countValue: any): void {
    this.httpService.get(this.salesQuoteService.editSalesQuote + "?salesQuote=" + countValue).subscribe((res: any) => {
      console.log(countValue);

      this.docForm.patchValue({
        'customer': res.salesQuoteBean.customer,
        'validFrom': res.salesQuoteBean.validFrom,
        'validTo': res.salesQuoteBean.validTo,
        'termCondition': res.salesQuoteBean.termCondition,
        'currency': res.salesQuoteBean.currency,
        'expectedDate': res.salesQuoteBean.expectedDate,
        'countValue': res.salesQuoteBean.countValue,

      })
      let salesQuoteDetailBeanArray = this.docForm.controls.salesQuoteDetailBean as FormArray;
      salesQuoteDetailBeanArray.removeAt(0);
      res.salesQuoteDetailBean.forEach(element => {
        let salesQuoteDetailBeanArray = this.docForm.controls.salesQuoteDetailBean as FormArray;
        let arraylen = salesQuoteDetailBeanArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          countValue: [element.countValue],
          item: [element.item],
          qty: [element.qty],
          price: [element.price]

        })
        salesQuoteDetailBeanArray.insert(arraylen, newUsergroup);

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


  update() {
    this.docForm.patchValue({
      'countValue': this.requestId,
    })

    this.salesQuote = this.docForm.value;
    this.salesQuoteService.UpdateSalesQuote(this.salesQuote);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesQuote/listSalesQuote']);

  }
  addRow() {   
    this.salesQuoteDetailBean= this.salesQuoteDetailBean;
    this.dataarray.push(this.salesQuoteDetailBean)
  }
  removeRow(index) {

    let salesQuoteDetailBeanArray = this.docForm.controls.salesQuoteDetailBean as FormArray;
    salesQuoteDetailBeanArray.removeAt(index);
  }



  addRow1() {
    let salesQuoteDetailBeanArray = this.docForm.controls.salesQuoteDetailBean as FormArray;
    let arraylen = salesQuoteDetailBeanArray.length;
    let newUsergroup: FormGroup = this.fb.group({

      countValue: [""],
      item: [""],
      qty: [""],
      price: [""]
    })
    salesQuoteDetailBeanArray.insert(arraylen, newUsergroup);

  }
  onCancel() {
    this.router.navigate(['/marketing/salesQuote/listSalesQuote']);
  }
  reset() { }

  removeRow1(index){

    let salesQuoteDetailBeanArray = this.docForm.controls.salesQuoteDetailBean as FormArray;
    salesQuoteDetailBeanArray.removeAt(index);

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
  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
