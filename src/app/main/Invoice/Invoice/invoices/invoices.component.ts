// import { Component, OnInit } from '@angular/core';
// import { fuseAnimations } from '@fuse/animations';


import { Component, OnInit } from '@angular/core';


import { fuseAnimations } from '@fuse/animations';
import { TableConfig, ColumnConfig, ActionButton, ActionType,Actions } from '@custom/config/tablelist.config';
import { Invoice } from '../invoice/invoice.model';
import { InvoiceService } from '../invoice.service';
import { LoginService } from 'app/main/login/logindetails.service';
import { ORGTYPE, statusBtn } from 'config';
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector: 'invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss'],
    animations: fuseAnimations
})
export class InvoicesComponent implements OnInit {

    navigationSubscription;
  
    actButtons: ActionButton[];
    columns : ColumnConfig[];



    tableConfig : TableConfig;
    invoices:Invoice[];
    constructor(public __invoiceService:InvoiceService, _loginService: LoginService, public _router: Router)
    {
    
        let loginData=_loginService.getloginDetails();
        if(loginData.orgType===ORGTYPE.MANUFACTURER){
            this.actButtons=[{
                btnName:statusBtn.Approved,
                btnIcon: "check_circle_outline",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.ACCEPTED,
                url: "/invoice"
            },{
                btnName:statusBtn.Reject,
                btnIcon: "cancel",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.RECDREJECT,
                statusActionSuffix:' By Manufacturer',
                url: "/invoice"
            }]
        }else{
            this.actButtons=[{
                btnName:statusBtn.Reject,
                btnIcon: "delete",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction:Actions.DELETE,
                url :"/invoice"
            },{
                btnName:statusBtn.Issue,
                btnIcon: "check_circle_outline",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.AUTHORIZE,
                url: "/invoice"
            },{
                btnName:statusBtn.Reject,
                btnIcon: "cancel",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.REJECT,
                url: "/invoice"
            }]
        }

        this.columns = [{
            colDef :'supplierName',
            colName : 'Supplier',
            colValue : 'supplierName',
            toDisplay : false
            
        },{
            colDef :'manufacturersAddress',
            colName : 'Address',
            colValue : 'manufacturersAddress',
            toDisplay : false
        },{
            colDef :'manufacturer',
            colName : 'Manufacturer',
            colValue : 'manufacturer',
            toDisplay : true
        },{
            colDef :'challanNumber',
            colName : 'Challan No',
            colValue : 'challanNumber',
            toDisplay : true
        },{
            colDef :'status',
            colName : 'Status',
            colValue : 'status',
            toDisplay : true,
            colType : 'status',
        },{
            colDef :'invoiceDate',
            colName : 'Invoice Date',
            colValue : 'invoiceDate',
            toDisplay : true,
            colType : 'date'
        },{
            colDef :'actions',
            colName : 'Actions',
            colValue: 'actions',
            toDisplay: true,
            isRowButtons: true,
            actionButtons: this.actButtons
        }];
        
    
    
    
        this.tableConfig = {
            expectedColoumns :  this.columns,
            addNewClickUrl :'/invoices/new',
            rowClickUrl : '/invoices/',
            addNewClickName : 'Add',
            topHeadName:'Invoices',
            isTopHeadRequired:true,
        };
    
    
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
    ngOnInit(): void {
        this.invoices=this.__invoiceService.onDataChanged.getValue();
    
    }

}