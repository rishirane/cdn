import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';


export class FundReq {
    id: any;
    salesLedgerLimit: number;
    advancePaymentRate_apr: number;
    creditLimit: number;
    totInvAmt: number;
    invAdj: number;
    slBal: number;
    expInv: number;
    effSalesLedger: number;
    effSLlimit: number;
    effCreditLimit: number;
    loanBal: number;
    unallocatedCollection: number;
    avlFund: number;
    debtorName: string;
    overdueInvoice: number;
    maxDaysOD: number;
    invoiceDiscounted: number;
    financeAmount: number;
    paymentReceived: number;
    loanBalance: number;
    noof_OD_Invoice: number;
    availableFund: number;
    refundFromCollection: number;
    availableforFactoring: number;

    constructor(fundReq?) {
        fundReq = fundReq || {};
        this.id = fundReq.id || undefined;
        this.salesLedgerLimit = fundReq.salesLedgerLimit || undefined;
        this.advancePaymentRate_apr = fundReq.advancePaymentRate_apr || undefined;
        this.creditLimit = fundReq.creditLimit || undefined;
        this.totInvAmt = fundReq.totInvAmt || undefined;
        this.invAdj = fundReq.invAdj || undefined;
        this.slBal = fundReq.slBal || undefined;
        this.expInv = fundReq.expInv || undefined;
        this.effSalesLedger = fundReq.effSalesLedger || undefined;
        this.effSLlimit = fundReq.effSLlimit || undefined;
        this.effCreditLimit = fundReq.effCreditLimit || undefined;
        this.loanBal = fundReq.loanBal || undefined;
        this.unallocatedCollection = fundReq.unallocatedCollection || undefined;
        this.avlFund = fundReq.avlFund || undefined;
        this.debtorName = fundReq.debtorName || '';
        this.overdueInvoice = fundReq.overdueInvoice || undefined;
        this.maxDaysOD = fundReq.maxDaysOD || undefined;
        this.invoiceDiscounted = fundReq.invoiceDiscounted || undefined;
        this.financeAmount = fundReq.financeAmount || undefined;
        this.paymentReceived = fundReq.paymentReceived || undefined;
        this.loanBalance = fundReq.loanBalance || undefined;
        this.noof_OD_Invoice = fundReq.noof_OD_Invoice || undefined;
        this.availableFund = fundReq.availableFund || undefined;
        this.refundFromCollection = fundReq.refundFromCollection || undefined;
        this.availableforFactoring = fundReq.availableforFactoring || undefined
    }

    /**
     * Add category
     *
     * @param {MatChipInputEvent} event
     */
    addProducts(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add category
        if (value) {
            // this.productDetails.push(value);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

}


