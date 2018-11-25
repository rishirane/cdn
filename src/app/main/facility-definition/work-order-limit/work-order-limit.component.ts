import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';
import { FacilityDefinitionService} from '../../facility-definition/facility-definition.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { Http, Response } from '@angular/http';
import { FactorLimit, termPeriodInt, } from './work-order-limit.model';
import { AddressDtls, Org } from '../../org/orgform/org.model';
import { config, MODE, ORGTYPE} from 'config';

@Component({
    selector: 'app-work-order-limit',
    templateUrl: './work-order-limit.component.html',
    styleUrls: ['./work-order-limit.component.scss'],
    animations: fuseAnimations
})
export class WorkOrderLimitComponent implements OnInit {

    @Input()
    set data(value) {
        this._changableData.next(value);
    }
    get data() {
        return this._changableData.getValue();
    }

    message: string;
    productPageType: boolean = true;
    pageType: string = 'new';
    limit: FactorLimit;
    loanAccNo;
    dontshow: boolean = true;
    termPeriods: termPeriodInt[] = [];
    public id;
    woLimitForm: FormGroup
    public _changableData = new BehaviorSubject<any>(null);
    url = config.url;
    port = config.port;
    facilityDetails;
    mailingAddress: AddressDtls;
    addresses: AddressDtls[];
    snames: Org[] = [];
    snamesBehaviour: BehaviorSubject<any>;
    WODetails;
    isReadOnly: boolean = false;
    mode: string;
    @Output() valueChange:EventEmitter<any> = new EventEmitter<any>();
    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(private _formBuilder: FormBuilder, private http: Http, private _woFaclityService: FacilityDefinitionService) {
        this._unsubscribeAll = new Subject();
        this.snamesBehaviour = new BehaviorSubject({});

    }

    ngOnInit() {
        this.mode = MODE.view; 
        this.isReadOnly = true;
        this._woFaclityService.currentMessage.subscribe(message => this.message = message);
        this.woLimitForm = this.createForms(new FactorLimit());

        // Subscribe to update product on changes
        this._changableData.subscribe(tableData => {
            let factorData;
            if (tableData === false) {
                this.productPageType = false;
                return;
            }
            if (tableData) {
                factorData = new FactorLimit(tableData);
                this.pageType = 'edit';
            }
            else {
                this.pageType = 'new';
            }
            this.productPageType = true;
            this.updateValues(factorData);

        });
        this._woFaclityService.getTermPeriod().then((data) => {

            this.termPeriods = data;
        });

  
       
        this._woFaclityService.getSuppliers().then(snames => {
            this.snamesBehaviour.next(snames);
        });

        this._woFaclityService.getMiscOrgData().then((data) => {

            this.termPeriods = data.termPeriod;
            console.log(this.termPeriods);
        });
        this.addSubscribers();
        this.onSearchChange();
        this.termPeriodSubscribers();
        
        // this.getWODetails();


        this.woLimitForm.controls['gracePeriod'].valueChanges.subscribe(value => {
            console.log(value);
            this.valueChange.emit({"formshow":false})
        });
    
    

    }

     /**
     * @author: Madhu
     * @argument:none
     * @description:Add Subscribers
     */
    addSubscribers() {
        this.woLimitForm.controls['supplierId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {

                this.snames.filter(element => {
                    if (element.id == selectedValue) {

                        const orgIndx = this.snames.findIndex(record => record.id === selectedValue);

                        let orgnizations = this.snames[orgIndx];
                        // if(this.factorFlag == true){
                        // this._woFaclityService.WOLimitFacilityDetails(element.id).then((data) => {
                        //     this.updateValues({ 'supplierAddress': data[0].supplierAddress,'creditLimit': data[0].creditLimit,'effectiveDate': data[0].effectiveDate,'term':data[0].term,'termPeriod':data[0].termPeriod,'supplierName':data[0].supplierName,'expiryDate':data[0].expiryDate,'advPayment':data[0].advPayment,'interestRate':data[0].interestRate,
                        // 'penaltyCharge':data[0].penaltyCharge,'serviceCharge':data[0].serviceCharge,'creditPeriod':data[0].creditPeriod,'gracePeriod':data[0].gracePeriod,'branchId':data[0].branchId,'loanAccNo':data[0].loanAccNo })
                        // });
                        // }
                        
                        if (orgnizations) {
                            this.updateValues({ 'supplierName': orgnizations.orgName })
                        }

                        console.log(element);
                        this.addresses = element.address

                        this.selectMailingAddress();
                        if (this.mailingAddress) {
                            this.updateValues({ "supplierAddress": this.createAddress(this.mailingAddress) });
                        }

                    }
                });
            }
            )

        this.snamesBehaviour.subscribe(snames => {
            for (let j in snames) {
                this.snames.push(new Org(snames[j]));
            }
            this.woLimitForm.controls['supplierId'].updateValueAndValidity();
        });

    }

    termPeriodSubscribers(){
            this.woLimitForm.controls['termPeriodId'].valueChanges.subscribe((selectedValue) => {
                if (this.termPeriods) {
                    const orgIndx = this.termPeriods.findIndex(record => record.id === selectedValue);
                    let termPeriod = this.termPeriods[orgIndx];
                    if (termPeriod) {
                        this.updateValues({ 'termPeriodName': termPeriod.name})
                    
                    }
                }
            });
        
    }
    createAddress(selectedAddress): string {
        return selectedAddress.addressLine1 + ", " + selectedAddress.addressLine2 + ", " + selectedAddress.district + ", " + selectedAddress.division + ", " + selectedAddress.thana
    }

    selectMailingAddress() {
        for (let i in this.addresses) {
            if (this.addresses[i]) {
                this.mailingAddress = this.addresses[i];
            }
        }
    }
    /**
     * @author: Madhu
     * @argument:term,effective date
     * @description:set effective date
     */
    onSearchChange() {
        this.woLimitForm.controls['effectiveDate'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((selectedValue) => {
            console.log("date is",selectedValue);
            let facilityData = this.woLimitForm.getRawValue();
        let WOFDLimit = new FactorLimit(facilityData);
        if (WOFDLimit.term) {
            WOFDLimit.term = parseInt("" + WOFDLimit.term);
        }
        console.log("term value is",WOFDLimit.term )
        var days =  parseInt("" + WOFDLimit.term)
        // console.log("term value is",  days);
        if (WOFDLimit.effectiveDate) {
            WOFDLimit.effectiveDate =  new Date("" + WOFDLimit.effectiveDate);
        }
        console.log("date", WOFDLimit.effectiveDate);
        var date = new Date("" + WOFDLimit.effectiveDate)
        
        var addDate = new Date();
          addDate.setDate(date.getDate() + days);
          console.log(addDate);
          let expiryDate = new Date(addDate).toISOString().split('T')[0];
          this.woLimitForm.controls['expiryDate'].setValue(expiryDate)
        })
        
        
    
    }


    /**
       * @author: Madhu
       * @argument:none
       * @description:Form Validation
       */
    createForms(foLimit?: FactorLimit): FormGroup {
        this.woLimitForm = this._formBuilder.group({
            supplierAddress: [foLimit.supplierAddress, Validators.required],
            creditLimit: [foLimit.creditLimit, Validators.required],
            effectiveDate: [foLimit.effectiveDate, Validators.required],
            term: [foLimit.term, Validators.required],
            termPeriodName: [foLimit.termPeriodName],
            termPeriodId: [foLimit.termPeriodId, Validators.required],
            expiryDate: [foLimit.expiryDate, Validators.required],
            advPayment: [foLimit.advPayment, Validators.required],
            interestRate: [foLimit.interestRate, Validators.required],
            penaltyCharge: [foLimit.penaltyCharge, Validators.required],
            serviceCharge: [foLimit.serviceCharge, Validators.required],
            creditPeriod: [foLimit.creditPeriod, Validators.required],
            gracePeriod: [foLimit.gracePeriod, Validators.required],
            branchId: [foLimit.branchId, Validators.required],
            loanAccNo: [foLimit.loanAccNo, Validators.required],
            supplierId: [foLimit.supplierId, Validators.required],
            supplierName: [foLimit.supplierName],
            id: [foLimit.id],
            status: [foLimit.status]
        });
        return this.woLimitForm;
    }

    updateValues(obj: any) {
        this.woLimitForm.patchValue(obj);
    }


    setData(data) {
        this._changableData.next(data);
    }
    public getValue() {
        return this.woLimitForm.getRawValue();
    }

    public isValidForm() {
        return this.woLimitForm && this.woLimitForm.valid;
    }





}

