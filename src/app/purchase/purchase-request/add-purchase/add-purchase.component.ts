import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailRowComponent } from '../detail-row/detail-row.component';
import { PurchaseRequest } from '../purchase-request.model';
import { PurchaseRequestService } from '../purchase-request.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseRequestResultBean } from '../purchase-request-result-bean';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.sass']
})
export class AddPurchaseComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  requestId: number;
  edit: boolean = false;
  dataarray = [];
  dataarray1 = [];
  cusMasterData = [];
  salesEntryData = [];
  locationList = [];
  listOfItem = [];
  itemList = [];
  purchaseRequest: PurchaseRequest;
  purchaseCategory: any;
  purchaseRequestDtlBean: any;

  constructor(private fb: FormBuilder, public router: Router, private snackBar: MatSnackBar,
    private purchaseRequestService: PurchaseRequestService, public route: ActivatedRoute, private httpService: HttpServiceService) {

  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);
      }
      else {
        this.getrequisitionNo();
      }
      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        company: ["", [Validators.required]],
        requestType: ["", [Validators.required]],
        requestDate: ["", [Validators.required]],
        sourceLocation: ["", [Validators.required]],
        destinationLocation: ["", [Validators.required]],
        costCenter: [""],
        requestedBy: [""],
        jobTitle: [""],
        prReqNo: [""],
        requisitionId: [""],
        requisitionNo: [""],

        purchaseRequestDtlBean: this.fb.array([
          this.fb.group({
            requisitionId: [""],
            itemId: [""],
            itemCategory: [""],
            uom: [""],
            itemDesc: [""],
            pendingQuantity: [""],
            quantity: [""],
            altuom: [""],
            altqty: [""],
            edd: [""],

          })
        ])
      });
    });
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.salesEntryData.push(this.dataarray1)

    this.httpService.get<PurchaseRequestResultBean>(this.purchaseRequestService.requisitionNoList).subscribe(
      (data) => {
        this.listOfItem = data.requisitionNoList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    // itemNameList
    this.httpService.get<PurchaseRequestResultBean>(this.purchaseRequestService.itemNameList).subscribe(
      (data) => {
        console.log(data);
        this.itemList = data.itemList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    //source and dest loc
    this.httpService.get(this.purchaseRequestService.getLocationVal).subscribe((res: any) => {

      this.locationList = res.lLocationLst;
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }


  // Edit
  fetchDetails(requestType: any): void {
    this.httpService.get(this.purchaseRequestService.editPurchase + "?purchaseRequest=" + requestType).subscribe((res: any) => {
      console.log(requestType);

      this.docForm.patchValue({
        'prReqNo': res.purchaseRequestBean.prReqNo,
        'requisitionNo': res.purchaseRequestBean.requisitionNo,
        'requestType': res.purchaseRequestBean.requestType,
        'requestedBy': res.purchaseRequestBean.requestedBy,
        'jobTitle': res.purchaseRequestBean.jobTitle,
        'sourceLocation': res.purchaseRequestBean.sourceLocation,
        'destinationLocation': res.purchaseRequestBean.destinationLocation,
        'company': res.purchaseRequestBean.company,
        'requestDate': res.purchaseRequestBean.requestDate,
        'costCenter': res.purchaseRequestBean.costCenter,
        'requisitionId': res.purchaseRequestBean.requisitionId,
      })

      let PrDtlArray = this.docForm.controls.purchaseRequestDtlBean as FormArray;
      PrDtlArray.removeAt(0);
      res.purchaseRequestDtlBean.forEach(element => {
        let PrDtlArray = this.docForm.controls.purchaseRequestDtlBean as FormArray;
        let arraylen = PrDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          // item:[element.item],
          requisitionId: [element.requisitionId],
          itemId: [element.itemId],
          itemCategory: [element.itemCategory],
          uom: [element.uom],
          itemDesc: [element.purchaseUOM],
          pendingQuantity: [element.pendingQuantity],
          quantity: [element.quantity],
          altuom: [element.altuom],
          altqty: [element.altqty],
          edd: [element.edd],


        })
        PrDtlArray.insert(arraylen, newUsergroup);

      });
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );

  }

  onSubmit() {
    this.purchaseRequest = this.docForm.value;
    console.log(this.purchaseRequest);
    this.purchaseRequestService.addPurchase(this.purchaseRequest);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);
  }

  update() {

    this.purchaseRequest = this.docForm.value;
    this.purchaseRequestService.UpdatePurchase(this.purchaseRequest);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);

  }
  addRow1() {
    this.purchaseRequestDtlBean = this.purchaseRequestDtlBean;
    this.dataarray.push(this.purchaseRequestDtlBean)

  }
  removeRow(i) {
    let lpoDtlOneArray = this.docForm.controls.purchaseRequestDtlBean as FormArray;
    lpoDtlOneArray.removeAt(i);
  }

  addRow() {

    let PrDtlArray = this.docForm.controls.purchaseRequestDtlBean as FormArray;
    let arraylen = PrDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      requisitionId: [""],
      itemId: [""],
      itemCategory: [""],
      uom: [""],
      itemDesc: [""],
      pendingQuantity: [""],
      quantity: [""],
      altuom: [""],
      altqty: [""],
      edd: [""],

    })
    PrDtlArray.insert(arraylen, newUsergroup);
  }

  onCancel() {
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);
  }
  reset() { }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  getrequisitionNo() {
    this.httpService.get<PurchaseRequestResultBean>(this.purchaseRequestService.requisitionNo).subscribe(
      (data) => {
        if (data) {
          this.docForm.patchValue({
            'requisitionNo': data.requisitionNo
          });

        }
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

}