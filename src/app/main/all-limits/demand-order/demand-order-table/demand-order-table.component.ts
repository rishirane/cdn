import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { FactorLimit } from '../demand-order-form/demand-order.model';
import { DemandOrderService } from '../demand-order.service'
@Component({
  selector: 'app-demand-order-table',
  templateUrl: './demand-order-table.component.html',
  styleUrls: ['./demand-order-table.component.scss']
})
export class DemandOrderTableComponent implements OnInit {
    actButtons : ActionButton[];
    columns : ColumnConfig[];
    tableConfig : TableConfig;
    doLimit:FactorLimit[];
//Default constructor
constructor(public _demandOrderService:DemandOrderService)
{
    this.actButtons=[{
        btnName:"Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction:Actions.DELETE,
        url :"/distributorFinanceLimit"
    },{
        btnName:"Issue",
        btnIcon: "check_circle_outline",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.AUTHORIZE,
        url: "/distributorFinanceLimit"
    },{
        btnName:"Reject",
        btnIcon: "cancel",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.REJECT,
        url: "/distributorFinanceLimit"
    }]

    this.columns  =[
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
        addNewClickUrl : '/distributorFinanceLimit/new',
        rowClickUrl : '/distributorFinanceLimit/',
        addNewClickName : 'Add',
        topHeadName:'Demand Order Limit',
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
    this.doLimit=this._demandOrderService.onDataChanged.getValue();
    console.log("value in debtor",this.doLimit)
}

}
