import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';
import { appConst } from 'config';



export class Invoice { 
    id?:string;
    supplierName?: string;
    supplierId?: string;
    invoiceDate?: Date;
    invoiceNumber?: string;
    manufacturer?: string;
    manufacturerId?:string; 
    manufacturersAddress?: string;
    /**
     * Purchase Order Number
     */
    poNumberId?: string;
    poNumber?: string;
    /**
     * Purchase Order date
     */

     
    poDate?: Date;
    challanId: string;
    challanNumber?: string;
    challanDate?: Date;
    productDetails?: Array<ProductDetails>;
    grandTotal: number=0.00;
    totalVat: number=0.00;
    totalTax: number=0.00;
    advancePayment: number=0.00;
    totalPayable: number=0.00;
    amountInWords?: string;
    preparedBy?: string;
    designation?: string;
    status?:string;
    constructor(invoice?){
        invoice = invoice || {};
        this.id= invoice.id;
        this.supplierName = invoice.supplierName || '';
        this.supplierId = invoice.supplierId || '';
        this.invoiceDate = invoice.invoiceDate || '';
        this.invoiceNumber = invoice.invoiceNumber || '';
        this.manufacturer = invoice.manufacturer || '';
        this.manufacturerId = invoice.manufacturerId || '';
        this.manufacturersAddress = invoice.manufacturersAddress || '';
        this.poNumberId = invoice.poNumberId || '';
        this.poNumber = invoice.poNumber || '';
        this.poDate = invoice.poDate || '';
        this.challanId = invoice.challanId || '';
        this.challanNumber = invoice.challanNumber || '';
        this.challanDate = invoice.challanDate || '';
        this.productDetails = invoice.productDetails || [];
        this.grandTotal = invoice.grandTotal || 0.00;
        this.totalVat = invoice.totalVat || 0.00;
        this.totalTax = invoice.totalTax || 0.00;
        this.advancePayment = invoice.advancePayment || 0.00;
        this.totalPayable = invoice.totalPayable || 0.00;
        this.amountInWords = invoice.amountInWords || '';
        this.preparedBy = invoice.preparedBy || '';
        this.designation = invoice.designation || '';
        this.status=invoice.status || appConst.default_status;
    }




    /**
     * Add category
     *
     * @param {MatChipInputEvent} event
     */
    addProducts(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add category
        if ( value )
        {
           // this.productDetails.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove category
     *
     * @param category
     */
    removeProducts(category): void
    {
        const index = this.productDetails.indexOf(category);

        if ( index >= 0 )
        {
            this.productDetails.splice(index, 1);
        }
    }

}

export class ProductDetails {
    id:number;
    product?: string;
    quantity?: number;
    unitId?: string;
    unitName?: string;
    unitPrice?: number;
    totalPrice?: number;
    vat?: number;
    tax?: number;
    constructor(productdetails?){
        productdetails = productdetails || {};
        this.id = productdetails.id || '';
        this.product = productdetails.product || '';
        this.quantity = productdetails.quantity || 0.00;
        this.unitId = productdetails.unitId || '';    
        this.unitName = productdetails.unitName || '';    
        this.unitPrice = productdetails.unitPrice || 0.00;    
        this.totalPrice = productdetails.totalPrice || 0.00;    
        this.vat = productdetails.vat || 0.00;    
        this.tax = productdetails.tax || 0.00;    
    }
}


export namespace InvoiceStatus {
    export type StatusEnum = 'approved' | 'rejected';
    export const StatusEnum = {
        Approved: 'approved' as StatusEnum,
        Rejected: 'rejected' as StatusEnum
    }
}

// export class purchaseorders {
//     id: number;
//     poNumber: number;
//     poNumberId: number;
//     issueDate: Date;
//     constructor(purchaseorders?){
//         purchaseorders = purchaseorders || {};
//         this.id = purchaseorders.id || '';
//         this.poNumber = purchaseorders.poNumber || '';
//         this.poNumberId = purchaseorders.poNumberId || '';
//         this.issueDate = purchaseorders.issueDate || '';    
//     }
// }

// export class challans {
//     id: number;
//     challanNumber: number;
//     challanId: number;
//     challanDate: Date;
//     constructor(challans?){
//         challans = challans || {};
//         this.id = challans.id || '';
//         this.challanNumber = challans.challanNumber || '';
//         this.challanId = challans.challanId || '';
//         this.challanDate = challans.challanDate || '';    
//     }
// }
// export class mpnames {
//     id: number;
//     manufacturer: string;
//     manufacturersAddress: string;
//     constructor(mpnames?){
//         mpnames = mpnames || {};
//         this.id = mpnames.manufacturerId || '';
//         this.manufacturer = mpnames.manufacturer || '';
//         this.manufacturersAddress = mpnames.manufacturersAddress || '';    
//     }
// }

export class Units {
    id: number;
    name: string;
    constructor(units?){
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
    constructor(taxcode?)
    {
        taxcode = taxcode || {};
        this.id = taxcode.id || '';
        this.code = taxcode.code || '';
        this.description = taxcode.description || '';
        this.rate = taxcode.rate || '';
        this.method = taxcode.method || '';
    }
}
