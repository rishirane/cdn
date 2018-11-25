import { Component, OnDestroy, OnInit, ViewEncapsulation,EventEmitter, Input, Output  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';


import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';

import { ChallanService } from '../../challan.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';

import { Product } from 'app/main/purchaseorder/poform/poform.model';


@Component({
    selector: 'product-form',
    templateUrl: './product.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChallanPOComponent implements OnInit, OnDestroy,ChildItemComponent  {

    
    @Input() data: any;

    productPageType: boolean =true;

    pageType: string;
    ChallanProduct: FormGroup;


    public _changableData=new BehaviorSubject<any>([]);


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
        private _challanservice: ChallanService
    ) {
        this._unsubscribeAll = new Subject();
        this._changableData=new BehaviorSubject<any>(this.data);
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    
    ngOnInit(): void {
        
        this._changableData
        .subscribe(product => {

            if(product===false){
                this.productPageType=false;
                return;
            }
            if (product) {

                this.data = new Product(product);
                console.log(this.data);
                this.pageType = 'edit';
            }
            else {
               
                this.pageType = 'new';
                this.data = new Product();
            }
            this.productPageType=true;
            console.log(this.data);
            this.ChallanProduct = this.createForms(this.data);
            console.log(this.ChallanProduct);

        });

        
        
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
        let dataToUpdate=this.ChallanProduct.value;
       
        this._changableData.next(dataToUpdate);

        return this.getValue();
    }
    createForms(productdtls): FormGroup {
       return this._formBuilder.group({
            id:[productdtls.id],
            product: [productdtls.product,  Validators.required],
            qty: [productdtls.qty,  Validators.required],
            unit: [productdtls.unitName,  Validators.required],
            unitId: [productdtls.unitId],
            unitObj: [productdtls.unit],
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
        // const data = this.ChallanProduct.getRawValue();
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



