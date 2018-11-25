import { Component, OnDestroy, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, BehaviorSubject, of } from 'rxjs';


import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';
import { Product, Units, TaxCode } from '../poform.model';
import { PurchaseOrderService } from '../../purchaseorder.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { SCMCurrency } from '@custom/transform/currency.pipe';
import { LoginService } from '../../../login/logindetails.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'product-form',
    templateUrl: './product.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductComponent implements OnInit, OnDestroy,ChildItemComponent  {

    @Input() data: Product;

    productPageType: boolean =true;

    pageType: string;
    ProductForm: FormGroup;

    units:Units[]=[];
    unitsBehaviour : BehaviorSubject<any>;
    taxcodes:TaxCode[]=[];
    taxcodesBehaviour : BehaviorSubject<any>;
    public _changableData=new BehaviorSubject<any>([]);


    currentqty: number;
    currentUnitPrice: number;
    
    loginData:any;
    

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
        private _purchaseorderservice: PurchaseOrderService,
        private _loginService: LoginService
    ) {
        this._unsubscribeAll = new Subject();
        this._changableData=new BehaviorSubject<any>(this.data);
        this.unitsBehaviour=new BehaviorSubject({});
        this.taxcodesBehaviour=new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    
    ngOnInit(): void {
        this.loginData = this._loginService.getloginDetails();
       
        this.data = new Product();
        this.ProductForm = this.createForms(this.data);

        this.addSubscribers();

        this._changableData.subscribe(product => {

            
            if(product===false){
                this.productPageType=false;
                return;
            }
            if (product) {
                console.log(product);
                this.data = new Product(product);
                console.log(this.data);
                this.pageType = 'edit';
            }
            else {
              
                this.pageType = 'new';
                this.data = new Product();
            }
            this.productPageType=true;
           
            this.updateValues( this.data);

        });
  
        
    }

    netval:string="";

    calculateTotalPrice() {
        let netPayable = this.currentqty * this.currentUnitPrice           
        if(netPayable<0){
            netPayable=0;
        }
        let val=this.currencyPipe.transform(""+netPayable);

        if(this.netval!==val){
            this.netval=val;
            this.updateValues({"totalPrice":val});   
        }       
    }

    updateValues(obj:any){
      
        this.ProductForm.patchValue(obj);   
    }

    addSubscribers(){

        this._purchaseorderservice.getEnum().then((data) => {
         
            this.unitsBehaviour.next(data.units);           
            this.taxcodesBehaviour.next(data.tax);           
        })

        this.unitsBehaviour.subscribe(dbunits=>{
            this.units = [];
            for(let j in dbunits){
                this.units.push(new Units(dbunits[j]));
            }
            
            this.ProductForm.controls['unitId'].updateValueAndValidity();
        });

        this.taxcodesBehaviour.subscribe(dbtaxcodes=>{
            this.taxcodes = [];
            for(let j in dbtaxcodes){
                console.log("dbunits" , dbtaxcodes);
                this.taxcodes.push(new TaxCode(dbtaxcodes[j]));
            }
            
            this.ProductForm.controls['taxCodeId'].updateValueAndValidity();
        });

        this.ProductForm.controls['unitId'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((selectedValue) => {
                this.units.filter(element => {
                    if (element.id == selectedValue) {
                        this.updateValues({"unitName":element.name});
                    }

                });
                
                
            }
        );

        this.ProductForm.controls['taxCodeId'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((selectedValue) => {
            console.log("units" , this.units);
                this.taxcodes.filter(element => {
                    console.log(element.id);
                    console.log(element);
                    console.log(selectedValue);
                    if (element.id == selectedValue) {
                        this.updateValues({"taxCodeName":element.name});
                        console.log(element.name)
                        console.log(this.ProductForm.controls['taxCodeName'].value)
                    }
                });
                
                
            }
        );


        this.ProductForm.controls['qty'].valueChanges.subscribe(
            (selectedValue) => {
                this.currentqty = selectedValue;
                this.calculateTotalPrice();
            }
        );

       


        this.ProductForm.controls['unitPrice'].valueChanges.subscribe(
            (selectedValue) => {
                this.currentUnitPrice = selectedValue;
                this.calculateTotalPrice();
            }
        );
    }

    addNewClicked(){
        
        this._changableData.next(null);
    }

    setData(data){
        this._changableData.next(data);
    }
    getValue() {
        return this._changableData.getValue()
    }

    saveData(){
        let dataToUpdate=this.ProductForm.getRawValue();
        this._changableData.next(dataToUpdate);

        return this.getValue();
    }
    createForms(productdtls): FormGroup {
      
       return this._formBuilder.group({
            id:[productdtls.id],
            product: [productdtls.product,  Validators.required],
            description: [productdtls.description],
            unitId: [productdtls.unitId,  Validators.required],
            unitName: [productdtls.unitName,  Validators.required],
            qty: [productdtls.qty,  Validators.required],
            unitPrice: [productdtls.unitPrice,  Validators.required],
            totalPrice: [{value:productdtls.totalPrice,disabled:true},  Validators.required],
            taxCodeId: [productdtls.taxCodeId],
            taxCodeName: [productdtls.taxCodeName,  Validators.required],
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
        // const data = this.ProductForm.getRawValue();
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

    

    addProduct():void{
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


    
}



