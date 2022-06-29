import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { FileUploadMaster } from "./file-upload.model";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { FileUploadResultBean }  from './file-upload-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<FileUploadMaster[]> = new BehaviorSubject<FileUploadMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/getList`;
  private saveCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/save`;
  public editCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/edit`;
  public updateCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/update`;
  private deleteCustomermaster = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/delete`;
  public customerList = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/getCustomerList`;
  public addFiles = `${this.serverUrl.apiServerAddress}api/auth/app/fileUpload/uploadFile`;

  get data(): FileUploadMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<FileUploadResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.fileUploadDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addCustomerMaster(customerMaster: FileUploadMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<FileUploadMaster>(this.saveCustomermaster, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  customerMasterUpdate(customerMaster: FileUploadMaster): void {
    this.dialogData = customerMaster;
    this.httpService.post<FileUploadMaster>(this.updateCustomermaster, customerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  customerMasterDelete(cusCode: any): void {
    this.httpService.get(this.deleteCustomermaster+"?customer="+cusCode).subscribe(data => {
      console.log(cusCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}
