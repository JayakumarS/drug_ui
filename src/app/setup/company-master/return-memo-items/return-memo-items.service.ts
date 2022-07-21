import { ReturnMemoItems } from './return-memo-items-model';
import { ReturnMemoItemsResultBean } from './return-memo-items-result-bean';
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
export class ReturnMemoItemsService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<ReturnMemoItems[]> = new BehaviorSubject<ReturnMemoItems[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/returnMemoItems/getList`;
  private saveReturnMemoItems = `${this.serverUrl.apiServerAddress}api/auth/app/returnMemoItems/save`;
  public editReturnMemoItems = `${this.serverUrl.apiServerAddress}api/auth/app/returnMemoItems/edit`;
  public updateReturnMemoItems = `${this.serverUrl.apiServerAddress}api/auth/app/returnMemoItems/update`;
  private deleteReturnMemoItems = `${this.serverUrl.apiServerAddress}api/auth/app/returnMemoItems/delete`;
  public findAllDetailsByndcupcCode = `${this.serverUrl.apiServerAddress}api/auth/app/drugInfoMaster/edit`;
  public fetchreturnMemoNamebyId= `${this.serverUrl.apiServerAddress}api/auth/app/returnMemoItems/fetchreturnMemoNamebyId`;
  

  get data(): ReturnMemoItems[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCompany(): void {
    
        this.subs.sink = this.httpService.get<ReturnMemoItemsResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.listReturnMemoItems);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addReturnMemoItems(returnMemoItems: ReturnMemoItems): void {
    this.dialogData = returnMemoItems;
    this.httpService.post<ReturnMemoItems>(this.saveReturnMemoItems, returnMemoItems).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  returnMemoItemsUpdate(returnMemoItems: ReturnMemoItems): void {
    this.dialogData = returnMemoItems;
    this.httpService.post<ReturnMemoItems>(this.updateReturnMemoItems, returnMemoItems).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  returnMemoItemsDelete(cusCode: any): void {
    this.httpService.get(this.deleteReturnMemoItems+"?returnMemoNo="+cusCode).subscribe(data => {
      console.log(cusCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}