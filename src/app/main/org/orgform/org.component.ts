import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { fuseAnimations } from '@fuse/animations';
import {
    Org, AddressDtls, entityTypeInt, businessNature, addressTypeInt, division,
    registrationType, issuingCountries, issuingOffices, CompanyDtls, ShareholderDtls, BankDtls
} from './org.model';
import { OrgService } from "../org.service";
import { ChildListComponent } from '@custom/components/childlist/childlist.component';
import { Router, ActivatedRoute } from '@angular/router';
/*** 
replace later on with actual service 
*/

import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';



import { ChildItem } from '@custom/components/childlist/child-item';

import { AddressComponent } from './address/address.component';
import { CompanyComponent } from "./company/company.component";
import { ShareholderComponent } from "./shareholder/shareholder.component";
import { BankComponent } from "./bank/bank.component";
import { config, statusCode } from 'config';



@Component({
    selector: 'organisation',
    templateUrl: './org.component.html',
    styleUrls: ['./org.component.scss'],
    animations: fuseAnimations
})
export class OrgComponent implements OnInit {



    @ViewChild("addresslisttable")
    addresslisttable: ChildListComponent

    @ViewChild("companylisttable")
    companylisttable: ChildListComponent

    @ViewChild("shareholderlisttable")
    shareholderlisttable: ChildListComponent

    @ViewChild("banklisttable")
    banklisttable: ChildListComponent

    actButtons: ActionButton[] = [{
        btnName: "delete",
        btnIcon: "active-icon",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.DELETE,
        url: "delete"
    }]
    addressColumns: ColumnConfig[] = [
        // {
        //     colDef: 'id',
        //     colName: 'Id',
        //     colValue: 'id',
        //     toDisplay: false

        // },
        {
            colDef: 'addressTypeName',
            colName: 'Address Type',
            colValue: 'addressTypeName',
            toDisplay: true

        },

        {
            colDef: 'addressLine1',
            colName: 'Address Line 1',
            colValue: 'addressLine1',
            toDisplay: true

        },
        {
            colDef: 'divisionName',
            colName: 'Division',
            colValue: 'divisionName',
            toDisplay: true,

        },
        {
            colDef: 'districtName',
            colName: 'District',
            colValue: 'districtName',
            toDisplay: true,
        },
        {
            colDef: 'thanaName',
            colName: 'Thana',
            colValue: 'thanaName',
            toDisplay: true,
            totalColoumnHeader: 'Grand Total'
        },
        // {
        //     colDef: 'actions',
        //     colName: 'Actions',
        //     colValue: 'qty',
        //     toDisplay: true,
        //     isRowButtons: true,
        //     actionButtons: this.actButtons
        // }
    ];

    companyColumns: ColumnConfig[] = [
        // {
        //     colDef: 'id',
        //     colName: 'Id',
        //     colValue: 'id',
        //     toDisplay: false

        // },
        {
            colDef: 'registrationTypeName',
            colName: 'Registration type',
            colValue: 'registrationTypeName',
            toDisplay: false
        },
        {
            colDef: 'regDate',
            colName: 'Registration Date',
            colValue: 'regDate',
            toDisplay: false,
            colType: 'date'
        },
        {
            colDef: 'issuingCountryName',
            colName: 'Country',
            colValue: 'issuingCountryName',
            toDisplay: false
        },
        {
            colDef: 'issuingOfficeName',
            colName: 'Office',
            colValue: 'issuingOfficeName',
            toDisplay: false
        }];


    shareholderColumns: ColumnConfig[] = [
        {
            colDef: 'shName',
            colName: 'Name',
            colValue: 'shName',
            toDisplay: true
        },
        {
            colDef: 'roleName',
            colName: 'Role',
            colValue: 'roleName',
            toDisplay: true
        },
        {
            colDef: 'perShare',
            colName: 'Shares (in %)',
            colValue: 'perShare',
            toDisplay: true
        },
        {
            colDef: 'issuingCountryName',
            colName: 'Country',
            colValue: 'issuingCountryName',
            toDisplay: true
        }];

    bankColumns: ColumnConfig[] = [
        {
            colDef: 'accountTitle',
            colName: 'Account Title',
            colValue: 'accountTitle',
            toDisplay: true
        },
        {
            colDef: 'accountNumber',
            colName: 'Account Number',
            colValue: 'accountNumber',
            toDisplay: true
        },
        {
            colDef: 'bankName',
            colName: 'Bank Name',
            colValue: 'bankName',
            toDisplay: true
        },
        {
            colDef: 'bankBranchName',
            colName: 'Bank Branch',
            colValue: 'bankBranchName',
            toDisplay: true
        }];

    childAddressTableConfig: TableConfig = {
        expectedColoumns: this.addressColumns,
        addNewClickUrl: '/purchaseordersproducts',
        rowClickUrl: 'products/',
        addNewClickName: 'Add New Address',
        topHeadName: 'Address',
        isTopHeadRequired: false
    }

    childCompanyTableConfig: TableConfig = {
        expectedColoumns: this.companyColumns,
        // addNewClickUrl: '/purchaseordersproducts',
        // rowClickUrl: 'products/',
        addNewClickName: 'Add New Company',
        topHeadName: 'Company',
        isTopHeadRequired: false
    }

    childShareholderTableConfig: TableConfig = {
        expectedColoumns: this.shareholderColumns,
        // addNewClickUrl: '/purchaseordersproducts',
        // rowClickUrl: 'products/',
        addNewClickName: 'Add New Shareholder',
        topHeadName: 'Shareholders',
        isTopHeadRequired: false
    }

    childBankTableConfig: TableConfig = {
        expectedColoumns: this.bankColumns,
        // addNewClickUrl: '/purchaseordersproducts',
        // rowClickUrl: 'products/',
        addNewClickName: 'Add New Bank',
        topHeadName: 'Banks',
        isTopHeadRequired: false
    }


    organisation: Org;
    ORGForm: FormGroup;
    entityType: FormControl;
    orgName: FormControl;
    natureOfBusiness: FormControl;
    contactName: FormControl;
    designation: FormControl;
    mobile: FormControl;
    phone: FormControl;
    email: FormControl;
    AddressDtls: FormArray;
    addressType: FormControl;
    addrsLine1: FormControl;
    addrsLine2: FormControl;
    division: FormControl;
    district: FormControl;
    thana: FormControl;

    shareholderDtls: FormArray;
    companyDtls: FormArray;
    bankDtls: FormArray;
    shName: FormControl;
    shRole: FormControl;
    shPercent: FormControl;
    idDocType: FormControl;
    shDocumentNo: FormControl;
    shIssuingCountry: FormControl;
    shHasValidity: FormControl;
    shExpiryDate: FormControl;
    regType: FormControl;
    regNumber: FormControl;
    issuingOffice: FormControl;
    accountTitle: FormControl;
    accountNumber: FormControl;
    bankName: FormControl;
    bankBranch: FormControl;

    addressItem: ChildItem = new ChildItem(AddressComponent, false);
    companyItem: ChildItem = new ChildItem(CompanyComponent, false);
    shareholderItem: ChildItem = new ChildItem(ShareholderComponent, false);
    bankItem: ChildItem = new ChildItem(BankComponent, false);
    address: AddressDtls[] = [];
    company: CompanyDtls[] = [];
    bank: BankDtls[] = [];
    shareholder: ShareholderDtls[] = [];

    pageType: string;

    entitiesTypes: entityTypeInt[] = [];


    businessNatures: businessNature[] = [];

    typeofAdd: addressTypeInt[] = [];

    divisions: division[] = [];

    typeofReg: registrationType[] = [];

    countries: issuingCountries[] = [];

    offices: issuingOffices[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        // private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _orgService: OrgService,
        private http: Http,
        private _router: Router,
    ) {
        this.organisation = new Org();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {

        // Subscribe to update product on changes

        this.organisation = new Org();
        this.ORGForm = this.createControl(this.organisation);
        this.addSubscribers();


        this._orgService.onDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(orgData => {

                if (orgData) {

                    this.organisation = new Org(orgData);
                    this.address = this.organisation.address;
                    this.company = this.organisation.company;
                    this.shareholder = this.organisation.shareholder;
                    this.bank = this.organisation.banks;
                    if(this.organisation.status===statusCode.Draft){
                        this.pageType = 'draft';
                    }else{
                        this.pageType = 'edit';
                    }
                }
                else {

                    this.pageType = 'new';

                }

                this.updateValues(this.organisation);

                // this.createControl(this.organisation);
            });

        this._orgService.getMiscOrgData().then((data) => {

            this.entitiesTypes = data.entityType;
            this.businessNatures = data.natureofBusiness;
            this.typeofAdd = data.addressType;
            this.divisions = data.division;
            this.typeofReg = data.registrationType;
            this.countries = data.country;
            this.offices = data.issuingOffice;
            console.log(this.entitiesTypes);
        });

    }

    addSubscribers() {

        this.ORGForm.controls['entityTypeId'].valueChanges.subscribe((selectedValue) => {
            if (this.entitiesTypes) {
                const orgIndx = this.entitiesTypes.findIndex(record => record.id === selectedValue);
                let entityType = this.entitiesTypes[orgIndx];
                if (entityType) {
                    this.updateValues({ 'entityTypeName': entityType.name })
                }
            }
        });

        this.ORGForm.controls['natureOfBusinessId'].valueChanges.subscribe((selectedValue) => {
            if (this.businessNatures) {
                const orgIndx = this.businessNatures.findIndex(record => record.id === selectedValue);
                let natureofBuss = this.businessNatures[orgIndx];
                if (natureofBuss) {
                    this.updateValues({ 'natureOfBusinessName': natureofBuss.name })
                }
            }
        });
    }

    updateValues(obj: any) {

        this.ORGForm.patchValue(obj);
    }

    createControl(organisation?: Org): FormGroup {
        // console.log(organisation);
        this.ORGForm = this._formBuilder.group({
            id: [organisation.id],
            entityTypeName: [organisation.entityTypeName],
            entityTypeId: [organisation.entityTypeId, Validators.required],
            orgName: [organisation.orgName, Validators.required],
            natureOfBusinessId: [organisation.natureOfBusinessId, Validators.required],
            natureOfBusinessName: [organisation.natureOfBusinessName, Validators.required],
            contactName: [organisation.contactName, Validators.required],
            designation: [organisation.designation, Validators.required],
            mobile: [organisation.mobile, Validators.required],
            phone: [organisation.phone, Validators.required],
            email: [organisation.email, Validators.required],
            status: [organisation.status]
        });
        return this.ORGForm;
    }
    // get adresses() {
    //     return this.ORGForm.get('AddressDtls') as FormArray;
    // }

    get companies() {
        return this.ORGForm.get('companyDtls') as FormArray;
    }

    get shareHolders() {
        return this.ORGForm.get('shareholderDtls') as FormArray;
    }

    get banks() {
        return this.ORGForm.get('bankDtls') as FormArray;
    }

    validateOrgForm() {
        // return false;
        if (this.address.length && this.company.length && this.shareholder.length && this.bank.length) {
            return false;
        }
        else {
            return true;
        }

    }


    /**
     * Add Organization
     */
    addOrgDetails(): void {

        let orgFormValues = this.getOrgObject();

        if (this.pageType === 'new' || this.pageType === 'draft') {
            orgFormValues.status = 'New';
        }
        this.sendOrgToServer(orgFormValues);

    }



    // addOrgDetails() {
    //     let formValues = this.ORGForm.getRawValue();
    //     let orgFormValues = new Org(formValues);
    //     let url = "http://localhost:10011/org"
    //     orgFormValues.address = this.address;
    //     orgFormValues.company = this.company;
    //     orgFormValues.shareholder = this.shareholder;
    //     orgFormValues.banks = this.bank;
    //     orgFormValues.status = "New";
    //     this.http.post(url, orgFormValues)
    //         .map(
    //             (response) => response.json()
    //         )
    //         .catch((err) => {
    //             console.log("Failed  => ", err);
    //             // this.notification.Info(err['_body']);
    //             return Observable.throw(err)
    //         })
    //         .subscribe((res: Response) => {
    //             console.log("successfull => => ", res);
    //         })
    // }

    saveOrgAsDraft() {
        let formValues = this.ORGForm.getRawValue();
        let orgFormValues = new Org(formValues);
        let url = config.url + ":" + config.port + "/org" //"http://localhost:10011/org"
        orgFormValues.address = this.address;
        orgFormValues.company = this.company;
        orgFormValues.shareholder = this.shareholder;
        orgFormValues.banks = this.bank;
        orgFormValues.status = statusCode.Draft;

        this.sendOrgToServer(orgFormValues);

        // var data = {"id":"","entityTypeId":4,"entityTypeName":"Public-Unlisted","orgName":"foundation301","natureOfBusiness":"FI","contactName":"Gokul","designation":"gokul","mobile":"09930187167","phone":"9930187167","email":"user@example.com","address":[{"id":"z5vVG","addressType":"Permanent","addressLine1":"ewqrewrfe","addressLine2":"frredgfrfg","division":"Rajshahi","district":"Khulna","thana":"Rajshahi"}],"company":[{"id":"wHY5Q","registrationType":"RJSC Registration","regNumber":"ABCD","regDate":"2018-11-01T07:32:01.603Z","issuingCountry":"England","issuingOffice":"London","hasValidity":true,"expiryDate":"2018-11-01T07:32:01.603Z"}],"shareholder":[{"shName":"sdfdfgfd","role":"Partner","perShare":"12","idDocType":"Birth registration","shDocumentNo":"3243545","issuingCountry":"America","shHasValidity":false,"shExpiryDate":"2018-11-01T07:32:01.603Z","id":"4DPan"}],"banks":[{"accountTitle":"pencil","accountNumber":"09930187167","bankName":"HDFC","bankBranch":"Dhaka","id":"BCxrK"}],"status":"New"};
        // console.log("values in form:", JSON.stringify(orgFormValues));
        // this.http.put(url, orgFormValues)
        //     .map(
        //         (response) => response.json()
        //     )
        //     .catch((err) => {
        //         console.log("Failed  => ", err);
        //         // this.notification.Info(err['_body']);
        //         return Observable.throw(err)
        //     })
        //     .subscribe((res: Response) => {
        //         console.log("successfull => => ", res);
        //     })
    }

    approveOrgDetails() {
        let formValues = this.ORGForm.getRawValue();
        let orgFormValues = new Org(formValues);
        let url = "http://localhost:10011/org"
        orgFormValues.address = this.address;
        orgFormValues.company = this.company;
        orgFormValues.shareholder = this.shareholder;
        orgFormValues.banks = this.bank;
        orgFormValues.status = "Approved";
        // var data = {"id":"","entityTypeId":4,"entityTypeName":"Public-Unlisted","orgName":"foundation301","natureOfBusiness":"FI","contactName":"Gokul","designation":"gokul","mobile":"09930187167","phone":"9930187167","email":"user@example.com","address":[{"id":"z5vVG","addressType":"Permanent","addressLine1":"ewqrewrfe","addressLine2":"frredgfrfg","division":"Rajshahi","district":"Khulna","thana":"Rajshahi"}],"company":[{"id":"wHY5Q","registrationType":"RJSC Registration","regNumber":"ABCD","regDate":"2018-11-01T07:32:01.603Z","issuingCountry":"England","issuingOffice":"London","hasValidity":true,"expiryDate":"2018-11-01T07:32:01.603Z"}],"shareholder":[{"shName":"sdfdfgfd","role":"Partner","perShare":"12","idDocType":"Birth registration","shDocumentNo":"3243545","issuingCountry":"America","shHasValidity":false,"shExpiryDate":"2018-11-01T07:32:01.603Z","id":"4DPan"}],"banks":[{"accountTitle":"pencil","accountNumber":"09930187167","bankName":"HDFC","bankBranch":"Dhaka","id":"BCxrK"}],"status":"New"};
        console.log("values in form:", JSON.stringify(orgFormValues));
        this.http.post(url, orgFormValues)
            .map(
                (response) => response.json()
            )
            .catch((err) => {
                console.log("Failed  => ", err);
                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                console.log("successfull => => ", res);
            })
    }

    rejectOrgDetails() {
        let formValues = this.ORGForm.getRawValue();
        let orgFormValues = new Org(formValues);
        let url = "http://localhost:10011/org"
        orgFormValues.address = this.address;
        orgFormValues.company = this.company;
        orgFormValues.shareholder = this.shareholder;
        orgFormValues.banks = this.bank;
        orgFormValues.status = "Reject";
        // var data = {"id":"","entityTypeId":4,"entityTypeName":"Public-Unlisted","orgName":"foundation301","natureOfBusiness":"FI","contactName":"Gokul","designation":"gokul","mobile":"09930187167","phone":"9930187167","email":"user@example.com","address":[{"id":"z5vVG","addressType":"Permanent","addressLine1":"ewqrewrfe","addressLine2":"frredgfrfg","division":"Rajshahi","district":"Khulna","thana":"Rajshahi"}],"company":[{"id":"wHY5Q","registrationType":"RJSC Registration","regNumber":"ABCD","regDate":"2018-11-01T07:32:01.603Z","issuingCountry":"England","issuingOffice":"London","hasValidity":true,"expiryDate":"2018-11-01T07:32:01.603Z"}],"shareholder":[{"shName":"sdfdfgfd","role":"Partner","perShare":"12","idDocType":"Birth registration","shDocumentNo":"3243545","issuingCountry":"America","shHasValidity":false,"shExpiryDate":"2018-11-01T07:32:01.603Z","id":"4DPan"}],"banks":[{"accountTitle":"pencil","accountNumber":"09930187167","bankName":"HDFC","bankBranch":"Dhaka","id":"BCxrK"}],"status":"New"};
        console.log("values in form:", JSON.stringify(orgFormValues));
        this.http.post(url, orgFormValues)
            .map(
                (response) => response.json()
            )
            .catch((err) => {
                console.log("Failed  => ", err);
                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                console.log("successfull => => ", res);
            })
    }

    // add() {
    //     this.adresses.push(this.createAddrsForms(this.organisation.AddressDtls));
    // }

    // removeAddress(i: number) {
    //     const control = <FormArray>this.ORGForm.controls['AddressDtls'];
    //     control.removeAt(i);
    // }

    sendOrgToServer(orgFormValues: Org) {
        if (orgFormValues.id && orgFormValues.id !== "") {
            console.log("update")
            console.log("values:",JSON.stringify(orgFormValues));
            this._orgService.updateOrganization(orgFormValues).then(() => {
                this._router.navigateByUrl('/org');
            });

        } else {
            console.log("add")
            this._orgService.addOrganization(orgFormValues).then(() => {
                this._router.navigateByUrl('/org');
            });
        }
    }

    getOrgObject() {
        let orgFormValues = this.ORGForm.getRawValue();
        let org = new Org(orgFormValues);
        for (let x in this.company) {
            console.log(x);
            if (!this.company[x].hasValidity) {
                delete this.company[x].expiryDate;
            }
        }
        for (let x in this.shareholder) {
            console.log(x);
            if (!this.shareholder[x].shHasValidity) {
                delete this.shareholder[x].shExpiryDate;
            }
        }
        org.address = this.address;
        org.company = this.company;
        org.shareholder = this.shareholder;
        org.banks = this.bank;
        return org;
    }


    removeCompany(i: number) {
        const control = <FormArray>this.ORGForm.controls['companyDtls'];
        control.removeAt(i);
    }

    removeShareholder(i: number) {
        const control = <FormArray>this.ORGForm.controls['shareholderDtls'];
        control.removeAt(i);
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
