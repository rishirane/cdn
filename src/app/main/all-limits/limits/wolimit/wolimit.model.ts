import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

import { appConst } from 'config';


export class FactorLimit {
    supplierAddress?: string;
    creditLimit: number;
    effectiveDate?: Date;
    term: number;
    supplierName?: string;
    supplierId?:string;
    expiryDate?: Date;
    advPayment: number;
    interestRate: number;
    debtorLimitSetUp?: debtorLimitSetUp[];
    penaltyCharge: number;
    serviceCharge: number;
    creditPeriod: number;
    gracePeriod: number; 
    branchId: string;
    loanAccNo: number;
    id?:string;
    termPeriodId: number;
    termPeriodName: string;
    status?:string;

    /**
     * Constructor
     *
     * @param woLimit
     */
    constructor(woLimit?) {
        woLimit = woLimit || {};
        this.supplierAddress = woLimit.supplierAddress || '';
        this.supplierId = woLimit.supplierId || '';
        this.creditLimit = woLimit.creditLimit || 0.00;
        this.effectiveDate = woLimit.effectiveDate || '';
        this.term = woLimit.term || 0;
        this.supplierName = woLimit.supplierName || '';
        this.expiryDate = woLimit.expiryDate || '';
        this.advPayment = woLimit.advPayment || 0;
        this.interestRate = woLimit.interestRate || 0;
        this.penaltyCharge = woLimit.penaltyCharge || 0;
        this.serviceCharge = woLimit.serviceCharge || 0;
        this.creditPeriod = woLimit.creditPeriod || 0;
        this.gracePeriod = woLimit.gracePeriod || 0;
        this.branchId = woLimit.branchId || '';
        this.loanAccNo = woLimit.loanAccNo || 0;
        this.status = woLimit.status || appConst.default_status;
        this.id = woLimit.id|| '';
        this.termPeriodId = woLimit.termPeriodId || undefined;
        this.termPeriodName = woLimit.termPeriodName || '';
        this.debtorLimitSetUp = woLimit.debtorLimitSetUp || [];

    }
}

export class debtorLimitSetUp {
    manufacturerName: string;
    workOrderLimit: number;
    debtorCreditPeriod?: number;
    debtorGracePeriod?: number;
    advPaymentRate?: number;
    maxDays?:number;
    constructor(woLimitls?) {
        woLimitls = woLimitls || {};
        this.manufacturerName = woLimitls.manufacturerName || '';
        this.workOrderLimit = woLimitls.workOrderLimit || 0.00;
        this.debtorCreditPeriod = woLimitls.debtorCreditPeriod || 0;
        this.debtorGracePeriod = woLimitls.debtorGracePeriod || 0;
        this.advPaymentRate =woLimitls.advPaymentRate || 0;
        this.maxDays =woLimitls.maxDays || 0;
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








