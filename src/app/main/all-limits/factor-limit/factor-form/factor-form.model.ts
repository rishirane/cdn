import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';
import { appConst } from 'config';

export class FactorLimit {
    supplierAddress?: string;
    creditLimit?: number;
    effectiveDate?: Date;
    term?: number;
    termPeriod?: termPeriodInt;
    supplierName?: string;
    supplierId?:string;
    expiryDate?: Date;
    advPayment?: number;
    interestRate?: number;
    penaltyCharge?: number;
    serviceCharge?: number;
    creditPeriod?: number;
    gracePeriod?: number; 
    branchId?: string;
    loanAccNo?: number;
    status?: string;
    id?:string;
    salesLimitSetUp?: salesLimitSetUp[];
    SNDRate?:number;
    termPeriodId: number;
    termPeriodName: string;
    SNDThreshold?:number;
    

    /**
     * Constructor
     *
     * @param foLimit
     */
    constructor(foLimit?) {
        foLimit = foLimit || {};
        this.supplierAddress = foLimit.supplierAddress || '';
        this.creditLimit = foLimit.creditLimit || 0.00;
        this.effectiveDate = foLimit.effectiveDate || '';
        this.term = foLimit.term || 0;
        this.supplierName = foLimit.supplierName || '';
        this.termPeriod = foLimit.termPeriod || '';
        this.expiryDate = foLimit.expiryDate || '';
        this.advPayment = foLimit.advPayment || 0;
        this.interestRate = foLimit.interestRate || 0;
        this.penaltyCharge = foLimit.penaltyCharge || 0;
        this.serviceCharge = foLimit.serviceCharge || 0;
        this.creditPeriod = foLimit.creditPeriod || 0;
        this.gracePeriod = foLimit.gracePeriod || 0;
        this.branchId = foLimit.branchId || '';
        this.loanAccNo = foLimit.loanAccNo || 0;
        this.supplierId = foLimit.supplierId || undefined; 
        this.status = foLimit.status || appConst.default_status;
        this.id = foLimit.id || '';
        this.SNDRate = foLimit.SNDRate || 0;
        this.SNDThreshold = foLimit.SNDThreshold || 0;
        this.termPeriodId = foLimit.termPeriodId || undefined;
        this.termPeriodName = foLimit.termPeriodName || '';
        this.salesLimitSetUp = foLimit.salesLimitSetUp || [];

    }
}



export class salesLimitSetUp {
    manufacturerId?:string;
    manufacturerName: string;
    salesLedgerLimit: number;
    salesCreditPeriod?: number;
    salesGracePeriod?: number;
    advPaymentRate?: number;
    permittedCreditLimit?: number;
    maxDays?:number;
    id?:string
    constructor(foLimitls?) {
        foLimitls = foLimitls || {};
        this.manufacturerId = foLimitls.manufacturerId || undefined;
        this.manufacturerName = foLimitls.manufacturerName || '';
        this.salesLedgerLimit = foLimitls.salesLedgerLimit || 0.00;
        this.salesCreditPeriod = foLimitls.salesCreditPeriod || 0;
        this.salesGracePeriod = foLimitls.salesGracePeriod || 0;
        this.advPaymentRate =foLimitls.advPaymentRate || 0;
        this.permittedCreditLimit = foLimitls.permittedCreditLimit || 0;
        this.maxDays = foLimitls.maxDays || 0;
        this.id = foLimitls.id;
        
    }
}
export class termPeriodInt {
    id: number;
    name: string;
    constructor(termPeriodInt?) {
        termPeriodInt = termPeriodInt || {};
        this.id = termPeriodInt.id || '';
        this.name = termPeriodInt.name || '';
    }
}





