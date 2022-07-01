import { formatDate } from "@angular/common";
export class FileUploadMaster {
  id: number;
  companyCode:string;
  uploadFile:string;
  reportUrl:string;
  constructor(fileUploadMaster) {
    {
      this.id = fileUploadMaster.id || this.getRandomID();
     
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
