import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Location } from '@angular/common';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { Observable } from 'rxjs/Rx';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MouseEvent } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ChildListComponent } from '@custom/components/childlist/childlist.component';
import { ChildItem } from '@custom/components/childlist/child-item';
import { FactorLimit, salesLimitSetUp, termPeriodInt } from '../factor-form/factor-form.model';
import { FactorLimitService } from '../factor-limit.service'
import {FacilityDefinitionService} from "../../../facility-definition/facility-definition.service";
import { AddressDtls,Org } from '../../../org/orgform/org.model';
import { WorkOrderLimitComponent } from "../../../facility-definition/work-order-limit/work-order-limit.component";
import { SalesLedgerLimitComponent } from "../factor-form/sales-ledger-limit/sales-ledger-limit.component";
import { statusCode } from 'config';
@Component({
  selector: 'app-factor-form',
  templateUrl: './factor-form.component.html',
  styleUrls: ['./factor-form.component.scss'],
  animations: fuseAnimations
})
export class FactorFormComponent implements OnInit {
  productPageType: boolean = true;
  pageType: string;
  fLimit: FactorLimit = new FactorLimit();
  // factoringLimit: factoringLimit = new factoringLimit();

  dontshow: boolean = true;
  address;
  public id;
  public _changableData = new BehaviorSubject<any>([]);
  private _unsubscribeAll: Subject<any>;
  message:string;
  data: FactorLimit;
  
  @ViewChild("salesLedgerLimittable")
  salesLedgerLimittable: ChildListComponent

  @ViewChild('foFacilityLimittable')
  foFacilityLimittable: WorkOrderLimitComponent

  actButtons: ActionButton[] = [{
    btnName: "delete",
    btnIcon: "active-icon",
    btnIconSizeClass: "s-16",
    btnIconColorClass: "green-600",
    btnActionType: ActionType.USEURL,
    btnAction: Actions.DELETE,
    url: "delete"
  }]
  columns: ColumnConfig[] = [{
    colDef: 'manufacturerName',
    colName: 'Manufacturer',
    colValue: 'manufacturerName',
    toDisplay: true

  },
  {
    colDef: 'salesLedgerLimit',
    colName: 'Sales Ledger Limit',
    colValue: 'salesLedgerLimit',
    toDisplay: true

  },
  {
    colDef: 'salesCreditPeriod',
    colName: 'Credit Period',
    colValue: 'salesCreditPeriod',
    toDisplay: true

  },
  {
    colDef: 'salesGracePeriod',
    colName: 'Grace Period',
    colValue: 'salesGracePeriod',
    toDisplay: true

  },
  {
    colDef: 'advPaymentRate',
    colName: 'AdvPaymentRate',
    colValue: 'advPaymentRate',
    toDisplay: true

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
    // addNewClickUrl : '/WODebtorLimit',
    // rowClickUrl : 'debtorLimit/',
    addNewClickName: 'Add New DebtorLimit',
    topHeadName: 'DebtorLimit',
    isTopHeadRequired: false,
    hasFooter: false

  }
  public factorLimitForm: FormGroup;
  salesLimitSetUp: FormArray;
  salesLimits: salesLimitSetUp[] = [];
  fLimitItem: ChildItem = new ChildItem(SalesLedgerLimitComponent, false);
  factorLimit: SalesLedgerLimitComponent;
  // @Input()
  // set data(value){
  //     value=value?value:[];
  //     this._data.next(value);
  // }
  shareData;

  constructor(
    private _formBuilder: FormBuilder,
    public _folimitService: FactorLimitService,
    private http: Http,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private _woFaclityService: FacilityDefinitionService,
    private router: Router) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // this.shareData = _woFaclityService.SharedComponent;
  }

  ngOnInit() {

    // Subscribe to update product on changes
    console.log("childNGONIT");
    this.factorLimitForm = this.createControl(this.fLimit);
    this.createControl(this.fLimit);
    this._folimitService.onDataChanged.subscribe((foFacility) => {

      if (foFacility) {

        this.fLimit = new FactorLimit(foFacility);
        // this.factoringLimit = new factoringLimit(foFacility)
        this.salesLimits = this.fLimit.salesLimitSetUp;
        if (this.fLimit.status === statusCode.Draft) {
          this.pageType = 'draft';
        } else {
          this.pageType = 'edit';
        }

      }
      else {
        this.pageType = 'new';
      }

      this.updateValues(this.fLimit);
    });
   

  }

  createLimitDetails(foLimit?): FormGroup {
    return this._formBuilder.group({
      manufacturerName: [foLimit.manufacturerName, Validators.required],
      salesLedgerLimit: [foLimit.salesLedgerLimit, Validators.required],
      salesCreditPeriod: [foLimit.salesCreditPeriod, Validators.required],
      salesGracePeriod: [foLimit.salesGracePeriod, Validators.required],
      advPaymentRate: [foLimit.advPaymentRate, Validators.required],
      permittedCreditLimit: [foLimit.permittedCreditLimit, Validators.required],
      maxDays: [foLimit.maxDays, Validators.required],
      id: [foLimit.id]
    })
  }

  /**
     * @author: Madhu
     * @argument:none
     * @description:Form Validation
     */
  createControl(foLimit?: FactorLimit): FormGroup {

    this.factorLimitForm = this._formBuilder.group({
      SNDRate: [foLimit.SNDRate, Validators.required],
      SNDThreshold: [foLimit.SNDThreshold, Validators.required]
    });
    return this.factorLimitForm;
  }
  /**
     * @author: Madhu
     * @argument:none
     * @description:Form validation
     */
    validateform() {
      return this.foFacilityLimittable.isValidForm();
  }
  /**
     * @author: Madhu
     * @argument:none
     * @description:Form getData
     */
  getData(): void {
    this.salesLimits = this.salesLedgerLimittable.data;
  }
  /**
     * @author: Madhu
     * @argument:none
     * @description:Update Values of Form
     */
  updateValues(obj: any) {

    this.factorLimitForm.patchValue(obj);
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
        * @author: Madhu
        * @argument:none
        * @description:Save DistributorLimit
        */
  saveFactorLimit() {
    let FLimit = this.getFactorLimitObject();
    FLimit.status = statusCode.Draft;
    this.sendFoToServer(FLimit);

  }
  /**
         * @author: Madhu
         * @argument:none
         * @description:Add DistributorLimit
         */
  addFactorLimit() {

    let FLimit = this.getFactorLimitObject();
    if (this.pageType === 'new' || this.pageType === 'draft') {
      FLimit.status = statusCode.New;
    }
    console.log("data in addFactor",JSON.stringify(FLimit))
    this.sendFoToServer(FLimit);
  }
  //function to get value from form
  getFactorLimitObject() {
    let factorData =  this.foFacilityLimittable.getValue();
    let factoringLimit=this.factorLimitForm.getRawValue();
    factorData['SNDRate']=parseInt(factoringLimit.SNDRate);
    factorData['SNDThreshold']=parseInt(factoringLimit.SNDThreshold);
    let FLimit = new FactorLimit(factorData);
    FLimit.salesLimitSetUp = this.salesLimits;
    console.log("data of factorLimit", JSON.stringify(FLimit))

    return FLimit;
  }

  /**
         * @author: Madhu
         * @argument:none
         * @description:For Navigation
         */
  sendFoToServer(FLimit: FactorLimit) {

    if (FLimit.loanAccNo) {
        FLimit.loanAccNo = Number(FLimit.loanAccNo);
    }
    if (FLimit.serviceCharge) {
        FLimit.serviceCharge = parseInt("" + FLimit.serviceCharge);
    }
    if (FLimit.penaltyCharge) {
      FLimit.penaltyCharge = parseInt("" + FLimit.penaltyCharge);
  }
    if (FLimit.interestRate) {
        FLimit.interestRate = parseInt("" + FLimit.interestRate);
    } if (FLimit.creditLimit) {
        FLimit.creditLimit = parseInt("" + FLimit.creditLimit);
    }
    if (FLimit.term) {
        FLimit.term = parseInt("" + FLimit.term);
    }
    if (FLimit.advPayment) {
      FLimit.advPayment = parseInt("" + FLimit.advPayment);
  }
  if (FLimit.creditPeriod) {
    FLimit.creditPeriod = parseInt("" + FLimit.creditPeriod);
}
if (FLimit.gracePeriod) {
  FLimit.gracePeriod = parseInt("" + FLimit.gracePeriod);
}
if (FLimit.creditLimit) {
  FLimit.creditLimit = parseInt("" + FLimit.creditLimit);
}
console.log("data in sendToServer",JSON.stringify(FLimit));
    if (FLimit.id && FLimit.id !== "") {
      this._folimitService.updateFOFacility(FLimit).then(() => {
        this.router.navigateByUrl('/factoringLimit');
      });

    } else {
      this._folimitService.addFOFacility(FLimit).then(() => {
        this.router.navigateByUrl('/factoringLimit');
      });
    }


  }
}



