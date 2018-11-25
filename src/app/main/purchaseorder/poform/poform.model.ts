import { appConst } from "config";

export class PurchaseOrder
{

   
    id?: any;
    manufacturerId?:string;
    manufacturerName?: string;
    poNumberId: string;
    poNumber?: string;
    createDate?: Date;
    issueDate?: Date;
    supplierId?:string;
    supplierName?: string;
    supplierAddrsId?:string;
    supplierAddrs?: string;
    /**
     * Organisation ID
     */
    delivryAddrsId?: string;
    delivryAddrs?: string;
    billingAddrsId?: string;
    billingAddrs?: string;
    productDetails?:Product[];
    grndTotal?: number;
    advPaymnt?: number;
    netPayable?: number;
    amtInWords?: string;
    status?: string;
    reason?: string;
    /**
     * Constructor
     *
     * @param purchaseorder
     */
    constructor(purchaseorder?)
    {
        purchaseorder = purchaseorder || {};
        this.id = purchaseorder.id || undefined;
        this.manufacturerId = purchaseorder.manufacturerId || undefined;
        this.manufacturerName = purchaseorder.manufacturerName || '';
        this.poNumberId = purchaseorder.poNumberId || '';
        this.poNumber = purchaseorder.poNumber || '';
        this.createDate = purchaseorder.createDate || '';
        this.issueDate = purchaseorder.issueDate || '';
        this.supplierId = purchaseorder.supplierId || undefined; 
        this.supplierName = purchaseorder.supplierName || '';
        this.supplierAddrsId = purchaseorder.supplierAddrsId || undefined;
        this.supplierAddrs = purchaseorder.supplierAddrs || '';
        this.delivryAddrsId = purchaseorder.delivryAddrsId || undefined;
        this.delivryAddrs = purchaseorder.delivryAddrs || '';
        this.billingAddrsId = purchaseorder.billingAddrsId || undefined;
        this.billingAddrs = purchaseorder.billingAddrs || '';
        this.productDetails = purchaseorder.productDetails || [];
        this.grndTotal = purchaseorder.grndTotal || 0.00;
        this.advPaymnt = purchaseorder.advPaymnt || 0.00;
        this.netPayable = purchaseorder.netPayable || 0.00;
        this.amtInWords = purchaseorder.amtInWords || "";
        this.status = purchaseorder.status || appConst.default_status;
        this.reason = purchaseorder.reason || '';
    }
}

export class Product {
    id?:string;
    product: string;
    description: string;
    unitId: number;
    unitName: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    taxCodeId: number;
    taxCodeName: string;
        constructor(productdtls?)
    {
        productdtls = productdtls || {};
        this.id = productdtls.id || '';
        this.product = productdtls.product || '';
        this.description = productdtls.description || '';
        this.unitId = productdtls.unitId || 0;
        this.unitName = productdtls.unitName || productdtls.unit || '';    
        this.qty = productdtls.qty || productdtls.quantity || 0;
        this.unitPrice = productdtls.unitPrice || 0;
        this.totalPrice = productdtls.totalPrice || 0;
        this.taxCodeId = productdtls.taxCodeId || 0;
        this.taxCodeName = productdtls.taxCodeName || '';
    }
}



export class Units {
    id?:string;
    name?: string;
    constructor(units?)
    {
        units = units || {};
        this.id = units.id || '';
        this.name = units.name || '';
    }
}

export class TaxCode {
    id?:string;
    code?: string;
    description?: string;
    rate?: string;
    method?: string;
    name?: string;
    constructor(taxcode?)
    {
        taxcode = taxcode || {};
        this.id = taxcode.id || '';
        this.code = taxcode.code || '';
        this.description = taxcode.description || '';
        this.rate = taxcode.rate || '';
        this.method = taxcode.method || '';
        this.name = taxcode.name || '';
    }
}