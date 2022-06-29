import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { GRNResultBean } from './grn-result-bean';
import { Grn } from './grn.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GrnService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<Grn[]> = new BehaviorSubject<Grn[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient:HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) { 
    super();
  }

  public getPOListVal = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getPOList`;
  public getPODListVal = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getPODtlList`; 
  public getRequisitionVal = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getRequisition`;
  public getLocationVal =  `${this.serverUrl.apiServerAddress}api/auth/app/grn/getLocationList`;
  public uomListVal = `${this.serverUrl.apiServerAddress}api/auth/app/workOrder/getUomList`;
  public vendorListVal = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getVendorList`;
  public vendorAddressVal =  `${this.serverUrl.apiServerAddress}api/auth/app/grn/getVendorAddress`;

  public saveGRN = `${this.serverUrl.apiServerAddress}api/auth/app/grn/saveGRN`;
  public listGRN = `${this.serverUrl.apiServerAddress}api/auth/app/grn/listGRN`;
  public viewGRN = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getGrnEditData`;

  //batch
  public itemAttributes =  `${this.serverUrl.apiServerAddress}api/auth/app/grn/getItemAttributes`;

  get data(): Grn[] {
    return this.dataChange.value;
  }

   /** CRUD METHODS */ 
   addGRN(grn: Grn): void {
    this.dialogData = grn;
    this.httpService.post<Grn>(this.saveGRN, grn).subscribe(data => {
      console.log(data);
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  getAllList(): void {
    this.subs.sink = this.httpService.get<GRNResultBean>(this.listGRN).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.lGRNBean);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}
 
}
