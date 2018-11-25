import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';
import { appConst } from 'config';


export class FactorLimit {
    supplierAddress?: string;
    creditLimit?: number;
    effectiveDate?: Date;
    term?: number;
    supplierId?:string;
    supplierName?: string;
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
    termPeriodId: number;
    termPeriodName: string;
    id?:string;
    // SNDRate?:number;
    // SNDThreshold?:number;
    

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
        this.supplierId = foLimit.supplierId || undefined; 
        this.supplierName = foLimit.supplierName || '';
        this.expiryDate = foLimit.expiryDate || '';
        this.advPayment = foLimit.advPayment || 0;
        this.interestRate = foLimit.interestRate || 0;
        this.penaltyCharge = foLimit.penaltyCharge || 0;
        this.serviceCharge = foLimit.serviceCharge || 0;
        this.creditPeriod = foLimit.creditPeriod || 0;
        this.gracePeriod = foLimit.gracePeriod || 0;
        this.branchId = foLimit.branchId || '';
        this.loanAccNo = foLimit.loanAccNo || 0;
        this.termPeriodId = foLimit.termPeriodId || undefined;
        this.termPeriodName = foLimit.termPeriodName || '';
        this.status = foLimit.status || appConst.default_status;
        this.id = foLimit.id;
        // this.SNDRate = foLimit.SNDRate || '';
        // this.SNDThreshold = foLimit.SNDThreshold || '';

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
