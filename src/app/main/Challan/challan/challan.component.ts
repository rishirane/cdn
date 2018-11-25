import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';


import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';


//import { Product } from 'app/main/demo/product/product.model';

import { Challan } from './challan.model';

// import { EcommerceProductService } from '../../demo/product/product.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { ChallanService } from '../challan.service';

import { LoginService } from '../../login/logindetails.service';

import { ChildListComponent } from '@custom/components/childlist/childlist.component';

import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';

import { ChildItem } from '@custom/components/childlist/child-item';
import { ChallanPOComponent } from './product/product.component';
import { PurchaseOrder, Product } from 'app/main/purchaseorder/poform/poform.model';


import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { AddressDtls, Org } from 'app/main/org/orgform/org.model';
import { statusCode, MODE,ORGTYPE } from 'config';

export function determineId(id: any): string {
    if (id.constructor.name === 'array' && id.length > 0) {
       return '' + id[0];
    }
    return '' + id;
}

@Component({
    selector: 'challan',
    templateUrl: './challan.component.html',
    styleUrls: ['./challan.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChallanComponent implements OnInit, OnDestroy {
    @ViewChild("productlisttable")
    productlisttable: ChildListComponent

    
    
    actButtons: ActionButton[] = [{
        btnName: "Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.DELETE,
        url: "delete"
    }]
    columns: ColumnConfig[] = [{
        colDef: 'id',
        colName: 'Id',
        colValue: 'id',
        toDisplay: false

    },
    {
        colDef: 'product',
        colName: 'Particulars',
        colValue: 'product',
        toDisplay: true

    },
    {
        colDef: 'qty',
        colName: 'Quantity',
        colValue: 'qty',
        toDisplay: true

    },
    {
        colDef: 'unitName',
        colName: 'Unit',
        colValue: 'unitName',
        toDisplay: true,
        isTotalColoumn: true,
    },
    {
        colDef: 'actions',
        colName: 'Actions',
        colValue: 'qty',
        toDisplay: true,
        isRowButtons: true,
        actionButtons: this.actButtons
    }
    ];

    childTableConfig: TableConfig = {
        expectedColoumns: this.columns,
        addNewClickUrl: '/purchaseorders/products/new',
        rowClickUrl: '/purchaseorders/products/',
        addNewClickName: 'Add New Product',
        topHeadName: 'Products',
        isTopHeadRequired: false,
        grandTotalColumnName: 'qty'
    }



    challan: Challan;
    pageType: string;
    ChallanForm: FormGroup;
    supplier: FormControl;
    challanDate: FormControl;
    challanNumber: FormControl;
    manufacturer: FormControl;
    manufacturersAddress: FormControl;
    preparedBy: FormControl;
    designation: FormControl;
    deliveryDate: FormControl;

    loginData: any;
    editFieldsReadOnly: boolean;
    ReadOnly: boolean = false;

    purchaseOrders: PurchaseOrder[]=[];
    poBehaviour : BehaviorSubject<any>;

    mnames: Org[]=[];
    snamesBehaviour : BehaviorSubject<any>;
    
    mailingAddress:AddressDtls=new AddressDtls();
    manufacturer_set: string;

    products: Product[] = [];
    productItem: ChildItem = new ChildItem(ChallanPOComponent, false);

    formshow: boolean = true;

    dataPO: any;

    noPoDetails: boolean = true;
  
    isReadOnly: boolean = false;

    mode: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    protected confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    /**
     * Constructor
     *
     * @param {ChallanService} _challanservice
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _challanservice: ChallanService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _loginService: LoginService,
        public _matDialog: MatDialog,
        private _router: Router
    ) {
        this.loginData = this._loginService.getloginDetails();
        if(this.loginData.orgType === ORGTYPE.MANUFACTURER) {
            this.mode = MODE.view; 
            this.isReadOnly = true;
        }else {
            this.mode = MODE.edit;
        }

        // Set the default
        this.challan = new Challan();

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.snamesBehaviour=new BehaviorSubject({});
        this.poBehaviour=new BehaviorSubject({});
    
    
    }




    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
       
        
        this.challan = new Challan();
       
        this.ChallanForm = this.createControl(this.challan);
        if(this.mode === MODE.edit) {
            this.addSubscribers();
        }    

        this._challanservice.getManufacturers(this.loginData.orgId).then(snames=>{
          
            this.snamesBehaviour.next(snames);
        });
        
        this._challanservice.onDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {
               
                if (product) {
                    this.challan = new Challan(product);

                    if(this.challan.poNumberId == "noPo") {
                        this.noPoDetails = false;
                        this.ChallanForm.controls['poDate'].clearValidators();
                        this.ChallanForm.controls['poDate'].updateValueAndValidity();
                        this.ChallanForm.controls['deliveryAddress'].clearValidators();
                        this.ChallanForm.controls['deliveryAddress'].updateValueAndValidity();
                            
                    }
                  
                    if(this.challan.status===statusCode.Draft){
                        this.pageType = 'draft';
                    }else{
                        this.pageType = 'edit';
                    }
                    this.products = this.challan.product;
                   
                    this.editFieldsReadOnly = true;
                   
                }
                else {
                    this.pageType = 'new';
                    this.editFieldsReadOnly = false;
                   
                    this.challan.supplier=this.loginData.orgName;
                    this.challan.supplierId=this.loginData.orgId;
                    this.challan.challanDate=this.loginData.date;
                    this.challan.preparedBy=this.loginData.username;
                    this.challan.designation=this.loginData.designation;
                }

                this.updateValues(this.challan);
            });

    }


    addSubscribers(){
        
        this.ChallanForm.controls['manufacturerId'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {

            this.mnames.filter(element => {
                if (element.id == selectedValue) {

                    const orgIndx=this.mnames.findIndex( record => record.id === selectedValue );
                    let orgnizations=this.mnames[orgIndx];
                    if(orgnizations){

                        this.selectMailingAddress(orgnizations.address);
                        this.updateValues({'manufacturer':orgnizations.orgName,'manufacturersAddress':(this.mailingAddress.addressLine1?this.mailingAddress.addressLine1:'')+" "+
                        (this.mailingAddress.addressLine2?this.mailingAddress.addressLine2:'')+" "+
                        (this.mailingAddress.districtName?this.mailingAddress.districtName:'')+" "+
                        (this.mailingAddress.divisionName?this.mailingAddress.divisionName:'')+" "+
                        (this.mailingAddress.thanaName?this.mailingAddress.thanaName:'')})
                    }


                    this._challanservice.getPurchaseOrders(orgnizations.id).then((response) => {
                        this.poBehaviour.next(response);
                    });
                }
            });
        });


        this.ChallanForm.controls['poNumberId'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {

            // if(this.products.length>0){
            //     this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            //         disableClose: false
            //     });
            //     this.confirmDialogRef.componentInstance.confirmMessage = 'Changing purchase order will remove selected products';
            // }

            if(selectedValue==='noPo'){
                
                this.noPoDetails = false;       
                this.updateValues({"poNumber": "noPO","poDate": "" , "deliveryAddress" : ""});
                this.ChallanForm.controls['poDate'].clearValidators();
                this.ChallanForm.controls['poDate'].updateValueAndValidity();
                this.ChallanForm.controls['deliveryAddress'].clearValidators();
                this.ChallanForm.controls['deliveryAddress'].updateValueAndValidity();

            }else{
                this.noPoDetails = true;   
                this.purchaseOrders.filter(element => {
                    if (element.id == selectedValue) {
                           
                            const orgIndx=this.purchaseOrders.findIndex( record => record.id === selectedValue );
                            let podata=this.purchaseOrders[orgIndx];
                            if(podata){
                                this.updateValues({'poNumber':podata.poNumber, 'poDate':podata.issueDate,'deliveryAddress':podata.delivryAddrs})
                            }
    
                    }
                });
            }
            
        });
        


        this.snamesBehaviour.subscribe(snames=>{
            for(let j in snames){
                this.mnames.push(new Org(snames[j]));
            }
           
            this.ChallanForm.controls['manufacturerId'].updateValueAndValidity();
        });

        this.poBehaviour.subscribe(snames=>{
            for(let j in snames){
                this.purchaseOrders.push(new PurchaseOrder(snames[j]));
            }
            this.ChallanForm.controls['poNumberId'].updateValueAndValidity();
        });
    }

    selectMailingAddress(addresses){

        for(let i in addresses){
            // if(addresses[i] && addresses[i].isMailingAddress===true){
            if(addresses[i]){
                this.mailingAddress= addresses[i];
            }
        }
    }

    handleValueChange(changedProducts) {

        if (changedProducts.data) {
          
            for (let x in changedProducts.data) {
                changedProducts.data[x].qty = parseInt(changedProducts.data[x].qty)
            }
            this.products = changedProducts.data;
         
            let orgArr = [];
            for (let x in this.products) {
             
                orgArr.push(new Product(this.products[x]));
            }

            this.products = orgArr;
        }
      
        this.formshow = changedProducts.formshow;

    }

    compareIds(id1: any, id2: any): boolean {
        const a1 = determineId(id1);
        const a2 = determineId(id2);
        return a1 === a2;
    }

    validateForm() {
        if (this.ChallanForm.invalid || this.products.length<=0)  {
            return true;
        } else {
            return false;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createControl(challan?: Challan): FormGroup {

        return this._formBuilder.group({
            id: [challan.id],
            supplierId: [challan.supplierId, Validators.required],
            challanDate: [challan.challanDate, Validators.required],
            supplier: [{value:challan.supplier ,disabled: true}, Validators.required],
            challanNumber: [challan.challanNumber, Validators.required],
            manufacturerId: [challan.manufacturerId, Validators.required],
            manufacturer: [challan.manufacturer],
            manufacturersAddress: [challan.manufacturersAddress, Validators.required],
            poNumberId: [challan.poNumberId, Validators.required],
            poNumber: [challan.poNumber],
            poDate: [challan.poDate, Validators.required],
            deliveryAddress: [challan.deliveryAddress, Validators.required],
            finalChallan: [challan.finalChallan],
            preparedBy: [{value:challan.preparedBy,disabled: true}, Validators.required],
            designation: [{value:challan.designation,disabled: true}, Validators.required],
            deliveryDate: [challan.deliveryDate, Validators.required],
        });
    }


    saveChallan(): void {
        let challan = this.getChallanObject();
        console.log(challan);
        challan.status = statusCode.Draft;
       
        this.sendInvoiceToServer(challan);
    }


    submitChallan(): void {
        let challan = this.getChallanObject();

        if(this.pageType==='new' || this.pageType==='draft' || this.pageType==='edit' ){
            challan.status = statusCode.New;
        }
        this.sendInvoiceToServer(challan);
    }

    sendInvoiceToServer(challan:Challan){
        if(challan.id && challan.id!==""){
            this._challanservice.updateChallan(challan).then(() => {
                this._router.navigateByUrl('/challans');
            });
           
        }else{
            this._challanservice.addChallan(challan).then(() => {
                this._router.navigateByUrl('/challans');
            });
        }

    }

   

    getChallanObject(){
        let challan = this.ChallanForm.getRawValue();
        let cha=new Challan(challan);
       
        cha.product =this.products;
      
        if(cha.poNumberId === "noPo" ) {
         
            delete cha.poDate;
        }


        return cha;
    }

    updateValues(obj: any) {

        this.ChallanForm.patchValue(obj);
    }



}
