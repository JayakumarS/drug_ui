import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { PackingForm } from './packingSlip-models';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PackingFormService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<PackingForm[]> = new BehaviorSubject<PackingForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public companyNameUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getCompanyNameList`;
  public memoDetailsUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/returnMemo/getMemoDetails`;
  public savedEAForm = `${this.serverUrl.apiServerAddress}api/auth/app/report/getSearchList`;



  get data(): PackingForm[] {
    return this.dataChange.value;
  }
 


}