import { Component, OnDestroy, OnInit, ViewEncapsulation,EventEmitter, Input, Output  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router } from '@angular/router';
import { ProductDetails, Units } from '../invoice.model';
import { InvoiceService } from '../../invoice.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';

import { LoginService } from '../../../../login/logindetails.service';

@Component({
    selector: 'product-form',
    templateUrl: './product.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductComponentInvoice implements OnInit, OnDestroy,ChildItemComponent  {

    @Input() data: any;

    productPageType: boolean =true;

    pageType: string;
    ProductForm: FormGroup;

    units:Units[];
    unitsBehaviour : BehaviorSubject<any>;
    public _changableData=new BehaviorSubject<any>([]);

    loginData:any;
    

    currentqty: number;
    currentUnitPrice: number;
    
    
    

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
        private _invoiceservice: InvoiceService,
        private _loginService: LoginService
    ) {
        this._unsubscribeAll = new Subject();
        this._changableData=new BehaviorSubject<any>(this.data);
        this.unitsBehaviour=new BehaviorSubject({});   
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    
    ngOnInit(): void {
        this.loginData = this._loginService.getloginDetails();
        this._changableData
        .subscribe(product => {

            if(product===false){
                this.productPageType=false;
                return;
            }
            if (product) {

                this.data = new ProductDetails(product);
                this.pageType = 'edit';
            }
            else {
               
                this.pageType = 'new';
                this.data = new ProductDetails();
            }
            this.productPageType=true;
            // console.log(this.data);
            this.ProductForm = this.createForms(this.data);

            this.currentUnitPrice = this.data.unitPrice;
            this.currentqty = this.data.quantity;


            this.addSubscribers();


        });
  
        this._invoiceservice.getEnum().then((data) => {
            this.unitsBehaviour.next(data.units); 
        })
        
    }

    addSubscribers(){
        this.ProductForm.controls['quantity'].valueChanges.subscribe(
            (selectedValue) => {
            // console.log(selectedValue);
            this.currentqty = selectedValue;
            this.CalculateTotalPrice();
            }
        );

        this.ProductForm.controls['unitPrice'].valueChanges.subscribe(
            (selectedValue) => {
                this.currentUnitPrice = selectedValue;
                this.CalculateTotalPrice();
            }
        );
        
        this.unitsBehaviour.subscribe(dbunits=>{
            this.units = [];
            for(let j in dbunits){
                this.units.push(new Units(dbunits[j]));
            }
            
            this.ProductForm.controls['unitId'].updateValueAndValidity();
        });
        
        
        this.ProductForm.controls['unitId'].valueChanges.subscribe(
            (selectedValue) => {
                this.units.filter(element => {
                    if (element.id == selectedValue) {
                        this.updateValues({"unitName":element.name});
                    }
                });
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
        return this._changableData.getValue();
    }

    saveData(){
        let dataToUpdate=this.ProductForm.getRawValue();
        
        this._changableData.next(dataToUpdate);

        return this.getValue();
    }
    createForms(productdtls): FormGroup {
       return this._formBuilder.group({
            id:[productdtls.id],
            product: [productdtls.product, Validators.required],
            quantity: [productdtls.quantity, Validators.required],
            unitId: [productdtls.unitId, Validators.required],
            unitName: [productdtls.unitName, Validators.required],
            unitPrice: [productdtls.unitPrice, Validators.required],
            totalPrice: [{value: productdtls.totalPrice, disabled:true} , Validators.required],
            vat: [productdtls.vat, Validators.required],
            tax: [productdtls.tax, Validators.required],
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


    


  



    public CalculateTotalPrice() {
        if(this.currentqty && this.currentUnitPrice) {
            const totalPrice = this.currentqty * this.currentUnitPrice
            this.updateValues({"totalPrice":totalPrice});
        }
    }


    updateValues(obj:any){
      
        this.ProductForm.patchValue(obj);   
    }

}



