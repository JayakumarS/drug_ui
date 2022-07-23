import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DEAForm } from './deaform-model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DeaformService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<DEAForm[]> = new BehaviorSubject<DEAForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public companyNameUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getCompanyNameList`;
  public savedEAForm = `${this.serverUrl.apiServerAddress}api/auth/app/report/getSearchList`;
  public savedEAFormm = `${this.serverUrl.apiServerAddress}api/auth/app/report/getReturnSearchList`;
  public savedEAForm14 = `${this.serverUrl.apiServerAddress}api/auth/app/report/getNonReturnSearchList`;
  public sechduleIIUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getSechduleIIUrl`;
  public sechduleIII_V_Url = `${this.serverUrl.apiServerAddress}api/auth/app/report/getSechduleIII_V_Url`;


  get data(): DEAForm[] {
    return this.dataChange.value;
  }
 


  addScheduleInfo(dEAForm:DEAForm): void {
    this.dialogData = dEAForm;
    this.httpService.post<DEAForm>(this.savedEAForm, dEAForm).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

}