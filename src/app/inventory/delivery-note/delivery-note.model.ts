export class DeliveryNote {
    
  id: number;
  organizationName: string;
  customerCode: string;
  sourceLocationid: string; 
  action :any;
   companyCode:any;
  deliveryDate:any;
  constructor(deliveryNote) {
    {
      this.id = deliveryNote.id || this.getRandomID();
      this.organizationName = deliveryNote.organizationName || "";
      this.customerCode = deliveryNote.customerCode || "";
      this.sourceLocationid = deliveryNote.sourceLocationid || "";
      this.companyCode = deliveryNote.companyCode || "";
      this.action = deliveryNote.action || "";
      this.deliveryDate = deliveryNote.deliveryDate || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
