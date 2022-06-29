import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
 import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
 import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DeliveryNote } from './delivery-note.model';
import { DeliveryNoteResultBean } from './delivery-note-result-bean';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService extends UnsubscribeOnDestroyAdapter {

  
  isTblLoading = true;
  dataChange: BehaviorSubject<DeliveryNote[]> = new BehaviorSubject<DeliveryNote[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,
     private serverUrl: serverLocations,
      private httpService: HttpServiceService) {
    super();
  }
  private getAllDeliveryNote = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/getList`;
  private saveDeliveryNote = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/saveorupdate`;
  public editDeliveryNote = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/edit`;
  public updateDeliveryNote = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/update`;
  public deleteDelivery = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/delete`;
  public itemList = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/getItemList`;
  public customerList = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/getCustomerList`;
  public companyList = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/getCompanyList`;
  public locationList = `${this.serverUrl.apiServerAddress}api/auth/app/inventory/deliveryorder/getLocationList`;
  
  get data(): DeliveryNote[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<DeliveryNoteResultBean>(this.getAllDeliveryNote).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.deliveryOrderList);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  adddeliveryNote(deliveryNote: DeliveryNote): void {
    this.dialogData = deliveryNote;
    this.httpService.post<DeliveryNote>(this.saveDeliveryNote, deliveryNote).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  UpdateDeliveryOrder(deliveryNote: DeliveryNote): void {
    this.dialogData = deliveryNote;
  this.httpService.post<DeliveryNote>(this.updateDeliveryNote, deliveryNote).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
  }
  deleteDeliveryNote(deliveryNo:any): void {
    this.httpService.get(this.deleteDelivery+"?deliveryNo="+deliveryNo).subscribe(data => {
    console.log(deliveryNo);
      // this.httpClient.delete(this.API_URL + id).subscribe(data => {
      // console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
