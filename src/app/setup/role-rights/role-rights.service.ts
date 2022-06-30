import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { RoleRights } from './role-rights-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleRightsService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<RoleRights[]> = new BehaviorSubject<RoleRights[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  public getListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/getList`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/save`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/update`;
  public deleteUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/delete`;
  public addFiles = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/uploadFile`;
  public roleListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/getRoleList`;
  public roleFormUrl = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/getFormList`;


  get data(): RoleRights[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<any>(this.getListUrl).subscribe(
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
  
  customerMasterUpdate(customerMaster: RoleRights): void {
    this.dialogData = customerMaster;
    this.httpService.post<RoleRights>(this.updateUrl, customerMaster).subscribe(data => {
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
