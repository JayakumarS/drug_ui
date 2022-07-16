import { Injectable } from '@angular/core';
import * as moment from "moment";
import { serverLocations } from '../auth/serverLocations';

@Injectable()
export class CommonService {

  constructor(

    private serverUrl:serverLocations
  ) { }

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
  public getCompanyMasterDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyMasterDropdownList`;
  public getdebitMemoDropdownList= `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getDebitMemoDropdownList`;
 

}
