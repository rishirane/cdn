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
import { FactorLimit, manufacturersLimitSetUp, termPeriodInt } from '../demand-order-form/demand-order.model';
import { DemandOrderService } from '../demand-order.service';
import { Org } from '../../../org/orgform/org.model';
import { WorkOrderLimitComponent } from "../../../facility-definition/work-order-limit/work-order-limit.component";
import { ProgramSetUpComponent } from "../demand-order-form/program-set-up/program-set-up.component";
import { statusCode } from "../../../../../config";
import {FacilityDefinitionService } from "../../../facility-definition/facility-definition.service";

@Component({
  selector: 'app-demand-order-form',
  templateUrl: './demand-order-form.component.html',
  styleUrls: ['./demand-order-form.component.scss'],
  animations: fuseAnimations
})
export class DemandOrderFormComponent implements OnInit {
  productPageType: boolean = true;
  pageType: string;
  dlimit: FactorLimit = new FactorLimit();
  dontshow: boolean = true;
  address;
  public id;
  public _changableData = new BehaviorSubject<any>([]);
  private _unsubscribeAll: Subject<any>;
  message: string;
  data: FactorLimit;
  @ViewChild("progradFLimittable")
  progradFLimittable: ChildListComponent

  @ViewChild('foFacilityLimittable')
  foFacilityLimittable: WorkOrderLimitComponent

  limitItem: ChildItem = new ChildItem(WorkOrderLimitComponent, false);


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
    colDef: 'demandOrderLimit',
    colName: 'Credit Limit',
    colValue: 'demandOrderLimit',
    toDisplay: true

  },
  {
    colDef: 'manufacturerCreditPeriod',
    colName: 'Credit Period',
    colValue: 'manufacturerCreditPeriod',
    toDisplay: true

  },
  {
    colDef: 'manufacturerGracePeriod',
    colName: 'Grace Period',
    colValue: 'manufacturerGracePeriod',
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
    addNewClickName: 'Add New ManufacturerLimit',
    topHeadName: 'Manufacturer Limit',
    isTopHeadRequired: false,
    hasFooter: false

  }
  public demandOrderLimitForm: FormGroup;
  debtorLimitSetUp: FormArray;
  doLimits: manufacturersLimitSetUp[] = [];
  doLimitItem: ChildItem = new ChildItem(ProgramSetUpComponent, false);

  demandLimit: ProgramSetUpComponent;
  termPeriods: termPeriodInt[] = [];
  organisation: Org[] = [];
  shareData;


  // Private

  constructor(
    private _formBuilder: FormBuilder,
    public _demandOrderService: DemandOrderService,
    private http: Http,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private _woFaclityService: FacilityDefinitionService,
    private router: Router) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.demandOrderLimitForm = this.createControl(this.dlimit);

    this._demandOrderService.onDataChanged.subscribe((doFacility) => {

      if (doFacility) {

        this.dlimit = new FactorLimit(doFacility);
        this.doLimits = this.dlimit.manufacturersLimitSetUp;
        if (this.dlimit.status === statusCode.Draft) {
          this.pageType = 'draft';
        } else {
          this.pageType = 'edit';
        }

      }
      else {
        this.pageType = 'new';
      }

      this.updateValues(this.dlimit);
    });

    this._demandOrderService.getOrg().then((data) => {

      this.organisation = data;
    });
    this._demandOrderService.getTermPeriod().then((data) => {

      this.termPeriods = data;
    });
  }


  handleTransfer(event){
    console.log(event)
  }

  createLimitDetails(doLimit?): FormGroup {
    return this._formBuilder.group({
      manufacturerName: [doLimit.manufacturerName, Validators.required],
      demandOrderLimit: [doLimit.salesLedgerLimit, Validators.required],
      manufacturerCreditPeriod: [doLimit.salesCreditPeriod, Validators.required],
      manufacturerGracePeriod: [doLimit.salesGracePeriod, Validators.required],
      advPaymentRate: [doLimit.advPaymentRate, Validators.required],
    })
  }
  /**
     * @author: Madhu
     * @argument:none
     * @description:Form Validation
     */
  createControl(doLimit?: FactorLimit): FormGroup {
    console.log("value of", doLimit)
    this.demandOrderLimitForm = this._formBuilder.group({
      SNDRate: [doLimit.SNDRate, Validators.required],
      maxDays: [doLimit.maxDays, Validators.required],

    });
    return this.demandOrderLimitForm;
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
   * @description:Form validation
   */
  validateform() {
    return this.foFacilityLimittable.isValidForm();
  }

  /**
      * @author: Madhu
      * @argument:none
      * @description:Update Values of Form
      */
  updateValues(obj: any) {

    this.demandOrderLimitForm.patchValue(obj);
  }
  /**
    * @author: Madhu
    * @argument:none
    * @description:Form getData
    */
  getData(): void {
    this.doLimits = this.progradFLimittable.data;
  }
  /**
        * @author: Madhu
        * @argument:none
        * @description:Save DistributorLimit
        */
  saveDistributorLimit() {
    let dFLimit = this.getDFObject();
    dFLimit.status = statusCode.Draft;

    this.sendDoToServer(dFLimit);

  }
  /**
         * @author: Madhu
         * @argument:none
         * @description:Add DistributorLimit
         */
  addDistributorLimit() {

    let dFLimit = this.getDFObject();
    if (this.pageType === 'new' || this.pageType === 'draft') {
      dFLimit.status = statusCode.New;
    }
    this.sendDoToServer(dFLimit);
  }
  //function to get value from form
  getDFObject() {
    let doData = this.foFacilityLimittable.getValue();
    let demandLimit = this.demandOrderLimitForm.getRawValue();
    doData['SNDRate'] = parseInt(demandLimit.SNDRate);
    doData['maxDays'] = parseInt(demandLimit.maxDays);
    let dFLimit = new FactorLimit(doData);
    dFLimit.manufacturersLimitSetUp = this.doLimits;
    console.log("data of masterLimit", JSON.stringify(dFLimit))

    return dFLimit;
  }

  /**
         * @author: Madhu
         * @argument:none
         * @description:For NavigationcompositeData
         */
  sendDoToServer(dFLimit: FactorLimit) {

    if (dFLimit.term) {
      dFLimit.term = parseInt("" + dFLimit.term);
    }

    if (dFLimit.creditLimit) {
      dFLimit.creditLimit = parseInt("" + dFLimit.creditLimit);
    }
    if (dFLimit.advPayment) {
      dFLimit.advPayment = parseInt("" + dFLimit.advPayment);
    }
    if (dFLimit.interestRate) {
      dFLimit.interestRate = parseInt("" + dFLimit.interestRate);
    } if (dFLimit.penaltyCharge) {
      dFLimit.penaltyCharge = parseInt("" + dFLimit.penaltyCharge);
    }
    if (dFLimit.serviceCharge) {
      dFLimit.serviceCharge = parseInt("" + dFLimit.serviceCharge);
    }
    if (dFLimit.creditPeriod) {
      dFLimit.creditPeriod = parseInt("" + dFLimit.creditPeriod);
    } if (dFLimit.gracePeriod) {
      dFLimit.gracePeriod = parseInt("" + dFLimit.gracePeriod);
    }
    if (dFLimit.loanAccNo) {
      dFLimit.loanAccNo = parseInt("" + dFLimit.loanAccNo);
    }
    if (dFLimit.SNDRate) {
      dFLimit.SNDRate = parseInt("" + dFLimit.SNDRate);
    }

    if (dFLimit.id && dFLimit.id !== "") {
      this._demandOrderService.updateDOFacility(dFLimit).then(() => {
        this.router.navigateByUrl('/distributorFinanceLimit');
      });

    } else {
      this._demandOrderService.addDOFacility(dFLimit).then(() => {
        this.router.navigateByUrl('/distributorFinanceLimit');
      });
    }


  }
}






