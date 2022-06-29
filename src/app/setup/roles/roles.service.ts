import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { RolesMaster } from './roles-model';
import { RolesResultBean } from './roles-result-bean';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RolesService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<RolesMaster[]> = new BehaviorSubject<RolesMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  public getListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/rolesMaster/getList`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/rolesMaster/save`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/auth/app/rolesMaster/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/rolesMaster/update`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/auth/app/rolesMaster/delete`;
  public addFiles = `${this.serverUrl.apiServerAddress}api/auth/app/rolesMaster/uploadFile`;

  get data(): RolesMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<RolesResultBean>(this.getListUrl).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.rolesMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  
  customerMasterUpdate(customerMaster: RolesMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<RolesMaster>(this.updateUrl, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
         
    });
  }

  customerMasterDelete(cusCode: any): void {
    this.httpService.get(this.deleteUrl+"?id="+cusCode).subscribe(data => {
      console.log(cusCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    ); 
  }

}
