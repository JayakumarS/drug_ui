export class Grn{
     companyId: number;
      poId: number;
      poType: string;
      requestDate: string;
      locId: number;
      dstLocId: number;
      costCenter: string;
      requestedBy: string;
      reqNumber: string;
      poRequisition:string;
      grnDate:string;
      address:string;
      city:string;
      state:string;
      country: string;
      invoiceNo: number;
      vendorId : number;
      invoiceDate: string;
      dueDate: string;
      delOrderNo: number;
      description:string;
      delOrderDate:string;
      subTotal:number;
      discount:number;
      cgst:number;
      sgst:number;
      igst:number;
      freight:number;
      otherCharges:number;
      total:number;
      remarks: any;
      transMode: number;
      grnCode: string;
      vendorName : string;
      poNo : string;
      preparedBy : string;

    constructor(grn) {
        {
            this.companyId = grn.companyId || "";
            this.poId = grn.poId || ""; 
            this.poType = grn.poType || ""; 
            this.locId = grn.locId || ""; 
            this.dstLocId = grn.dstLocId || ""; 
            this.costCenter = grn.costCenter || ""; 
            this.requestedBy = grn.requestedBy || "";
            this.reqNumber = grn.reqNumber || "";
            this.poRequisition = grn.poRequisition || "";
            this.grnDate = grn.grnDate || "";
            this.address = grn.address || "";
            this.city = grn.city || "";
            this.state = grn.state || "";
            this.country = grn.country || "";;
            this.invoiceNo = grn.invoiceNo || "";
            this.vendorId = grn.vendorId || "";
            this.invoiceDate = grn.invoiceDate || "";
            this.dueDate = grn.dueDate || "";
            this.delOrderNo = grn.delOrderNo || "";
            this.description = grn.description || "";
            this.delOrderDate = grn.delOrderDate || "";
            this.subTotal = grn.subTotal || "";
            this.discount = grn.discount || "";
            this.cgst = grn.cgst || "";
            this.sgst = grn.sgst || "";
            this.igst = grn.igst || "";
            this.freight = grn.freight || "";
            this.otherCharges = grn.otherCharges || "";
            this.total = grn.total || "";
            this.remarks = grn.remarks || "";
            this.transMode = grn.transMode || "";
            this.grnCode = grn.grnCode || "";
            this.vendorName = grn.vendorName || "";
            this.poNo = grn.poNo || "";
            this.preparedBy = grn.preparedBy || "";

        }
    }
    
}
