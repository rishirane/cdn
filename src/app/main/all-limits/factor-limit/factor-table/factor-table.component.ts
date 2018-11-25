import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { FactorLimit } from '../../factor-limit/factor-form/factor-form.model';
import { FactorLimitService } from '../factor-limit.service';
@Component({
  selector: 'app-factor-table',
  templateUrl: './factor-table.component.html',
  styleUrls: ['./factor-table.component.scss']
})
export class FactorTableComponent implements OnInit {
    actButtons : ActionButton[];
    columns : ColumnConfig[];
    tableConfig : TableConfig;
    foLimit:FactorLimit[];
//Default constructor
constructor(public _foLimitService:FactorLimitService)
{
    this.actButtons=[{
        btnName:"Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction:Actions.DELETE,
        url :"/factoringLimit"
    },{
        btnName:"Issue",
        btnIcon: "check_circle_outline",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.AUTHORIZE,
        url: "/factoringLimit"
    },{
        btnName:"Reject",
        btnIcon: "cancel",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.REJECT,
        url: "/factoringLimit"
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
    
   this. tableConfig  = {
        expectedColoumns :  this.columns,
        addNewClickUrl : '/factoringLimit/new',
        rowClickUrl : '/factoringLimit/',
        addNewClickName : 'Add',
        topHeadName:'Factor Limit',
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
    this.foLimit=this._foLimitService.onDataChanged.getValue();
    console.log("value in debtor",this.foLimit)
}

}