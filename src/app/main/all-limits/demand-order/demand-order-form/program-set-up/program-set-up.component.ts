import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { DemandOrderService } from '../../demand-order.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { SCMCurrency } from '@custom/transform/currency.pipe';
import { FactorLimit, manufacturersLimitSetUp } from '../demand-order.model';
import { Org } from '../../../../org/orgform/org.model';

@Component({
  selector: 'app-program-set-up',
  templateUrl: './program-set-up.component.html',
  styleUrls: ['./program-set-up.component.scss']
})
export class ProgramSetUpComponent implements OnInit, ChildItemComponent {

  @Input() data: manufacturersLimitSetUp;
    productPageType: boolean = true;
    pageType: string;
    DOLimitForm: FormGroup;
    organisation: Org[] = [];

    public _changableData = new BehaviorSubject<any>([]);
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
        public _demandOrderService: DemandOrderService,
        // private _loginService: LoginService
    ) {
        this._unsubscribeAll = new Subject();
        this._changableData = new BehaviorSubject<any>(this.data);
    }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */


  ngOnInit(): void {
    this._changableData
      .subscribe(tableData => {
        if (tableData === false) {
          this.productPageType = false;
          return;
        }
        if (tableData) {

          this.data = new manufacturersLimitSetUp(tableData);
          this.pageType = 'edit';
        }
        else {

          this.pageType = 'new';
          this.data = new manufacturersLimitSetUp();
        }
        this.productPageType = true;
        console.log(this.data);
        this.DOLimitForm = this.createForms(this.data);
        // this.addSubscribers();

      });
    this._demandOrderService.getOrg().then((data) => {

      this.organisation = data;
    })

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
    let dataToUpdate = this.DOLimitForm.value;
    this._changableData.next(dataToUpdate);
    
    return this.getValue();
  }
  createForms(manufacturerdtls): FormGroup {
    console.log(manufacturerdtls);
    return this._formBuilder.group({
      manufacturerName: [manufacturerdtls.manufacturerName, Validators.required],
      demandOrderLimit: [manufacturerdtls.demandOrderLimit, Validators.required],
      manufacturerCreditPeriod: [manufacturerdtls.manufacturerCreditPeriod, Validators.required],
      manufacturerGracePeriod: [manufacturerdtls.manufacturerGracePeriod, Validators.required],
      advPaymentRate: [manufacturerdtls.advPaymentRate, Validators.required],
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

  }



  addProduct(): void {
    //this.productPageType="new"
  }


  submit(formrecv: any) {
    console.log(formrecv);

  }



}


