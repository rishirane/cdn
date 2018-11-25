
import { WorkOrderLimitComponent } from "../../facility-definition/work-order-limit/work-order-limit.component";
import { FactorLimit } from '../work-order-limit/work-order-limit.model';
import { ChildItem } from '@custom/components/childlist/child-item';
import { Component, OnInit,ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { FacilityDefinitionService } from '../../facility-definition/facility-definition.service';
import { statusCode } from "config";
@Component({
  selector: 'app-facility-header',
  templateUrl: './facility-header.component.html',
  styleUrls: ['./facility-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FacilityHeaderComponent implements OnInit {
  productPageType: boolean = true;
  pageType: string;
  flimit: FactorLimit = new FactorLimit();
  dontshow: boolean = true;
  public id;
  public _changableData = new BehaviorSubject<any>([]);
  private _unsubscribeAll: Subject<any>;
  message:string;
  
  constructor(private _woFaclityService: FacilityDefinitionService, private router: Router) {
    
    // Set the private defaults
        this._unsubscribeAll = new Subject();
  }
  @ViewChild('foFacilityLimittable')
  foFacilityLimittable: WorkOrderLimitComponent

  limitItem: ChildItem = new ChildItem(WorkOrderLimitComponent, false);

  ngOnInit() {
    
    this._woFaclityService.onDataChanged.subscribe((woFacility) => {

        if (woFacility) {

            this.flimit = new FactorLimit(woFacility);
            console.log(this.flimit);
            if (this.flimit.status === statusCode.Draft) {
                this.pageType = 'draft';
            } else {
                this.pageType = 'edit';
            }
        }
        else {
            this.pageType = 'new';
        }

        
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
    //validation
    validateform() {
        return this.foFacilityLimittable.isValidForm();
    }

    /**
           * @author: Madhu
           * @argument:none
           * @description:Save MasterLimit
           */
    saveWOFacility() {
        let factorLimit = this.getFDObject();
        factorLimit.status = statusCode.Draft;

        this.sendFDToServer(factorLimit);

    }
    /**
     * @author: Madhu
     * @argument:none
     * @description:Add MasterLimit
     */
    submitWOFacility() {

        let factorLimit = this.getFDObject();
        if (this.pageType === 'new' || this.pageType === 'draft') {
            factorLimit.status = statusCode.New;
        }
        this.sendFDToServer(factorLimit);
    }
    //function to get value from form
    getFDObject() {
        let WOFacilityData = this.foFacilityLimittable.getValue();
        console.log("data of masterLimit", JSON.stringify(WOFacilityData))
        
        let factorLimit = new FactorLimit(WOFacilityData);
        console.log("data of masterLimit", JSON.stringify(factorLimit))

        return factorLimit;
    }

    /**
     * @author: Madhu
     * @argument:none
     * @description:For Navigation
     */
    sendFDToServer(factorLimit: FactorLimit) {

        if (factorLimit.term) {
            factorLimit.term = parseInt("" + factorLimit.term);
        }

        if (factorLimit.creditLimit) {
            factorLimit.creditLimit = parseInt("" + factorLimit.creditLimit);
        }
        if (factorLimit.advPayment) {
            factorLimit.advPayment = parseInt("" + factorLimit.advPayment);
        }
        if (factorLimit.interestRate) {
            factorLimit.interestRate = parseInt("" + factorLimit.interestRate);
        } if (factorLimit.penaltyCharge) {
            factorLimit.penaltyCharge = parseInt("" + factorLimit.penaltyCharge);
        }
        if (factorLimit.serviceCharge) {
            factorLimit.serviceCharge = parseInt("" + factorLimit.serviceCharge);
        }
        if (factorLimit.creditPeriod) {
            factorLimit.creditPeriod = parseInt("" + factorLimit.creditPeriod);
        } if (factorLimit.gracePeriod) {
            factorLimit.gracePeriod = parseInt("" + factorLimit.gracePeriod);
        }
        if (factorLimit.loanAccNo) {
            factorLimit.loanAccNo = parseInt("" + factorLimit.loanAccNo);
        }

        if (factorLimit.id && factorLimit.id !== "") {
            this._woFaclityService.updateWOFacility(factorLimit).then(() => {
                this.router.navigateByUrl('/WOLimitFacilityDefinition');
            });

        } else {
            this._woFaclityService.addWOFacility(factorLimit).then(() => {
                this.router.navigateByUrl('/WOLimitFacilityDefinition');
            });
        }


    }

   
}
