import { DrugInfoMaster } from './druginfo-model';
import { DrugInfoMasterResultBean } from './druginfo-result-bean';
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
export class DruginfoService  extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<DrugInfoMaster[]> = new BehaviorSubject<DrugInfoMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/drugInfoMaster/getList`;
  private savedrugInfoMaster = `${this.serverUrl.apiServerAddress}api/auth/app/drugInfoMaster/save`;
  public editdrugInfoMaster = `${this.serverUrl.apiServerAddress}api/auth/app/drugInfoMaster/edit`;
  public updatedrugInfoMaster = `${this.serverUrl.apiServerAddress}api/auth/app/drugInfoMaster/update`;
  private deletedrugInfoMaster = `${this.serverUrl.apiServerAddress}api/auth/app/drugInfoMaster/delete`;


  get data(): DrugInfoMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<DrugInfoMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.listDrugInfoMasterBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  adddrugInfoMaster(drugInfoMaster: DrugInfoMaster): void {
    this.dialogData = drugInfoMaster;
    this.httpService.post<DrugInfoMaster>(this.savedrugInfoMaster, drugInfoMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  drugInfoMasterUpdate(drugInfoMaster: DrugInfoMaster): void {
    this.dialogData = drugInfoMaster;
    this.httpService.post<DrugInfoMaster>(this.updatedrugInfoMaster, drugInfoMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  drugInfoMasterDelete(cusCode: any): void {
    this.httpService.get(this.deletedrugInfoMaster+"?customer="+cusCode).subscribe(data => {
      console.log(cusCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}
