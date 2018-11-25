import { Component, OnDestroy, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { PurchaseOrder, Product } from './poform.model';
import { PurchaseOrderService } from '../purchaseorder.service';
import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { Router } from '@angular/router';
import { ChildListComponent } from '@custom/components/childlist/childlist.component';
import {SCMCurrency}  from '@custom/transform/currency.pipe';
/*** 
replace later on with actual service 
*/

import { LoginService } from '../../login/logindetails.service';
import { ChildItem } from '@custom/components/childlist/child-item';
import { ProductComponent } from './product/product.component';
import { AddressDtls, Org } from 'app/main/org/orgform/org.model';
import { statusCode, MODE, ORGTYPE } from 'config';





@Component({
    selector: 'poform',
    templateUrl: './poform.component.html',
    styleUrls: ['./poform.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class POFormComponent implements OnInit, OnDestroy {


    @ViewChild("productlisttable") 
    productlisttable :ChildListComponent

    actButtons : ActionButton[]=[{
        btnName:"Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEDATA,
        btnAction: Actions.DELETE,
        url: "delete"
    }]
    columns : ColumnConfig[] =[{
        colDef :'id',
        colName : 'Id',
        colValue : 'id',
        toDisplay : false
        
    },
    {
        colDef: 'product',
        colName: 'Product',
        colValue: 'product',
        toDisplay: true

    },
    
    {
        colDef: 'unitPrice',
        colName: 'Unit Price',
        colValue: 'unitPrice',
        toDisplay: true,
        colType:'amount'
    },
    {
        colDef :'taxCodeName',
        colName : 'Tax Code',
        colValue : 'taxCodeName',
        toDisplay : true,

    },
    {
        colDef :'qty',
        colName : 'Quantity',
        colValue : 'qty',
        toDisplay : true,
        totalColoumnHeader :'Grand Total'
    },
    {
        colDef :'totalPrice',
        colName : 'Total Price',
        colValue : 'totalPrice',
        colType : 'amount',
        toDisplay : true,
        isTotalColoumn :true,
        toAddSuffix:false,
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

    childTableConfig : TableConfig = {
        expectedColoumns :  this.columns,
        addNewClickUrl : '/purchaseordersproducts',
        rowClickUrl : 'products/',
        addNewClickName : 'Add New Product',
        topHeadName:'Products',
        isTopHeadRequired:false,
        hasFooter:false
       
    }
    products:Product[]=[];
    productItem:ChildItem=new ChildItem(ProductComponent,false); 
    dontshow: boolean = true;
    purchase: PurchaseOrder=new PurchaseOrder();
    pageType: string;
    POForm: FormGroup;
    grandTotal:number=0.00;
    advPaymnt:number=0.00;
    manufacturerName: FormControl;
    loginData: any;
    mailingAddress:AddressDtls;
    addresses:AddressDtls[];
    snames: Org[]=[];
    selectedOrg:Org;
    formshow:boolean=true;
    netPayableVal:number=0.00;
    snamesBehaviour : BehaviorSubject<any>;
    private _unsubscribeAll: Subject<any>;

    isReadOnly: boolean = false;

    mode: string;



    /**
     * Constructor
     *
     * @param {EcommerceProductService} _poFormService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _poFormService: PurchaseOrderService,
        private _formBuilder: FormBuilder,
        private currencyPipe: SCMCurrency,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router,
        private _loginService: LoginService,
       
    ) {
        // Set the default
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.snamesBehaviour=new BehaviorSubject([]);
        this.loginData = this._loginService.getloginDetails();
       
        if(this.loginData.orgType === ORGTYPE.SUPPLIER) {
            this.mode = MODE.view; 
            this.isReadOnly = true;
        }else {
            this.mode = MODE.edit;
        }

    
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    ngOnInit(): void {

        

        this.POForm = this.createControl(this.purchase);
        if(this.mode === MODE.edit) {
            this.addSubscribers();
        }
        this._poFormService.getSuppliers().then(snames=>{
            this.snamesBehaviour.next(snames);
        });
    
        this._poFormService.onDataChanged.subscribe((purchaseorder) => {
    
            if (purchaseorder) {
               
                this.purchase = new PurchaseOrder(purchaseorder);
                this.products=this.purchase.productDetails;
                if(this.purchase.status===statusCode.Draft){
                    this.pageType = 'draft';
                }else{
                    this.pageType = 'edit';
                }
                
            }
            else {
                this.pageType = 'new';
            }
           
            if(this.pageType==='new'){
                this.purchase.createDate=new Date(this.loginData.date);
                this.purchase.issueDate=new Date(this.loginData.date);
                this.purchase.manufacturerName=this.loginData.orgName;
                this.purchase.manufacturerId=this.loginData.orgId;
            }
          
            this.updateValues(this.purchase);
        });
        
    }


    validate(){
       
        if(this.POForm.invalid || this.products.length<=0){
            return true;
        }else{
            return false;
        }
    }
    handleValueChange(changedProducts){
      
        if(changedProducts.data){
            this.products= changedProducts.data;
            this.getTotalCost(this.products,'totalPrice');
        }
      
        this.formshow=changedProducts.formshow;
        
    }
    
    getTotalCost(newProductList,coloumnToTotal) {
    
        let grandTotal=0.00;
        if(newProductList){
            grandTotal=newProductList.map(t => t[coloumnToTotal]).reduce((acc, value) => {
                let addVal=value;
                try{
                    let stAddVal=''+addVal;
                    if(stAddVal.indexOf(".")!=-1){
                        addVal=parseFloat(stAddVal);
                    }else{
                        addVal=parseInt(stAddVal);
                    }
                }catch(e){
                    
                }
                return acc + addVal;
            }, 0);
            
        }
       
        this.updateValues({"grndTotal":grandTotal})
    }

    addSubscribers(){
        
        this.POForm.controls['supplierId'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((selectedValue) => {
               
                this.snames.filter(element => {
                    if (element.id == selectedValue) {
                        
                        const orgIndx=this.snames.findIndex( record => record.id === selectedValue );
                 
                        let orgnizations=this.snames[orgIndx];
                        if(orgnizations){
                           this.updateValues({'supplierName':orgnizations.orgName})
                        }

                      
                        this.addresses=element.address
                       
                        this.selectMailingAddress();
                        if(this.mailingAddress){
                            this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
                        }

                        if(this.pageType==='edit'){
                            this.updateValues({"billingAddrsId":this.mailingAddress.id});
                        }
                        
                    }
                });
        });

        this.snamesBehaviour.subscribe(snames=>{
            for(let j in snames){
                this.snames.push(new Org(snames[j]));
            }
            this.POForm.controls['supplierId'].updateValueAndValidity();
        });

        this.POForm.controls['billingAddrsId'].valueChanges.subscribe((selectedValue) => {
            if(this.addresses){
                const addressIndx=this.addresses.findIndex( record => record.id === selectedValue );
                let selectedAddress=this.addresses[addressIndx];
                if(selectedAddress){
                    this.updateValues({'billingAddrs':this.createAddress(selectedAddress)})
                }
            }
            
        });

        this.POForm.controls['delivryAddrsId'].valueChanges.subscribe((selectedValue) => {
           if(this.addresses){
                const addressIndx=this.addresses.findIndex( record => record.id === selectedValue );
                let selectedAddress=this.addresses[addressIndx];
                if(selectedAddress){
                    this.updateValues({'delivryAddrs':this.createAddress(selectedAddress)})
                }
           }
        });

 

        this.POForm.controls['grndTotal'].valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedValue) => {
                this.grandTotal = selectedValue;

                this.calculateNetPayable();
            })

        this.POForm.controls['advPaymnt'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (selectedValue) => {
                this.advPaymnt = selectedValue;
                this.calculateNetPayable();
            }
        )

    }

    createAddress(selectedAddress):string{
        return selectedAddress.addressLine1+" "+selectedAddress.addressLine2+" "+selectedAddress.district+" "+selectedAddress.division+" "+selectedAddress.thana
    }
    
    calculateNetPayable() {
            let netPayable = this.grandTotal - this.advPaymnt           
            if(netPayable<0){
                netPayable=0;
            }
            let val=this.currencyPipe.transform(""+netPayable);
            if(this.netPayableVal!==val){
                this.netPayableVal=parseFloat(val);
               
                this.updateValues({"netPayable": this.netPayableVal});   
            }
    }

    updateValues(obj:any){
      
        this.POForm.patchValue(obj);   
    }

    
    
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }



    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createControl(purchaseorders?: PurchaseOrder): FormGroup {
        this.grandTotal=(purchaseorders && purchaseorders.grndTotal) ||0.00;
        this.advPaymnt=(purchaseorders && purchaseorders.advPaymnt) ||0.00;
      
        return this._formBuilder.group({
            id: [purchaseorders.id],
            manufacturerId:[purchaseorders.manufacturerId, Validators.required],
            manufacturerName: [{value:purchaseorders.manufacturerName,disabled: true}, Validators.required],
            poNumber: [purchaseorders.poNumber],
            createDate: [{value:purchaseorders.createDate,disabled: true}, Validators.required],
            issueDate: [purchaseorders.issueDate, Validators.required],
            supplierId: [purchaseorders.supplierId, Validators.required],
            supplierName: [purchaseorders.supplierName],
            supplierAddrsId:[purchaseorders.supplierAddrsId, Validators.required],
            supplierAddrs: [purchaseorders.supplierAddrs, Validators.required],
            delivryAddrsId:[purchaseorders.delivryAddrsId, Validators.required],
            delivryAddrs: [purchaseorders.delivryAddrs, Validators.required],
            billingAddrsId: [purchaseorders.billingAddrsId, Validators.required],
            billingAddrs: [purchaseorders.billingAddrs, Validators.required],
            grndTotal: [{value: purchaseorders.grndTotal,disabled:true }, Validators.required],
            advPaymnt: [purchaseorders.advPaymnt],
            netPayable: [{value :purchaseorders.netPayable,disabled:true }, Validators.required],
            status:[purchaseorders.status],
            reason: [purchaseorders.reason]
        });
    }


    

    getData():void{
        this.products=this.productlisttable.data;
    }


    selectMailingAddress(){
        for(let i in this.addresses){
            // if(this.addresses[i] && this.addresses[i].isMailingAddress===true){
            if(this.addresses[i]){
                this.mailingAddress= this.addresses[i];
            }
        }
    }

    savePurchaseOrder() {
        let po=this.getPOObject();
        po.status = statusCode.Draft;
        
        this.sendPoToServer(po);
       
    }

    submitPurchaseOrder() {
       
        let po=this.getPOObject();
        if(this.pageType==='new' || this.pageType==='draft' || this.pageType==='edit'){
          
            po.status = statusCode.New;
        }
        this.sendPoToServer(po);
    }

    getPOObject(){
        let purchaseOrder=this.POForm.getRawValue();
        let po=new PurchaseOrder(purchaseOrder);
        po.productDetails=this.products;
        return po;
    }


    sendPoToServer(po:PurchaseOrder){
       
        if(po.grndTotal){
            po.grndTotal=parseFloat(""+po.grndTotal);
        }
        if(po.netPayable){
            po.netPayable=parseFloat(""+po.netPayable);
        }
        if(po.advPaymnt){
            po.advPaymnt=parseFloat(""+po.advPaymnt);
        }

        if(po.id && po.id!==""){
            this._poFormService.updatePurchaseOrder(po).then(() => {
                this.router.navigateByUrl('/purchaseorders');
            });
           
        }else{
            this._poFormService.addPurchaseOrder(po).then(() => {
                this.router.navigateByUrl('/purchaseorders');
            });
        }

        
    }

}



