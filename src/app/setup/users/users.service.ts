import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { UsersMaster } from './users-model';
import { UsersResultBean } from './users-result-bean';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsersService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<UsersMaster[]> = new BehaviorSubject<UsersMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  private getListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/getList`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/save`;
  public editUsers = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/edit`;
  public updateCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/update`;
  private deleteUsersUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/delete`;
  public roleListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/getRoleList`;
  public addUserFiles = `${this.serverUrl.apiServerAddress}api/auth/app/userMaster/uploadFile`;
  public customerList = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/getCustomerList`;
  
  get data(): UsersMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<UsersResultBean>(this.getListUrl).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.usersMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  deleteUsers(deleteUser: any): void {
    this.httpService.get(this.deleteUsersUrl + "?deleteUser=" + deleteUser).subscribe(data => {
      console.log(deleteUser);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }


  addCustomerMaster(customerMaster: UsersMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<UsersMaster>(this.saveUrl, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  customerMasterUpdate(customerMaster: UsersMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<UsersMaster>(this.updateCustomermaster, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
         
    });
  }

  // customerMasterDelete(cusCode: any): void {
  //   this.httpService.get(this.deleteCustomermaster+"?customer="+cusCode).subscribe(data => {
  //     console.log(cusCode);
  //     },
  //     (err: HttpErrorResponse) => {
  //        // error code here
  //     }
  //   );
  // }

}