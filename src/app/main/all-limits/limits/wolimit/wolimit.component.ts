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
import { DebtorLimitComponent } from "../wolimit/debtor-limit/debtor-limit.component";
import { FactorLimit, debtorLimitSetUp, termPeriodInt } from '../wolimit/wolimit.model';
import { LimitsService } from '../limits.service';
import { Org } from '../../../org/orgform/org.model';
import { WorkOrderLimitComponent } from "../../../facility-definition/work-order-limit/work-order-limit.component";
import { statusCode } from 'config';
@Component({
  selector: 'app-wolimit',
  templateUrl: './wolimit.component.html',
  styleUrls: ['./wolimit.component.scss'],
  animations: fuseAnimations
})
export class WOLimitComponent implements OnInit {

  productPageType: boolean = true;
  pageType: string;
  workOrder: FactorLimit = new FactorLimit();
  dontshow: boolean = true;
  address;
  public id;
  public _changableData = new BehaviorSubject<any>([]);
  private _unsubscribeAll: Subject<any>;
  @ViewChild("debtorLimittable")
  debtorLimittable: ChildListComponent

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
    colDef: 'workOrderLimit',
    colName: 'Work Order Limit',
    colValue: 'workOrderLimit',
    toDisplay: true

  },
  {
    colDef: 'debtorCreditPeriod',
    colName: 'Credit Period',
    colValue: 'debtorCreditPeriod',
    toDisplay: true

  },
  {
    colDef: 'debtorGracePeriod',
    colName: 'Grace Period',
    colValue: 'debtorGracePeriod',
    toDisplay: true

  },
  {
    colDef: 'advPaymentRate',
    colName: 'Adv Payment Rate',
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
  public woLimitForm: FormGroup;
  debtorLimitSetUp: FormArray;
  woLimits: debtorLimitSetUp[] = [];
  woLimitItem: ChildItem = new ChildItem(DebtorLimitComponent, false);
  debtorLimit: DebtorLimitComponent;
  termPeriods: termPeriodInt[] = [];
  organisation: Org[] = [];
  shareData;

  constructor(
    private _formBuilder: FormBuilder,
    private _limitService: LimitsService,
    private http: Http,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    // Subscribe to update product on changes
    this._limitService.onDataChanged.subscribe((woFacility) => {

      if (woFacility) {

        this.workOrder = new FactorLimit(woFacility);
        this.woLimits = this.workOrder.debtorLimitSetUp;
        if (this.workOrder.status === statusCode.Draft) {
          this.pageType = 'draft';
        } else {
          this.pageType = 'edit';
        }

      }
      else {
        this.pageType = 'new';
      }

      // this.updateValues(this.wOrderLimit);
    });

    this._limitService.getOrg().then((data) => {

      this.organisation = data;
    });
    this._limitService.getTermPeriod().then((data) => {

      this.termPeriods = data;
    });

  }


  createLimitDetails(woLimit?): FormGroup {
    return this._formBuilder.group({
      manufacturerName: [woLimit.manufacturerName, Validators.required],
      workOrderLimit: [woLimit.workOrderLimit, Validators.required],
      debtorCreditPeriod: [woLimit.debtorCreditPeriod, Validators.required],
      debtorGracePeriod: [woLimit.debtorGracePeriod, Validators.required],
      advPaymentRate: [woLimit.advPaymentRate, Validators.required],
      maxDays: [woLimit.maxDays, Validators.required]
    })
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
  /**
     * @author: Madhu
     * @argument:none
     * @description:Form getData
     */
  getData(): void {
    this.woLimits = this.debtorLimittable.data;
  }
  /**
     * @author: Madhu
     * @argument:none
     * @description:Update Values of Form
     */
  updateValues(obj: any) {

    this.woLimitForm.patchValue(obj);
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
        * @description:Save WOLimit
        */
  saveWOLimit() {
    let workOrderData = this.getWOLimitObject();
    workOrderData.status = statusCode.Draft;
    this.sendWOToServer(workOrderData);

  }
  /**
         * @author: Madhu
         * @argument:none
         * @description:Add WOLimit
         */
  addWOLimit() {

    let workOrderData = this.getWOLimitObject();
    if (this.pageType === 'new' || this.pageType === 'draft') {
      workOrderData.status = statusCode.New;
    }
    console.log("data in addFactor", JSON.stringify(workOrderData))
    this.sendWOToServer(workOrderData);
  }
  //function to get value from form
  getWOLimitObject() {
    let woData = this.foFacilityLimittable.getValue();
    let workOrderData = new FactorLimit(woData);
    workOrderData.debtorLimitSetUp = this.woLimits;
    console.log("data of factorLimit", JSON.stringify(workOrderData))

    return workOrderData;
  }

  /**
         * @author: Madhu
         * @argument:none
         * @description:For Navigation
         */
  sendWOToServer(workOrderData: FactorLimit) {

    if (workOrderData.creditLimit) {
      workOrderData.creditLimit = parseInt("" + workOrderData.creditLimit);
    }
    console.log("data in sendToServer", JSON.stringify(workOrderData));
    if (workOrderData.id && workOrderData.id !== "") {
      this._limitService.updateWOFacility(workOrderData).then(() => {
        this.router.navigateByUrl('/workOrderLimit');
      });

    } else {
      this._limitService.addWOFacility(workOrderData).then(() => {
        this.router.navigateByUrl('/workOrderLimit');
      });
    }


  }
}



