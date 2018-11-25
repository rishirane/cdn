import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { PurchaseOrder } from '../poform/poform.model';
import { PurchaseOrderService } from '../purchaseorder.service';
import { LoginService } from 'app/main/login/logindetails.service';
import { ORGTYPE, statusBtn } from 'config';
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector   : 'purchaseorser-list',
    templateUrl: './purchaseorder.component.html',
    styleUrls  : ['./purchaseorder.component.scss'],
    animations : fuseAnimations,

})
export class PurchaseOrderComponent implements OnInit
{

    actButtons : ActionButton[];

    columns : ColumnConfig[];

    tableConfig : TableConfig;
    purchaseOrders:PurchaseOrder[];

    navigationSubscription;

    //Default constructor
    constructor(public _purchaseOrderService:PurchaseOrderService,public _loginService:LoginService, public _router: Router )
    {
        let loginData=_loginService.getloginDetails();
    
        if(loginData.orgType===ORGTYPE.SUPPLIER){
            this.actButtons=[{
                btnName:statusBtn.Issue,
                btnIcon: "check_circle_outline",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.ACCEPTED,
                url: "/purchaseorder"
            },{
                btnName:statusBtn.Reject,
                btnIcon: "cancel",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.RECDREJECT,
                statusActionSuffix:' By Supplier',
                url: "/purchaseorder"
            }]
        }else{
            this.actButtons=[{
                btnName:statusBtn.Delete,
                btnIcon: "delete",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction:Actions.DELETE,
                url :"/purchaseorder"
            },{
                btnName:statusBtn.Approved,
                btnIcon: "check_circle_outline",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.AUTHORIZE,
                url: "/purchaseorder"
            },{
                btnName:statusBtn.Reject,
                btnIcon: "cancel",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.REJECT,
                url: "/purchaseorder"
            }]
        }
        
    
        this.columns  =[
        {
            colDef :'manufacturerName',
            colName : 'Manufacturer',
            colValue : 'manufacturerName',
            toDisplay : true
        },
        {
            colDef :'poNumber',
            colName : 'PO Number',
            colValue : 'poNumber',
            toDisplay : true,
        },
        {
            colDef :'grndTotal',
            colName : 'Grand Total',
            colValue : 'grndTotal',
            toDisplay : true,
            colType : 'amount',
        },
        // {
        //     colDef :'advPaymnt',
        //     colName : 'Advance Payment',
        //     colValue : 'advPaymnt',
        //     toDisplay : true,
        //     colType : 'amount',
        // },
        {
            colDef :'netPayable',
            colName : 'Net Payable',
            colValue : 'netPayable',
            toDisplay : true,
            colType : 'amount',
        },
        {
            colDef :'createDate',
            colName : 'Create Date',
            colValue : 'createDate',
            toDisplay : true,
            colType : 'date',
        },
    
        {
            colDef :'status',
            colName : 'Status',
            colValue : 'status',
            toDisplay : true,
            colType : 'status',
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
            addNewClickUrl : '/purchaseorders/new',
            rowClickUrl : '/purchaseorders/',
            addNewClickName : 'Add',
            topHeadName:'Purchase Orders',
            isTopHeadRequired:true,
        }

        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
              this.ngOnInit();
            }
          });        

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.purchaseOrders=this._purchaseOrderService.onDataChanged.getValue();
    }

}
