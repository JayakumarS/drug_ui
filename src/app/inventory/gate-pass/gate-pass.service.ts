import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { GatePass } from './gate-pass-model';
import { GatePassResultBean } from './gate-pass-result-bean';

@Injectable({
  providedIn: 'root'
})

  export class GatePassService extends UnsubscribeOnDestroyAdapter{

  
    isTblLoading = true;
    dataChange: BehaviorSubject<GatePass[]> = new BehaviorSubject<GatePass[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
    constructor(private httpClient: HttpClient,
       private serverUrl: serverLocations, 
       private httpService: HttpServiceService) {
      super();
    }
    private getAllSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/getList`;
    private saveSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/save`;
    public editGatePass = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/edit`;
    public updateSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/update`;
    public deleteSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/delete`;
    public itemNameList = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/itemNameList`;
    public customerList = `${this.serverUrl.apiServerAddress}api/auth/app/gatePass/getCustomerList`;
    
    get data(): GatePass[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }
    /** CRUD METHODS */
    getAllList(): void {
          this.subs.sink = this.httpService.get<GatePassResultBean>(this.getAllSalesOrder).subscribe(
            (data) => {
              this.isTblLoading = false;
              this.dataChange.next(data.gatePassDetails);
            },
            (error: HttpErrorResponse) => {
              this.isTblLoading = false;
              console.log(error.name + " " + error.message);
            }
          );
    }
  
    addGatePass(gatePass: GatePass): void {
      this.dialogData = gatePass;
      this.httpService.post<GatePass>(this.saveSalesOrder, gatePass).subscribe(data => {
        console.log(data);
        //this.dialogData = employees;
        },
        (err: HttpErrorResponse) => {
          
      });
    }
    UpdateGatePass(gatePass: GatePass): void {
      this.dialogData = gatePass;
      /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
        this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );*/
    this.httpService.post<GatePass>(this.updateSalesOrder, gatePass).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
    }
    DeleteSalesOrder(countValue:any): void {
      this.httpService.get(this.deleteSalesOrder+"?salesOrder="+countValue).subscribe(data => {
      console.log(countValue);
        // this.httpClient.delete(this.API_URL + id).subscribe(data => {
        // console.log(id);
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
    }
  }
  