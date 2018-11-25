import { Component, OnDestroy, OnInit, ViewEncapsulation, Input,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { FactorLimitService } from '../../factor-limit.service';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { SCMCurrency } from '@custom/transform/currency.pipe';
import { FactorLimit, salesLimitSetUp } from '../factor-form.model';
import { Org } from '../../../../org/orgform/org.model';
import { WorkOrderLimitComponent } from "../../../../facility-definition/work-order-limit/work-order-limit.component";
import { statusCode, MODE, ORGTYPE } from 'config';

@Component({
  selector: 'app-sales-ledger-limit',
  templateUrl: './sales-ledger-limit.component.html',
  styleUrls: ['./sales-ledger-limit.component.scss'],
  animations: fuseAnimations
})
export class SalesLedgerLimitComponent implements OnInit, ChildItemComponent {

  @Input() data: salesLimitSetUp;
  productPageType: boolean = true;
  fLimit: FactorLimit = new FactorLimit();
  pageType: string;
  FOLimitForm: FormGroup;
  organisation: Org[] = [];
  isReadOnly: boolean = false;
  mode: string;
  public _changableData = new BehaviorSubject<any>([]);
  @ViewChild('foFacilityLimittable')
  foFacilityLimittable: WorkOrderLimitComponent

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
    private _factorlimitService: FactorLimitService,
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
    this.mode = MODE.view;
    this.isReadOnly = true;
    this._changableData
      .subscribe(tableData => {
        if (tableData === false) {
          this.productPageType = false;
          return;
        }
        if (tableData) {

          this.data = new salesLimitSetUp(tableData);
          this.pageType = 'edit';
        }
        else {

          this.pageType = 'new';
          this.data = new salesLimitSetUp();
        }
        this.productPageType = true;
        console.log(this.data);
        this.FOLimitForm = this.createForms(this.data);
        // this.addSubscribers();

      });
    this._factorlimitService.getOrg().then((data) => {

      this.organisation = data;
    })

  }

  addNewClicked() {

    this._changableData.next(this.data);
  }

  setData(data) {
    // let factorData =  this.foFacilityLimittable.getValue();
    // dataToUpdate['salesCreditPeriod']=parseInt(factorData.salesCreditPeriod);
    // dataToUpdate['salesGracePeriod']=parseInt(factorData.salesGracePeriod);
    // dataToUpdate['advPaymentRate']=parseInt(factorData.advPaymentRate);
    this._changableData.next(data);
  }
  getValue() {
    return this._changableData.getValue()
  }

  saveData() {
    let dataToUpdate = this.FOLimitForm.value;
    
    this._changableData.next(dataToUpdate);

    return this.getValue();
  }
  createForms(debtordtls): FormGroup {
    console.log(debtordtls);
    return this._formBuilder.group({
      manufacturerName: [debtordtls.manufacturerName, Validators.required],
      salesLedgerLimit: [debtordtls.salesLedgerLimit, Validators.required],
      salesCreditPeriod: [debtordtls.salesCreditPeriod, Validators.required],
      salesGracePeriod: [debtordtls.salesGracePeriod, Validators.required],
      advPaymentRate: [debtordtls.advPaymentRate, Validators.required],
      permittedCreditLimit: [debtordtls.permittedCreditLimit, Validators.required],
      maxDays: [debtordtls.maxDays, Validators.required],
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
  // onSearchChange(val){
  //   console.log("value of permitted",val)
  // }
  permitterLimit() {

    let salesLedgerData = this.FOLimitForm.getRawValue();

    let salesLimit = new salesLimitSetUp(salesLedgerData);

    if (salesLimit.advPaymentRate) {
      salesLimit.advPaymentRate = parseInt("" + salesLimit.advPaymentRate);
    }
    console.log("advPayRate", salesLimit.advPaymentRate);
    if (salesLimit.salesLedgerLimit) {
      salesLimit.salesLedgerLimit = parseInt("" + salesLimit.salesLedgerLimit);

    }
    console.log("permittedCreditLimit", salesLimit.salesLedgerLimit);
    var permittedCreditLimit = salesLimit.salesLedgerLimit * salesLimit.advPaymentRate;
    console.log("salesLedgerLimit", permittedCreditLimit);
    this.FOLimitForm.controls['permittedCreditLimit'].setValue(permittedCreditLimit);
  }

}

