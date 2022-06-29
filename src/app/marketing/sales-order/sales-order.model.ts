import { formatDate } from "@angular/common";
export class SalesOrder {
  id: number;
  customer: string;
  validFrom: string;
  validTo: string;
  currency: string;
  deliveryDate: string;
  countValue: string;
  salesOrderdtlBean:any;
  salesQuoteNo : any;
  termCondition : any;
  expectedDate : any;
  price : any;
  qty : any;
  item : any;


  constructor(salesOrder) {
    {
      this.id = salesOrder.id || this.getRandomID();
      this.customer = salesOrder.customer || "";
      this.validFrom = salesOrder.validFrom || "";
      this.validTo = salesOrder.validTo || "";
      this.currency = salesOrder.currency || "";
      this.deliveryDate = salesOrder.deliveryDate || "";
      this.countValue = salesOrder.countValue || "";
      this.salesQuoteNo = salesOrder.salesQuoteNo || "";
      this.termCondition = salesOrder.termCondition || "";
      this.expectedDate = salesOrder.expectedDate || "";
      this.price = salesOrder.price || "";
      this.qty = salesOrder.qty || "";
      this.item = salesOrder.item || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
