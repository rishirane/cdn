import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { takeUntil, combineAll } from 'rxjs/operators';
import { TableConfig, ActionButton, ColumnConfig, ActionType, Actions } from '@custom/config/tablelist.config';
import { ChildListComponent } from '@custom/components/childlist/childlist.component';
import { FundRequisitionService } from './fundrequisitionfactoring.service';
import { Invoice } from '../Invoice/Invoice/invoice/invoice.model';
import { FundReq } from "./fundReq.model";



@Component({
    selector: 'fund-rquisition-factoring',
    templateUrl: './fundrequisitionfactoring.component.html',
    styleUrls: ['./fundrequisitionfactoring.component.scss']
})


export class FundReqFactoring implements OnInit {


    // Vertical Stepper
    fundRequisition: FundReq;
    ApprovedLimitsDetails: FormGroup;
    FundRequest: FormGroup;
    AccountDetails: FormGroup;
    accountNo: FormControl;
    accountName: FormControl;
    bankName: FormControl;
    branchName: FormControl;
    paymentMode: FormControl;
    fundReq: FormControl;
    refundCollection: FormControl;
    amtFrmFact: FormControl;
    totAmt: FormControl;
    maxValue: number;
    paymentModes = [{
        id: 1,
        name: 'Cheque'
    }, {
        id: 2,
        name: 'Online Payment'
    }];

    accounts = [{
        id: 1,
        name: 'ICIC0923982312'
    }, {
        id: 2,
        name: 'IDBI9834287423'
    }];


    private _unsubscribeAll: Subject<any>;

    firstValue: number;
    secondValue: number;


    invoice: Invoice;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private _fundrequisitionservice: FundRequisitionService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();
        this.fundRequisition = new FundReq();
    }


    ngOnInit() {

        this.fundRequisition = new FundReq();
        this.ApprovedLimitsDetails = this.createControl(this.fundRequisition);

        this._fundrequisitionservice.onDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(fundReqData => {

                if (fundReqData) {
                    this.fundRequisition = new FundReq(fundReqData);
                    this.maxValue = this.fundRequisition.availableforFactoring;
                }

                this.updateValues(this.fundRequisition);

                // this.createControl(this.organisation);
            });

        this.FundRequest = this._formBuilder.group({
            fundReq: [''],
            availableforFactoring: this.fundRequisition.availableforFactoring
        });
        // this.calculateTotal();

        this.AccountDetails = this._formBuilder.group({
            accountNo: [''],
            accountName: [''],
            bankName: [''],
            branchName: [''],
            paymentMode: [''],
            fundReq: [''],
            refundCollection: [''],
            amtFrmFact: [''],
            totAmt: ['']
        })

    }

    showDummyData() {
        this.AccountDetails.controls['accountName'].setValue("asdsaf");
        this.AccountDetails.controls['bankName'].setValue("SBI");
        this.AccountDetails.controls['branchName'].setValue("Dhaka");
    }

    updateValues(obj: any) {

        this.ApprovedLimitsDetails.patchValue(obj);
    }

    maxLengthCheck(object) {
        let maxValueLength = this.maxValue.toString().length;
        console.log("value", object.fundReq)
        if (object.value.length > maxValueLength)
            object.value = object.value.slice(0, maxValueLength)
    }

    getDifference(paramA, paramB) {
        let difference = paramA - paramB;
        console.log("asdsajdhf", difference)
        return difference;
    }

    getMin(value) {
        console.log("this.totalInvoiceAmount", value);
        // console.log("value",this.totalInvoiceAmount.value);
        // this.getMinimum(this.totalInvoiceAmount.value, this.invoiceAdjusted.value);
    }

    getMinimum(paramA, paramB) {
        let min = Math.min(paramA, paramB)
        console.log("asdsajdhf", min)
        return min;
    }

    createControl(fundRequisition?: FundReq): FormGroup {
        // console.log(fundRequisition);
        this.ApprovedLimitsDetails = this._formBuilder.group({
            id: [fundRequisition.id],
            salesLedgerLimit: [fundRequisition.salesLedgerLimit],
            advancePaymentRate_apr: [fundRequisition.advancePaymentRate_apr, Validators.required],
            creditLimit: [fundRequisition.creditLimit, Validators.required],
            totInvAmt: [fundRequisition.totInvAmt, Validators.required],
            invAdj: [fundRequisition.invAdj, Validators.required],
            slBal: [fundRequisition.slBal, Validators.required],
            expInv: [fundRequisition.expInv, Validators.required],
            effSalesLedger: [fundRequisition.effSalesLedger, Validators.required],
            effSLlimit: [fundRequisition.effSLlimit, Validators.required],
            effCreditLimit: [fundRequisition.effCreditLimit, Validators.required],
            loanBal: [fundRequisition.loanBal],
            unallocatedCollection: [fundRequisition.unallocatedCollection],
            avlFund: [fundRequisition.avlFund],
            debtorName: [fundRequisition.debtorName],
            overdueInvoice: [fundRequisition.overdueInvoice],
            maxDaysOD: [fundRequisition.maxDaysOD],
            invoiceDiscounted: [fundRequisition.invoiceDiscounted],
            noof_OD_Invoice: [fundRequisition.noof_OD_Invoice],
            financeAmount: [fundRequisition.financeAmount],
            paymentReceived: [fundRequisition.paymentReceived],
            loanBalance: [fundRequisition.loanBalance],
            availableFund: [fundRequisition.availableFund],
            refundFromCollection: [fundRequisition.refundFromCollection],
            availableforFactoring: [fundRequisition.availableforFactoring]
        });
        return this.ApprovedLimitsDetails;
    }

    calculateTotal() {
        // this.ManufacturerDetails.controls['manufacturerName'].valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((selectedValue) => {
        //         this.firstValue = selectedValue;
        //         this.calculateFinalValue();
        //     })

        // this.ApprovedLimitsDetails.controls['limit'].valueChanges
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((selectedValue) => {
        //         this.secondValue = selectedValue;
        //         this.calculateFinalValue();

        //     })

    }

    calculateFinalValue() {

        let FinalTotal = this.firstValue * this.secondValue;
        // this.CurrentPositionDetails.patchValue({ "current": FinalTotal });
    }


    finishVerticalStepper(data1, data2, data3, data4, data5, data6) {
        console.log(data1);
        console.log(data2);
        console.log(data3);
        console.log(data4);
        console.log(data5);
        console.log(data6);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
