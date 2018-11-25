import { MatChipInputEvent } from '@angular/material';

import { Product } from 'app/main/purchaseorder/poform/poform.model';
import { appConst } from 'config';



export class Challan {
    id?:string;
    supplierId?: string;
    supplier?: string;
    challanDate?: Date;
    challanNumber?: string;
    manufacturer?: string;
    manufacturerId?: string;
    manufacturersAddress?: string;
    /**
     * Purchase Order date
     */

    
    poNumberId: string;
    poNumber: string;
    poDate?: Date;
    product?: Array<Product>;
    preparedBy?: string;
    designation?: string;
    deliveryDate?: Date;
    deliveryAddress?: string;
    finalChallan?: string;
    fileName?: string;
    filePaths?: string;
    status?:string;
    constructor(challan?) {
        challan = challan || {};
        this.id = challan.id;
        this.supplierId=challan.supplierId || '';
        this.supplier = challan.supplier || '';
        this.challanDate = challan.challanDate || '';
        this.challanNumber = challan.challanNumber || '';
        this.manufacturer = challan.manufacturer || '';
        this.manufacturerId = challan.manufacturerId || '';
        this.manufacturersAddress = challan.manufacturersAddress || '';
        this.poNumberId = challan.poNumberId || challan.poNumberId || '';
        this.poNumber = challan.poNumber || '';
        this.poDate = challan.poDate || '';
        this.product = challan.product || [];
        this.preparedBy = challan.preparedBy || '';
        this.designation = challan.designation || '';
        this.deliveryDate = challan.deliveryDate || '';
        this.deliveryAddress = challan.deliveryAddress || '';
        this.finalChallan = challan.finalChallan || false;
        this.status=challan.status || appConst.default_status;
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
        const index = this.product.indexOf(category);

        if ( index >= 0 )
        {
            this.product.splice(index, 1);
        }
    }


}








