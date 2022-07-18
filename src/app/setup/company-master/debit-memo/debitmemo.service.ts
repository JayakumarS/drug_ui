import { DebitMemo } from './debitmemo-model';
import { DebitMemoResultBean } from './debitmemo-result-bean';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DebitmemoService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<DebitMemo[]> = new BehaviorSubject<DebitMemo[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/getList`;
  private saveDebitMemo = `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/save`;
  public editDebitMemo = `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/edit`;
  public updateDebitMemo = `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/update`;
  private deleteDebitMemo = `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/delete`;
  public getDebitMemoDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/getdebitMemoDropdownList`;
  public getdebitMemoDropdownList= `${this.serverUrl.apiServerAddress}api/auth/app/debitMemo/getDebitMemoDropdownList`;
 

  get data(): DebitMemo[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCompany(): void {
    
        this.subs.sink = this.httpService.get<DebitMemoResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.listDebitMemo);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addDebitMemo(debitMemo: DebitMemo): void {
    this.dialogData = debitMemo;
    this.httpService.post<DebitMemo>(this.saveDebitMemo, debitMemo).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  debitMemoUpdate(debitMemo: DebitMemo): void {
    this.dialogData = debitMemo;
    this.httpService.post<DebitMemo>(this.updateDebitMemo, debitMemo).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  debitMemoDelete(cusCode: any): void {
    this.httpService.get(this.deleteDebitMemo+"?company="+cusCode).subscribe(data => {
      console.log(cusCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}