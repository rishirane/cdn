import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { LimitsService } from '../../limits.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { SCMCurrency } from '@custom/transform/currency.pipe';
import { FactorLimit, debtorLimitSetUp } from '../../wolimit/wolimit.model';
import { Org } from '../../../../org/orgform/org.model';
@Component({
    selector: 'app-debtor-limit',
    templateUrl: './debtor-limit.component.html',
    styleUrls: ['./debtor-limit.component.scss']
})
export class DebtorLimitComponent implements OnInit, ChildItemComponent {

    @Input() data: debtorLimitSetUp;
    productPageType: boolean = true;
    pageType: string;
    WOLimitForm: FormGroup;
    organisation: Org[] = [];

    public _changableData = new BehaviorSubject<any>([]);
    // Private
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {EcommerceProductService} _productService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private currencyPipe: SCMCurrency,
        private _formBuilder: FormBuilder,
        private _limitService: LimitsService,
        // private _loginService: LoginService
    ) {
        this._unsubscribeAll = new Subject();
        this._changableData = new BehaviorSubject<any>(this.data);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    ngOnInit(): void {
        this._changableData
            .subscribe(tableData => {
                if (tableData === false) {
                    this.productPageType = false;
                    return;
                }
                if (tableData) {

                    this.data = new debtorLimitSetUp(tableData);
                    this.pageType = 'edit';
                }
                else {

                    this.pageType = 'new';
                    this.data = new debtorLimitSetUp();
                }
                this.productPageType = true;
                console.log(this.data);
                this.WOLimitForm = this.createForms(this.data);
                // this.addSubscribers();

            });
        this._limitService.getOrg().then((data) => {

            this.organisation = data;
        })

    }

    addNewClicked() {

        this._changableData.next(null);
    }

    setData(data) {
        this._changableData.next(data);
    }
    getValue() {
        return this._changableData.getValue()
    }

    saveData() {
        let dataToUpdate = this.WOLimitForm.value;

        this._changableData.next(dataToUpdate);

        return this.getValue();
    }
    createForms(debtordtls): FormGroup {
        console.log(debtordtls);
        return this._formBuilder.group({
            manufacturerName: [debtordtls.manufacturerName, Validators.required],
            workOrderLimit: [debtordtls.workOrderLimit, Validators.required],
            debtorCreditPeriod: [debtordtls.debtorCreditPeriod, Validators.required],
            debtorGracePeriod: [debtordtls.debtorGracePeriod, Validators.required],
            advPaymentRate: [debtordtls.advPaymentRate, Validators.required],
            maxDays: [debtordtls.maxDays, Validators.required]
        })

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }





    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save product
     */
    saveProduct(): void {
        alert("Save");

    }



    addProduct(): void {
        //this.productPageType="new"
    }


    submit(formrecv: any) {
        console.log(formrecv);

    }



}





