export class Lop {
    id : number;
    
    purchaseReqNo: number;
    organizationName: string;
    poNumber: string;
    requestType: string;
    poDate: string;
    woType: string;
    purchaseType: string;
    purchaseFor: string;
    Vendor: string;
    destinationLocation: string;
    Advance: string;
    currency: string;
    costCenter: string;
    termsConditions: string;
    remarks: string;
    paymentTerms: string;
    vendorAddress: string;
    vendorCity: string;
    vendorState: string;
    vendorZip: number;
    vendorCountry: string;
    destinationAddress: string;
    destinationCity: string;
    destinationState: string;
    destinationZip: number;
    destinationCountry: string;
    constructor(lop) {
        {
            this.id = lop.id || this.getRandomID();
            this.organizationName = lop.organizationName || "";
            this.poNumber = lop.poNumber || ""; 
            this.requestType = lop.requestType || ""; 
            this.poDate = lop.poDate || ""; 
            this.woType = lop.woType || ""; 
            this.purchaseType = lop.purchaseType || ""; 
            this.purchaseFor = lop.purchaseFor || "";
            this.Vendor = lop.Vendor || ""; 
            this.destinationLocation = lop.destinationLocation || ""; 
            this.Advance = lop.Advance || ""; 
            this.currency = lop.currency || ""; 
            this.costCenter = lop.costCenter || ""; 
            this.termsConditions = lop.termsConditions || "";
            this.remarks = lop.remarks || ""; 
            this.paymentTerms = lop.paymentTerms || ""; 
            this.vendorAddress = lop.vendorAddress || ""; 
            this.vendorCity = lop.vendorCity || ""; 
            this.vendorState = lop.vendorState || ""; 
            this.vendorZip = lop.vendorZip || "";
            this.vendorCountry = lop.vendorCountry || ""; 
            this.destinationAddress = lop.destinationAddress || ""; 
            this.destinationCity = lop.destinationCity || ""; 
            this.destinationState = lop.destinationState || ""; 
            this.destinationZip = lop.destinationZip || ""; 
            this.destinationCountry = lop.destinationCountry || ""; 
        }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

        };
        return S4() + S4();
    }
}
