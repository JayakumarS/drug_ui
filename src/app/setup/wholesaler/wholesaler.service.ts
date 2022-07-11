import { WholesalerMasterResultBean } from './wholesaler-result-bean';
import { WholesalerMaster } from './wholesaler-model';
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
export class WholesalerService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<WholesalerMaster[]> = new BehaviorSubject<WholesalerMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/wholesalerMaster/getList`;
  private saveWholesalerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/wholesalerMaster/save`;
  public editWholesalerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/wholesalerMaster/edit`;
  public updateWholesalerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/wholesalerMaster/update`;
  private deleteWholesalerMaster = `${this.serverUrl.apiServerAddress}api/auth/app/wholesalerMaster/delete`;


  get data(): WholesalerMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    
        this.subs.sink = this.httpService.get<WholesalerMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.listWholesalerMasterBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addWholesalerMaster(wholesalerMaster: WholesalerMaster): void {
    this.dialogData = wholesalerMaster;
    this.httpService.post<WholesalerMaster>(this.saveWholesalerMaster, wholesalerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  WholesalerMasterUpdate(wholesalerMaster: WholesalerMaster): void {
    this.dialogData = wholesalerMaster;
    this.httpService.post<WholesalerMaster>(this.updateWholesalerMaster, wholesalerMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  WholesalerMasterDelete(wholesalerId: any): void {
    this.httpService.get(this.deleteWholesalerMaster+"?wholesalerId="+wholesalerId).subscribe(data => {
      console.log(wholesalerId);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}
