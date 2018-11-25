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
    manufacturersLimitSetUp?: manufacturersLimitSetUp[];
    branchId?: string;
    loanAccNo?: number;
    status?: string;
    id?:string;
    termPeriodId: number;
    termPeriodName: string;
    SNDRate?:number;
    maxDays?:number;
    /**
     * Constructor
     *
     * @param foLimit
     */
    constructor(foLimit?) {
        foLimit = foLimit || {};
        this.supplierAddress = foLimit.supplierAddress || '';
        this.creditLimit = foLimit.creditLimit || 0;
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
        this.maxDays = foLimit.maxDays || 0;
        this.supplierId = foLimit.supplierId || undefined; 
        this.status = foLimit.status || appConst.default_status;
        this.id = foLimit.id || '';
        this.SNDRate = foLimit.SNDRate || 0;
        this.termPeriodId = foLimit.termPeriodId || undefined;
        this.termPeriodName = foLimit.termPeriodName || '';
        this.manufacturersLimitSetUp = foLimit.manufacturersLimitSetUp || [];

    }
}

export class manufacturersLimitSetUp {
    manufacturerName: string;
    demandOrderLimit: number;
    manufacturerCreditPeriod?: number;
    manufacturerGracePeriod?: number;
    advPaymentRate?: number;
    constructor(foLimitls?) {
        foLimitls = foLimitls || {};
        this.manufacturerName = foLimitls.manufacturerName || '';
        this.demandOrderLimit = foLimitls.demandOrderLimit || 0.00;
        this.manufacturerCreditPeriod = foLimitls.manufacturerCreditPeriod || 0;
        this.manufacturerGracePeriod = foLimitls.manufacturerGracePeriod || 0;
        this.advPaymentRate =foLimitls.advPaymentRate || 0;
    }
}
export class termPeriodInt {
    id: number;
    termPeriod: string;
    constructor(termPeriodInt?) {
        termPeriodInt = termPeriodInt || {};
        this.id = termPeriodInt.id || '';
        this.termPeriod = termPeriodInt.termPeriod || '';
    }
}






