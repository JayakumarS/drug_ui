import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class serverLocations {
  apiServerAddress: any;
  constructor() {
    if (window.location.hostname === 'localhost') {
      //Local
      this.apiServerAddress = 'http://localhost:8080/';
     //this.apiServerAddress = 'http://65.108.201.61:8090/drug/';
    } else if(window.location.hostname === '183.82.246.243'){
      this.apiServerAddress = 'http://65.108.201.61:8090/drug/';
    }else if(window.location.hostname === '192.168.5.100'){
      this.apiServerAddress = 'http://65.108.201.61:8090/drug/';
    }
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];
