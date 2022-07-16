import { ManufacturerMasterResultBean } from './manufacturer-result-bean';
import { ManufacturerMaster } from './manufacturer-model';

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
export class ManufacturerService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<ManufacturerMaster[]> = new BehaviorSubject<ManufacturerMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  meesage :any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService ) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/manufacturerMaster/getList`;
  private savemanufacturerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/manufacturerMaster/save`;
  public editmanufacturerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/manufacturerMaster/edit`;
  public updatemanufacturerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/manufacturerMaster/update`;
  private deletemanufacturerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/manufacturerMaster/delete`;


  get data(): ManufacturerMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<ManufacturerMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.listmanufacturerMasterBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addmanufacturerMaster(manufacturerMaster: ManufacturerMaster): void {
    this.dialogData = manufacturerMaster;
    this.httpService.post<ManufacturerMaster>(this.savemanufacturerMaster, manufacturerMaster).subscribe(data => {
      console.log(data);
  
      //this.dialogData = employees;
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
        
    });
  }
  
  manufacturerMasterUpdate(manufacturerMaster: ManufacturerMaster): void {
    this.dialogData = manufacturerMaster;
    this.httpService.post<ManufacturerMaster>(this.updatemanufacturerMaster, manufacturerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  manufacturerMasterDelete(manufacturerId: any): void {
    this.httpService.get(this.deletemanufacturerMaster+"?manufacturerId="+manufacturerId).subscribe(data => {
      //console.log(manufacturerId);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
 
}
