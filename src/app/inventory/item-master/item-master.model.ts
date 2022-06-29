export class ItemMaster {
  id: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  itemType: number;
  itemCategory:number;
  saleable: string;
  purchaseable: string;
 
  purchaseMethod:number;
  pruchaseUom:number;
  purchaseReq:number;
  minimumQty:number;
  maximumQty:number;
  reorderLevel:string;
  costingMethod:number;
  costPrice:number;
  warranty:number;
  leadTime:number;
 
  inventoryValuation:number;
   issueMethod:number;

  itemMasterDetailBean: any;
  dataArray: any[];
  
  batchNo:string;
  expiryDate:string;
  mrp:string;
  manufactureDetails:string;
  constructor(itemMaster) {
    {
      this.id = itemMaster.id || this.getRandomID();
      this.itemId = itemMaster.itemId || "";
      this.itemCode = itemMaster.itemCode || "";     
      this.itemName = itemMaster.itemName || "";
      this.itemDescription = itemMaster.itemDescription || "";
      this.itemType = itemMaster.itemType || "";
      this.itemCategory = itemMaster.itemCategory || "";
      this.saleable = itemMaster.saleable || "";
      this.purchaseable = itemMaster.purchaseable || "";

      this.purchaseMethod = itemMaster.purchaseMethod || "";
      this.pruchaseUom = itemMaster.pruchaseUom || "";     
      this.purchaseReq = itemMaster.purchaseReq || "";
      this.minimumQty = itemMaster.minimumQty || "";
      this.maximumQty = itemMaster.maximumQty || "";
      this.reorderLevel = itemMaster.reorderLevel || "";
     
      this.batchNo = itemMaster.batchNo || "";
      this.expiryDate = itemMaster.expiryDate || "";
      this.mrp = itemMaster.mrp || "";
      this.manufactureDetails = itemMaster.manufactureDetails || "";

      this.inventoryValuation = itemMaster.inventoryValuation || "";
       this.issueMethod = itemMaster.issueMethod || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
