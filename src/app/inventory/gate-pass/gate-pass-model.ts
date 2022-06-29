
export class GatePass {
  id: number;
  customer: string;
  organizationName: string;
  manualGatePassNumber:string;
  location:string;
  gatePassDate:string;
  address: string;
  deliveryOrderNo: string;
  party: string;
  invoiceNo: string;
  modeOfDelivery:string;
  vendor:string;
  personName:string;
  purchaseOrder: string;
  reasonRemarks: string;
  gatePassdtlBean:any;
  
  constructor(gatePass) {
    {
      this.id = gatePass.id || this.getRandomID();
      this.customer = gatePass.customer || "";
      this.organizationName = gatePass.organizationName || "";
      this.manualGatePassNumber = gatePass.manualGatePassNumber || "";
      this.location = gatePass.location || "";
      this.gatePassDate = gatePass.gatePassDate || "";
      this.address = gatePass.address || "";
      this.deliveryOrderNo = gatePass.deliveryOrderNo || "";
      this.party = gatePass.party || "";
      this.invoiceNo = gatePass.invoiceNo || "";
      this.modeOfDelivery = gatePass.modeOfDelivery || "";
      this.vendor = gatePass.vendor || "";
      this.personName = gatePass.personName || "";
      this.purchaseOrder = gatePass.purchaseOrder || "";
      this.reasonRemarks = gatePass.reasonRemarks || "";
      this.gatePassdtlBean = gatePass.gatePassdtlBean || "";
      
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
