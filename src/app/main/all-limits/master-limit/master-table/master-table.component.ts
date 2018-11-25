import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { masterLimit } from '../master-form/master-form.model';
import { MasterLimitService } from '../master-limit.service'
import { LoginService } from 'app/main/login/logindetails.service';
@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss'],
  animations : fuseAnimations,
})
export class MasterTableComponent implements OnInit {

    actButtons : ActionButton[];
    columns : ColumnConfig[];
    tableConfig : TableConfig;
    masterLimit:masterLimit[];

//Default constructor
constructor(public _masterLimitService:MasterLimitService,public _loginService:LoginService)
{
    this.actButtons=[{
        btnName:"Delete",
        btnIcon: "delete",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction:Actions.DELETE,
        url :"/compositeLimit"
    },{
        btnName:"Issue",
        btnIcon: "check_circle_outline",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.AUTHORIZE,
        url: "/compositeLimit"
    },{
        btnName:"Reject",
        btnIcon: "cancel",
        btnIconSizeClass: "s-16",
        btnIconColorClass: "green-600",
        btnActionType: ActionType.USEURL,
        btnAction: Actions.REJECT,
        url: "/compositeLimit"
    }]

    this.columns =[
        {
            colDef :'limitTypeName',
            colName : 'Limit Type',
            colValue : 'limitTypeName',
            toDisplay : true
        },
        {
            colDef :'supplierName',
            colName : 'Supplier',
            colValue : 'supplierName',
            toDisplay : true,
        },
        {
            colDef :'totalLimit',
            colName : 'Total Limit',
            colValue : 'totalLimit',
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
        
        this.tableConfig = {
            expectedColoumns :  this.columns,
            addNewClickUrl : '/compositeLimit/new',
            rowClickUrl : '/compositeLimit/',
            addNewClickName : 'Add',
            topHeadName:'Composite Limit',
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
    this.masterLimit=this._masterLimitService.onDataChanged.getValue();
    console.log("value in debtor",this.masterLimit)
}

}

