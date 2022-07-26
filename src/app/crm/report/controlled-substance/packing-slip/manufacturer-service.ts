import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ManufacturerForm } from './add-packing-slip/manufacturer-models';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ManufacturerFormService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<ManufacturerForm[]> = new BehaviorSubject<ManufacturerForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public manufacturerAddressUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getManufacturerAddress`;
  public companyAddressUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getCompanyAddress`;



  


  get data(): ManufacturerForm[] {
    return this.dataChange.value;
  }
 


}