import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';


//import { Product } from 'app/main/demo/product/product.model';
import { InvoiceService } from '../invoice.service';
// import { EcommerceProductService } from '../../../demo/product/product.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { Invoice, ProductDetails } from './invoice.model';

import { LoginService } from '../../../login/logindetails.service';

import { ChildListComponent } from '@custom/components/childlist/childlist.component';

import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';

import { ChildItem } from '@custom/components/childlist/child-item';
import { ProductComponentInvoice } from './product/product.component';
import { Router } from '@angular/router';
import { PurchaseOrder } from 'app/main/purchaseorder/poform/poform.model';
import { Challan } from 'app/main/Challan/challan/challan.model';
import { Org, AddressDtls } from 'app/main/org/orgform/org.model';
import { statusCode, MODE,ORGTYPE } from 'config';





@Component({
    selector: 'invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InvoiceComponent implements OnInit, OnDestroy {
    @ViewChild("productlisttable")
    productlisttable: ChildListComponent


    invoice: Invoice;
    pageType: string;
    InvoiceForm: FormGroup;
    ProductForm: FormGroup;
    nameOfSupplier: FormControl;
    invoiceDate: FormControl;
    invoiceNumber: FormControl;
    manufacturer: FormControl;
    manufacturersAddress: FormControl;
    poNumber: FormControl;
    poDate: FormControl;
    challanNumber: FormControl;
    challanDate: FormControl;
    preparedBy: FormControl;
    designation: FormControl;

    loginData: any;
    editFieldsReadOnly: boolean;
    ReadOnly: boolean = true;

    purchaseOrders: PurchaseOrder[] = [];
    poBehaviour : BehaviorSubject<any>;
    challans: Challan[] = [];
    challanBehaviour : BehaviorSubject<any>;
    mnames: Org[] = [];
    manufacturerBehaviour : BehaviorSubject<any>;

    products: ProductDetails[] = [];

    productItem: ChildItem = new ChildItem(ProductComponentInvoice, false);

    formshow: boolean = true;

    isReadOnly: boolean = false;

    currentUnitId: any;

    data1: any;

    currentindex: number;

    netPayable: number=0.00;
    grandTotal: number=0.00;
    totalVat: number=0.00;
    totalTax: number=0.00;
    advancePayment: number=0.00; 

    mailingAddress: AddressDtls;

    mode: string;

    // Private
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {InvoiceService} _invoiceservice
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _invoiceservice: InvoiceService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _loginService: LoginService,
        private _router: Router
        ) {
        // Set the default
        this.invoice = new Invoice();

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
   
        this.poBehaviour=new BehaviorSubject({});
        this.challanBehaviour=new BehaviorSubject({});
        this.manufacturerBehaviour=new BehaviorSubject({});
    
        this.loginData = this._loginService.getloginDetails();
        if(this.loginData.orgType ===ORGTYPE.MANUFACTURER) {
            this.mode = MODE.view; 
            this.isReadOnly = true;
        }else {
            this.mode = MODE.edit;
        }


    
    
    }
    actButtons: ActionButton[] = [{
        btnName: "Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.DELETE,
        url: "delete",
    }];

    

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
        toDisplay: false

    },
    {
        colDef: 'unitPrice',
        colName: 'Unit Price',
        colValue: 'unitPrice',
        toDisplay: true,
        colType:'amount'

    },
    // {
    //     colDef: 'unitName',
    //     colName: 'Units',
    //     colValue: 'unitName',
    //     toDisplay: true

    // },
    {
        colDef: 'tax',
        colName: 'Tax',
        colValue: 'tax',
        toDisplay: true,
        isTotalColoumn: true,
        colType:'amount'
    },
    {
        colDef: 'actions',
        colName: 'Actions',
        colValue: 'actions',
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


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        
        
       
        this.invoice=new Invoice();
        this.InvoiceForm = this.createControl(this.invoice);
        if(this.mode === MODE.edit) {
            this.addSubscribers();
        }    
 
        this._invoiceservice.getManufacturers(this.loginData.orgId).then(snames=>{
 
            this.manufacturerBehaviour.next(snames);
        });


        
        this.productInitialize();






    }


    public addSubscribers() {


        this.poBehaviour.subscribe(snames=>{
            this.purchaseOrders=[];
            for(let j in snames){
                this.purchaseOrders.push(new PurchaseOrder(snames[j]));
            }
            this.InvoiceForm.controls['poNumberId'].updateValueAndValidity();

        });

        this.InvoiceForm.controls['poNumberId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((selectedValue) => {
                
                    if(selectedValue && selectedValue!==''){
                        this.purchaseOrders.filter(element => {
                        
                            if (element.id == selectedValue) {
                                const orgIndx=this.purchaseOrders.findIndex( record => record.id === selectedValue );
                        
                                let podata=this.purchaseOrders[orgIndx];
                                if(podata){
                                    this.updateValues({'poNumber':podata.poNumber, 'poDate' : podata.issueDate})
                                }
                                this._invoiceservice.getChallansByPONumber(podata.poNumber).then((data) => {
                                    this.challanBehaviour.next(data);
                                });
                                
                            }
                        });

                        
                    }else{
                        this.updateValues({'poNumber':'', 'poDate' : '','challanId':''});
                    }
            }
        )


        this.challanBehaviour.subscribe(snames=>{
            this.challans=[];
            for(let j in snames){
                this.challans.push(new Challan(snames[j]));
            }
            this.InvoiceForm.controls['challanId'].updateValueAndValidity();
        });

        this.InvoiceForm.controls['challanId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((selectedValue) => {
               
                    if(selectedValue && selectedValue!==''){

                        this.challans.filter(element => {
                            if (element.id == selectedValue) {
                                
                                const challanIndx=this.challans.findIndex( record => record.id === selectedValue );
                         
                                let challandata=this.challans[challanIndx];
                                if(challandata){
                                    this.updateValues({'challanNumber':challandata.challanNumber, 'challanDate' : challandata.challanDate});
                                    this.invoice.challanNumber = challandata.challanNumber;
                                }
                            }
                        });
                        
                    }else{
                        this.updateValues({'challanNumber':'', 'challanDate' : ''});
                    }
                
            }
        )




        this.manufacturerBehaviour.subscribe(mnames=>{
            this.mnames=[];
            for(let j in mnames){
                this.mnames.push(new Org(mnames[j]));
            }
            this.InvoiceForm.controls['manufacturerId'].updateValueAndValidity();
        });

        this.InvoiceForm.controls['manufacturerId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((selectedValue) => {
               
                this.mnames.filter(element => {
                    if (element.id == selectedValue) {
                        
                        const orgIndx=this.mnames.findIndex( record => record.id === selectedValue );

                        let manufdata=this.mnames[orgIndx];
                        if(manufdata){
                            this.selectMailingAddress(manufdata.address);

                           
                            this.updateValues({
                                'manufacturer':manufdata.orgName, 
                                'manufacturersAddress' : (this.mailingAddress.addressLine1?this.mailingAddress.addressLine1:'') + 
                                (this.mailingAddress.addressLine2?this.mailingAddress.addressLine2:'') +
                                (this.mailingAddress.divisionName?this.mailingAddress.divisionName:'') +
                                (this.mailingAddress.districtName?this.mailingAddress.districtName:'') +
                                (this.mailingAddress.thanaName?this.mailingAddress.thanaName:'')})
                                
                                // if(this.pageType !== 'edit') {
                                //     this.updateValues({"poNumberId": ''})
                                // }

                                this._invoiceservice.getAcceptedPurchaseOrders(manufdata.id).then((data) => {

                                    this.poBehaviour.next(data);
                                });
                        }
           
                       
                        
                    }
                });
        });

        this.InvoiceForm.controls['advancePayment'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.advancePayment = parseFloat(""+selectedValue);
                this.CalculateTotalPayable();
        });

        this.InvoiceForm.controls['grandTotal'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.grandTotal = parseFloat(""+selectedValue);
                this.CalculateTotalPayable();
            });

        this.InvoiceForm.controls['totalVat'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.totalVat = parseFloat(""+selectedValue);
                this.CalculateTotalPayable();
            });

        this.InvoiceForm.controls['totalTax'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.totalTax = parseFloat(""+selectedValue);
                this.CalculateTotalPayable();
            });


    }

    public CalculateTotalPayable() {
        if (this.advancePayment || this.grandTotal || this.totalVat || this.totalTax) {
            // this.advancePayment = parseFloat(this.InvoiceForm.get('advancePayment').value);
            // this.totalVat = parseFloat(this.InvoiceForm.get('totalVat').value);
            // this.totalTax = parseFloat(this.InvoiceForm.get('totalTax').value);
            
          
            let TotalPayable = parseFloat(""+this.grandTotal) + parseFloat(""+this.totalVat) + parseFloat(""+this.totalTax);
           

            let netPayable = TotalPayable - parseFloat(""+this.advancePayment);
        
            this.updateValues({ "totalPayable": netPayable });
        }
    }

    selectMailingAddress(addresses){
        for(let i in addresses){
            // if(addresses[i] && addresses[i].isMailingAddress===true){
            if(addresses[i] ){
                this.mailingAddress= addresses[i];
            }
        }
    }


    handleValueChange(changedProducts) {

        if (changedProducts.data) {
            this.products = changedProducts.data;
            this.data1 = this.products;
            this.currentindex = this.data1.length - 1;
            this.getTotalCost(this.products, 'totalPrice');
            this.getTotalCost(this.products, 'vat');
            this.getTotalCost(this.products, 'tax');
        }
        this.formshow = changedProducts.formshow;
      
    }

    getTotalCost(newProductList, coloumnToTotal) {

        let grandTotal = 0.00;
        if (newProductList) {
            grandTotal = newProductList.map(t => t[coloumnToTotal]).reduce((acc, value) => {
                let addVal = value;
                try {
                    let stAddVal = '' + addVal;
                    if (stAddVal.indexOf(".") != -1) {
                        addVal = parseFloat(stAddVal);
                    } else {
                        addVal = parseInt(stAddVal);
                    }
                } catch (e) {

                }
                return acc + addVal;
            }, 0);

        }
        if (coloumnToTotal === "totalPrice") { this.grandTotal = grandTotal; this.updateValues({ "grandTotal": grandTotal }); }
        if (coloumnToTotal === "vat") { this.totalVat = grandTotal; this.updateValues({ "totalVat": grandTotal }); }
        if (coloumnToTotal === "tax") { this.totalTax = grandTotal; this.updateValues({ "totalTax": grandTotal }); }

        let netPayableInitial = this.grandTotal + this.totalVat + this.totalTax;
        //this.advancePayment = parseFloat(this.InvoiceForm.get('advancePayment').value);

        console.log("this.advancePayment", this.advancePayment);
        console.log("netPayableInitial", netPayableInitial);
        this.netPayable = netPayableInitial - this.advancePayment;
        console.log("this.netPayable",  this.netPayable);
        this.updateValues({ "totalPayable": this.netPayable });


    }


    validateform() {
        if (this.InvoiceForm.invalid || this.products.length <= 0) {
            return true;
        } else {
            return false;
        }
    }

    public productInitialize() {


        this._invoiceservice.onDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(invoice => {
                
                if (invoice) {


                    this.invoice = new Invoice(invoice);
                    this.pageType = 'edit';
                    this.products = this.invoice.productDetails;
                    this.editFieldsReadOnly = true;
                    

                    if(this.invoice.status=== statusCode.Draft){
                        this.pageType = 'draft';
                    }else{
                        this.pageType = 'edit';
                    }

                    let Allproducts = this.products;
                    let orgArr = [];
                    for (let x in Allproducts) {
                        orgArr.push(new ProductDetails(Allproducts[x]));
                    }
                    this.products = orgArr;
                    this.data1 = this.products;

                }
                else {
                    this.pageType = 'new';
                    this.editFieldsReadOnly = false;
                    
                    this.invoice.supplierName = this.loginData.orgName;
                    this.invoice.supplierId = this.loginData.orgId;
                    this.invoice.invoiceDate = this.loginData.date;
                    this.invoice.preparedBy = this.loginData.username;
                    this.invoice.designation = this.loginData.designation;
                }
                this.updateValues(this.invoice);
            });


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
    createControl(invoice?: Invoice): FormGroup {
        return this._formBuilder.group({
            id:[invoice.id],
            supplierName: [{value:invoice.supplierName,disabled:true}, Validators.required],
            supplierId: [invoice.supplierId, Validators.required],
            invoiceDate: [invoice.invoiceDate, Validators.required],
            invoiceNumber: [invoice.invoiceNumber, Validators.required],
            manufacturerId: [invoice.manufacturerId, Validators.required],
            manufacturer: [invoice.manufacturer],
            manufacturersAddress: [invoice.manufacturersAddress, Validators.required],
            poNumberId: [invoice.poNumberId, Validators.required],
            poNumber: [invoice.poNumber],
            poDate: [{value:invoice.poDate,disabled:true}, Validators.required],
            challanId: [invoice.challanId, Validators.required],
            challanNumber: [invoice.challanNumber],
            challanDate: [{value: invoice.challanDate,disabled:true}, Validators.required],
            grandTotal: [{value:invoice.grandTotal,disabled:true}, Validators.required],
            totalVat: [invoice.totalVat, Validators.required],
            totalTax: [invoice.totalTax, Validators.required],
            advancePayment: [invoice.advancePayment, Validators.required],
            totalPayable: [{value:invoice.totalPayable,disabled:true}, Validators.required],
            preparedBy: [{value:invoice.preparedBy,disabled:true}, Validators.required],
            designation: [{value:invoice.designation,disabled:true}, Validators.required],

        });
    }

    /**
     * Save product
     */
   
    getData(): void {
        this.products = this.productlisttable.data;
    }


    saveInvoice(): void {
        let invoice = this.getInvoiceObject();
        invoice.status = statusCode.Draft;
        this.sendInvoiceToServer(invoice);
    }

    /**
     * Add product
     */
    addInvoice(): void {
        
        let invoice = this.getInvoiceObject();
      
        if(this.pageType==='new' || this.pageType==='draft' || this.pageType==='edit'){
            invoice.status = statusCode.New;
        }
        this.sendInvoiceToServer(invoice);
        
    }

    
    
    getInvoiceObject(){
        let invoice = this.InvoiceForm.getRawValue();
        let invo=new Invoice(invoice);
        
        if(invo.advancePayment){
            invo.advancePayment = parseFloat(""+invo.advancePayment);
        }
        if(invo.totalPayable){
            invo.totalPayable = parseFloat(""+invo.totalPayable);
        }
        if(invo.grandTotal){
            invo.grandTotal = parseFloat(""+invo.grandTotal);
        }
        if(invo.totalVat){
            invo.totalVat = parseFloat(""+invo.totalVat);
        }
        if(invo.totalTax){
            invo.totalTax = parseFloat(""+invo.totalTax);
        }
    
        let products=[];
        for(let k in this.products){
            let singleProduct=this.products[k];
            if(singleProduct.quantity){
                singleProduct.quantity=parseFloat(""+singleProduct.quantity);
            }
            if(singleProduct.unitPrice){
                singleProduct.unitPrice=parseFloat(""+singleProduct.unitPrice);
            }
            if(singleProduct.totalPrice){
                singleProduct.totalPrice=parseFloat(""+singleProduct.totalPrice);
            }
            if(singleProduct.tax){
                singleProduct.tax=parseFloat(""+singleProduct.tax);
            }
            if(singleProduct.vat){
                singleProduct.vat=parseFloat(""+singleProduct.vat);
            }
            products.push(singleProduct);
        }
        invo.productDetails =products;


        return invo;
    }


    sendInvoiceToServer(invoice:Invoice){
       

        if(invoice.id && invoice.id!==""){
            this._invoiceservice.updateInvoice(invoice).then(() => {
                this._router.navigateByUrl('/invoices');
            });
           
        }else{
            this._invoiceservice.addInvoice(invoice).then(() => {
                this._router.navigateByUrl('/invoices');
            });
        }

        
    }

    updateValues(obj: any) {

        this.InvoiceForm.patchValue(obj);
    }



}



