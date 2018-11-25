import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { FactorLimit } from '../wolimit/wolimit.model';
import { LimitsService } from '../limits.service';

@Component({
  selector: 'app-wolimittable',
  templateUrl: './wolimittable.component.html',
  styleUrls: ['./wolimittable.component.scss'],
  animations : fuseAnimations,
})
export class WolimittableComponent implements OnInit {

    actButtons: ActionButton[];
    columns: ColumnConfig[];
    tableConfig: TableConfig;
    woLimit:FactorLimit[];
//Default constructor
constructor(public _woLimitService:LimitsService)
{
    this.actButtons=[{
        btnName:"Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction:Actions.DELETE,
        url :"/workOrderLimit"
    },{
        btnName:"Issue",
        btnIcon: "check_circle_outline",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.AUTHORIZE,
        url: "/workOrderLimit"
    },{
        btnName:"Reject",
        btnIcon: "cancel",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.REJECT,
        url: "/workOrderLimit"
    }]
   this. columns  =[
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
    },
    ];
    
    this.tableConfig  = {
        expectedColoumns :  this.columns,
        addNewClickUrl : '/workOrderLimit/new',
        rowClickUrl : '/workOrderLimit/',
        addNewClickName : 'Add',
        topHeadName:'WO Limit',
        isTopHeadRequired:true,
    }
   
}

// -----------------------------------------------------------------------------------------------------
// @ Lifecycle hooks
// -----------------------------------------------------------------------------------------------------

/**
 * On init
 */
ngOnInit(): void
{
    this.woLimit=this._woLimitService.onDataChanged.getValue();
    console.log("value in debtor",this.woLimit)
}

}