import { Component, OnDestroy, OnInit, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router } from '@angular/router';
import { OrgService } from '../../org.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';

import { Org, AddressDtls, addressTypeInt, division, district, thana } from '../org.model';
// import { thana } from '../../../fund-req-factoring/fundReq.model';

@Component({
    selector: 'address-form',
    templateUrl: './address.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AddressComponent implements OnInit, OnDestroy, ChildItemComponent {


    @Input() data: any;

    productPageType: boolean = true;

    pageType: string;
    AddressForm: FormGroup;

    public _changableData = new BehaviorSubject<any>([]);


    currentqty: number;
    currentUnitPrice: number;

    typeOfAddrs: addressTypeInt[] = [];
    divisions: division[] = [];
    districts: district[] = [];
    thanas: thana[] = [];

    typeOfAddrsRegBehaviour: BehaviorSubject<any>;
    divisionsBehaviour: BehaviorSubject<any>;
    districtsBehaviour: BehaviorSubject<any>;
    thanasBehaviour: BehaviorSubject<any>;


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
        private _formBuilder: FormBuilder,
        private router: Router,
        private _orgservice: OrgService
    ) {
        this._unsubscribeAll = new Subject();
        this._changableData = new BehaviorSubject<any>(this.data);
        this.typeOfAddrsRegBehaviour = new BehaviorSubject({});
        this.divisionsBehaviour = new BehaviorSubject({});
        this.districtsBehaviour = new BehaviorSubject({});
        this.thanasBehaviour = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    ngOnInit(): void {

        this.data = new AddressDtls();
        this.AddressForm = this.createForms(this.data);

        this.addSubscribers();

        this._orgservice.getMiscOrgData().then((data) => {
            this.typeOfAddrsRegBehaviour.next(data.addressType);
        })

        this._orgservice.getMiscOrgData().then((data) => {
            this.divisionsBehaviour.next(data.division);
        })

        this._orgservice.getMiscOrgData().then((data) => {
            this.districtsBehaviour.next(data.district);
        })

        this._orgservice.getMiscOrgData().then((data) => {
            this.thanasBehaviour.next(data.thana);
        })

        this._changableData
            .subscribe(product => {
                if (product === false) {
                    this.productPageType = false;
                    return;
                }
                if (product) {
                    this.data = new AddressDtls(product);
                    this.pageType = 'edit';
                }
                else {
                    this.pageType = 'new';
                }
                this.productPageType = true;
                this.updateValues(this.data);
                // this.addSubscribers();

            });

        // this._orgservice.getMiscOrgData().then((data) => {
        //     this.divisions = data.division;
        // })

        // this._orgservice.getdivision().then((data) => {
        //     this.districts = data;
        // })

    }


    addSubscribers() {

        this.AddressForm.controls['addressTypeId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {


                this.typeOfAddrs.filter(element => {
                    if (element.id == selectedValue) {

                        const orgIndx = this.typeOfAddrs.findIndex(record => record.id === selectedValue);

                        let orgnizations = this.typeOfAddrs[orgIndx];
                        if (orgnizations) {
                            this.updateValues({ 'addressTypeName': orgnizations.name })
                        }

                        // this.addresses=element.address

                        // this.selectMailingAddress();
                        // if(this.mailingAddress){
                        //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
                        // }

                        // if(this.pageType==='edit'){
                        //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
                        // }

                    }
                });
            }
            )


        this.AddressForm.controls['divisionId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {


                this.divisions.filter(element => {
                    if (element.id == selectedValue) {

                        const orgIndx = this.divisions.findIndex(record => record.id === selectedValue);

                        let orgnizations = this.divisions[orgIndx];
                        if (orgnizations) {
                            this.updateValues({ 'divisionName': orgnizations.name })
                        }

                        // this.addresses=element.address

                        // this.selectMailingAddress();
                        // if(this.mailingAddress){
                        //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
                        // }

                        // if(this.pageType==='edit'){
                        //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
                        // }

                    }
                });
            }
            )


        this.AddressForm.controls['districtId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {


                this.districts.filter(element => {
                    if (element.id == selectedValue) {

                        const orgIndx = this.districts.findIndex(record => record.id === selectedValue);

                        let orgnizations = this.districts[orgIndx];
                        if (orgnizations) {
                            this.updateValues({ 'districtName': orgnizations.name })
                        }

                        // this.addresses=element.address

                        // this.selectMailingAddress();
                        // if(this.mailingAddress){
                        //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
                        // }

                        // if(this.pageType==='edit'){
                        //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
                        // }

                    }
                });
            }
            )


        this.AddressForm.controls['thanaId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {


                this.thanas.filter(element => {
                    if (element.id == selectedValue) {

                        const orgIndx = this.thanas.findIndex(record => record.id === selectedValue);

                        let orgnizations = this.thanas[orgIndx];
                        if (orgnizations) {
                            this.updateValues({ 'thanaName': orgnizations.name })
                        }

                        // this.addresses=element.address

                        // this.selectMailingAddress();
                        // if(this.mailingAddress){
                        //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
                        // }

                        // if(this.pageType==='edit'){
                        //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
                        // }

                    }
                });
            }
            )

        this.typeOfAddrsRegBehaviour.subscribe(bnames => {
            for (let j in bnames) {
                this.typeOfAddrs.push(new addressTypeInt(bnames[j]));
            }
            this.AddressForm.controls['addressTypeId'].updateValueAndValidity();
        });

        this.divisionsBehaviour.subscribe(bnames => {
            for (let j in bnames) {
                this.divisions.push(new division(bnames[j]));
            }
            this.AddressForm.controls['divisionId'].updateValueAndValidity();
        });

        this.districtsBehaviour.subscribe(bnames => {
            for (let j in bnames) {
                this.districts.push(new district(bnames[j]));
            }
            this.AddressForm.controls['districtId'].updateValueAndValidity();
        });

        this.thanasBehaviour.subscribe(bnames => {
            for (let j in bnames) {
                this.thanas.push(new thana(bnames[j]));
            }
            this.AddressForm.controls['thanaId'].updateValueAndValidity();
        });

    }


    updateValues(obj: any) {

        this.AddressForm.patchValue(obj);
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
        let dataToUpdate = this.AddressForm.value;

        this._changableData.next(dataToUpdate);

        return this.getValue();
    }
    createForms(addresdtls): FormGroup {
        return this._formBuilder.group({
            id: [addresdtls.id],
            addressTypeId: [addresdtls.addressTypeId, Validators.required],
            addressTypeName: [addresdtls.addressTypeName, Validators.required],
            addressLine1: [addresdtls.addressLine1, Validators.required],
            addressLine2: [addresdtls.addressLine2],
            divisionId: [addresdtls.divisionId, Validators.required],
            divisionName: [addresdtls.divisionName, Validators.required],
            districtId: [addresdtls.districtId, Validators.required],
            districtName: [addresdtls.districtName, Validators.required],
            thanaId: [addresdtls.thanaId, Validators.required],
            thanaName: [addresdtls.thanaName, Validators.required],
            isMailingAddress: [addresdtls.isMailingAddress]
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
        // const data = this.AddressForm.getRawValue();
        // data.handle = FuseUtils.handleize(data.name);

        // this._productService.saveProduct(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._productService.onDataChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Product saved', 'OK', {
        //             verticalPosition: 'top',
        //             duration: 2000
        //         });
        //     });
    }



    addProduct(): void {
        //this.productPageType="new"
    }
    /**
     * Add product
     */
    // addProduct(): void {
    //     const data = this.POForm.getRawValue();
    //     data.handle = FuseUtils.handleize(data.name);

    //     this._productService.addProduct(data)
    //         .then(() => {

    //             // Trigger the subscription with new data
    //             this._productService.onDataChanged.next(data);

    //             // Show the success message
    //             this._matSnackBar.open('Product added', 'OK', {
    //                 verticalPosition: 'top',
    //                 duration: 2000
    //             });

    //             // Change the location with new one
    //             //this._location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
    //         });
    // }

    submit(formrecv: any) {
        console.log(formrecv);

    }


    public CalculateTotalPrice() {
        if (this.currentqty && this.currentUnitPrice) {
            let TotalPrice = this.currentqty * this.currentUnitPrice
            this.AddressForm.controls['totalPrice'].setValue(TotalPrice);
        }
    }
}



