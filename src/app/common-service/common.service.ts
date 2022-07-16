import { Injectable } from '@angular/core';
import * as moment from "moment";
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
export class CommonService extends UnsubscribeOnDestroyAdapter {

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  public getcompanyMasterDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyMasterDropdownList`;
  public getdebitMemoDropdownList= `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getDebitMemoDropdownList`;
 

}
