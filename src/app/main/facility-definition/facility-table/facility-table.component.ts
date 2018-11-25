import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { FactorLimit } from '../work-order-limit/work-order-limit.model';
import { FacilityDefinitionService } from '../../facility-definition/facility-definition.service';
@Component({
    selector: 'app-facility-table',
    templateUrl: './facility-table.component.html',
    styleUrls: ['./facility-table.component.scss']
})
export class FacilityTableComponent implements OnInit {

    actButtons: ActionButton[];
    columns: ColumnConfig[];
    tableConfig: TableConfig;
    woLimit: FactorLimit[];

    //Default constructor
    constructor(public _woLimitFacilityService: FacilityDefinitionService) {

        this.actButtons=[{
            btnName:"Delete",
            btnIcon: "delete",
            btnIconSizeClass: "s-16",
            btnIconColorClass: "red-300",
            btnActionType: ActionType.USEURL,
            btnAction:Actions.DELETE,
            url :"/WOLimitFacilityDefinition"
        },{
            btnName:"Issue",
            btnIcon: "check_circle_outline",
            btnIconSizeClass: "s-16",
            btnIconColorClass: "purple-300",
            btnActionType: ActionType.USEURL,
            btnAction: Actions.AUTHORIZE,
            url: "/WOLimitFacilityDefinition"
        },{
            btnName:"Reject",
            btnIcon: "cancel",
            btnIconSizeClass: "s-16",
            btnIconColorClass: "red-300",
            btnActionType: ActionType.USEURL,
            btnAction: Actions.REJECT,
            url: "/WOLimitFacilityDefinition"
        }]
        
       this. columns =[
        {
            colDef :'loanAccNo',
            colName : 'LoanAccNo',
            colValue : 'loanAccNo',
            toDisplay : true
        },
        {
            colDef :'supplierName',
            colName : 'Supplier',
            colValue : 'supplierName',
            toDisplay : true,
        },
        {
            colDef :'creditLimit',
            colName : 'Credit Limit',
            colValue : 'creditLimit',
            toDisplay : true,
            
        },
        {
            colDef :'status',
            colName : 'Status',
            colValue : 'status',
            toDisplay : true,
            colType : 'status'
        },
        {
            colDef :'action',
            colName : 'Action',
            colValue : 'action',
            toDisplay : true,
            isRowButtons: true,
            actionButtons: this.actButtons
        }
        ];
        
       this. tableConfig = {
            expectedColoumns :  this.columns,
            addNewClickUrl : '/WOLimitFacilityDefinition/new',
            rowClickUrl : '/WOLimitFacilityDefinition/',
            addNewClickName : 'Add',
            topHeadName:'Facility Definition',
            isTopHeadRequired:true,
        }

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.woLimit = this._woLimitFacilityService.onDataChanged.getValue();
        console.log("value in debtor", this.woLimit)
    }


}
