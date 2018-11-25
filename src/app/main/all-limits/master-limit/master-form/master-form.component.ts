
import { masterLimit, limitTypeInt } from "../master-form/master-form.model";
import { ChildItem } from '@custom/components/childlist/child-item';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors,FormArray,FormControl } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MasterLimitService } from "../master-limit.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { SCMCurrency } from '@custom/transform/currency.pipe';
import { Org } from '../../../org/orgform/org.model';
import { Http, Response, Headers } from '@angular/http';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { LoginService } from '../../../login/logindetails.service';
import { ChildListComponent } from '@custom/components/childlist/childlist.component';
import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { statusCode,MODE, ORGTYPE } from "config";
@Component({
    selector: 'app-master-form',
    templateUrl: './master-form.component.html',
    styleUrls: ['./master-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MasterFormComponent implements OnInit {

    productPageType: boolean = true;
    pageType: string;
    snames: Org[] = [];
    master: masterLimit = new masterLimit();
    public masterLimitForm: FormGroup;
    dontshow: boolean = true;
    limitTypes: limitTypeInt[] = [];
    addresses;
    public id;
    public _changableData = new BehaviorSubject<any>([]);
    isReadOnly: boolean = false;

    mode: string;
    // Private

    snamesBehaviour: BehaviorSubject<any>;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _formBuilder: FormBuilder,
        private _masterService: MasterLimitService,
        private http: Http,
        // private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.snamesBehaviour = new BehaviorSubject({});
    }
    ngOnInit() {
        // Subscribe to update product on changes
        this.mode = MODE.view; 
        this.isReadOnly = true;
        this.masterLimitForm = this.createControl(this.master);

        this._masterService.onDataChanged.subscribe((masterData) => {

            if (masterData) {

                this.master = new masterLimit(masterData);

                if (this.master.status === statusCode.Draft) {
                    this.pageType = 'draft';
                } else {
                    this.pageType = 'edit';
                }

            }
            else {
                this.pageType = 'new';
            }

            this.updateValues(this.master);
        });

        this._masterService.getMiscOrgData().then((data) => {

            this.limitTypes = data.limitTypes;
            console.log(this.limitTypes);
        });
        this._masterService.getSuppliers().then(snames => {
            this.snamesBehaviour.next(snames);
        });
        this.addSubscribers();
        this.masterLimitSubscribers();
    }

    addSubscribers() {

        this.masterLimitForm.controls['supplierId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {

                this.snames.filter(element => {
                    if (element.id == selectedValue) {

                        const orgIndx = this.snames.findIndex(record => record.id === selectedValue);

                        let orgnizations = this.snames[orgIndx];
                       
                        if (orgnizations) {
                            this.updateValues({ 'supplierName': orgnizations.orgName })
                        }

                        // console.log(element);
                        this.addresses = element.address

                        this._masterService.workOrderDetails(element.id).then((data) => {
                            console.log("data of WODetails",data)
                            this.updateValues({ 'woBranchId': data[0].branchId,'woAccNo': data[0].loanAccNo,'woLimit': data[0].debtorLimitSetUp[0].workOrderLimit})
                        });

                        this._masterService.factorLimitDetails(element.id).then((data) => {
                            console.log("data of factorDetails",data)
                            this.updateValues({ 'factoringBranchId': data[0].branchId,'factoringAccNo': data[0].loanAccNo,'factoringLimit': data[0].salesLimitSetUp[0].salesLedgerLimit })
                            // this.updateValues(data)
                        });

                    }
                });
            }
            )

        this.snamesBehaviour.subscribe(snames => {
            for (let j in snames) {
                this.snames.push(new Org(snames[j]));
            }
            this.masterLimitForm.controls['supplierId'].updateValueAndValidity();
        });

    }
    masterLimitSubscribers(){
        this.masterLimitForm.controls['limitTypeId'].valueChanges.subscribe((selectedValue) => {
            if (this.limitTypes) {
                const orgIndx = this.limitTypes.findIndex(record => record.id === selectedValue);
                let entityType = this.limitTypes[orgIndx];
                if (entityType) {
                    this.updateValues({ 'limitTypeName': entityType.name})
                
                }
            }
        });
    }
    /**
       * @author: Madhu
       * @argument:none
       * @description:Form Validation
       */
    createControl(mLimit?: masterLimit): FormGroup {
        console.log("value of", mLimit)
        this.masterLimitForm = this._formBuilder.group({
            supplierName: [mLimit.supplierName],
            limitTypeName: [mLimit.limitTypeName],
            limitTypeId: [mLimit.limitTypeId, Validators.required],
            totalLimit: [mLimit.totalLimit, Validators.required],
            woBranchId: [mLimit.woBranchId, Validators.required],
            woAccNo: [mLimit.woAccNo, Validators.required],
            woLimit: [mLimit.woLimit, Validators.required],
            factoringBranchId: [mLimit.factoringBranchId, Validators.required],
            factoringAccNo: [mLimit.factoringAccNo, Validators.required],
            factoringLimit: [mLimit.factoringLimit, Validators.required],
            supplierId: [mLimit.supplierId, Validators.required],
            id: [mLimit.id],
            status: [mLimit.status],


        });
        return this.masterLimitForm;
    }
    /**
       * @author: Madhu
       * @argument:none
       * @description:Update Values of Form
       */
    updateValues(obj: any) {

        this.masterLimitForm.patchValue(obj);
    }
    // set totalLimit value:
    valueChange(MatSelectChange) {
        console.log("value is", MatSelectChange.value)
        let val = MatSelectChange.value;
        let compositeData = this.masterLimitForm.getRawValue();

        let mLimit = new masterLimit(compositeData);
        if (mLimit.factoringAccNo) {
            mLimit.factoringAccNo = parseInt("" + mLimit.factoringAccNo);
        }
        if (mLimit.woLimit) {
            mLimit.woLimit = parseInt("" + mLimit.woLimit);
        } if (mLimit.factoringLimit) {
            mLimit.factoringLimit = parseInt("" + mLimit.factoringLimit);
        }
        if (val == 2) {
            mLimit.totalLimit = 0;
            console.log("val:", val);

            console.log("wo:", mLimit.woLimit);
            console.log("factor:", mLimit.factoringLimit);
            mLimit.totalLimit = mLimit.woLimit + mLimit.factoringLimit;
            this.masterLimitForm.controls['totalLimit'].setValue(mLimit.totalLimit);
        }

        if (val == 1) {
            mLimit.totalLimit = 0;
            console.log("val:", val);
            if (mLimit.woLimit >= mLimit.factoringLimit) {
                this.masterLimitForm.controls['totalLimit'].setValue(mLimit.woLimit);

            }
            if (mLimit.woLimit < mLimit.factoringLimit) {
                this.masterLimitForm.controls['totalLimit'].setValue(mLimit.factoringLimit);

            }
        }

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    //validation
    validateform() {
        if (this.masterLimitForm.invalid) {
            return true;
        } else {
            return false;
        }
    }
    /**
           * @author: Madhu
           * @argument:none
           * @description:Save MasterLimit
           */
    saveMasterLimit() {
        let mLimit = this.getMLObject();
        mLimit.status = statusCode.Draft;

        this.sendPoToServer(mLimit);

    }
    /**
           * @author: Madhu
           * @argument:none
           * @description:Add MasterLimit
           */
    addMasterLimit() {

        let mLimit = this.getMLObject();
        if (this.pageType === 'new' || this.pageType === 'draft') {
            mLimit.status = statusCode.New;
        }
        this.sendPoToServer(mLimit);
    }
    //function to get value from form
    getMLObject() {
        let compositeData = this.masterLimitForm.getRawValue();

        let mLimit = new masterLimit(compositeData);
        console.log("data of masterLimit", JSON.stringify(mLimit))

        return mLimit;
    }

    /**
           * @author: Madhu
           * @argument:none
           * @description:For Navigation
           */
    sendPoToServer(mLimit: masterLimit) {

        if (mLimit.factoringAccNo) {
            mLimit.factoringAccNo = parseInt("" + mLimit.factoringAccNo);
        }
        if (mLimit.woAccNo) {
            mLimit.woAccNo = parseInt("" + mLimit.woAccNo);
        }
        if (mLimit.woLimit) {
            mLimit.woLimit = parseInt("" + mLimit.woLimit);
        } if (mLimit.factoringLimit) {
            mLimit.factoringLimit = parseInt("" + mLimit.factoringLimit);
        }
        if (mLimit.totalLimit) {
            mLimit.totalLimit = parseInt("" + mLimit.totalLimit);
        }

        if (mLimit.id && mLimit.id !== "") {
            this._masterService.updateMasterLimit(mLimit).then(() => {
                this.router.navigateByUrl('/compositeLimit');
            });

        } else {
            this._masterService.addMasterLimit(mLimit).then(() => {
                this.router.navigateByUrl('/compositeLimit');
            });
        }


    }

}
