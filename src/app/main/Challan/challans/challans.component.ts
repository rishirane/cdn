// import { Component, OnInit } from '@angular/core';
// import { fuseAnimations } from '@fuse/animations';

import { Component, OnInit } from '@angular/core';


import { fuseAnimations } from '@fuse/animations';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';


import { ChallanService } from '../challan.service'

import { Challan } from '../challan/challan.model';
import { LoginService } from 'app/main/login/logindetails.service';
import { Router , NavigationEnd} from '@angular/router';
import { ORGTYPE, statusBtn } from 'config';

@Component({
    selector   : 'challans-main',
    templateUrl: './challans.component.html',
    styleUrls  : ['./challans.component.scss'],
    animations : fuseAnimations
})
export class ChallansComponent implements OnInit
{
    actButtons : ActionButton[];

    columns : ColumnConfig[];

    tableConfig : TableConfig;
   
    navigationSubscription;     

   
    challans: Challan[];

    constructor(public __challanService:ChallanService, _loginService: LoginService, public _router: Router)
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
                url: "/challan"
            },{
                btnName:statusBtn.Reject,
                btnIcon: "cancel",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.RECDREJECT,
                statusActionSuffix:' By Manufacturer',
                url: "/challan"
            }]
        }else{
            this.actButtons=[{
                btnName:statusBtn.Delete,
                btnIcon: "delete",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction:Actions.DELETE,
                url :"/challan"
            },{
                btnName:statusBtn.Issue,
                btnIcon: "check_circle_outline",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.AUTHORIZE,
                url: "/challan"
            },{
                btnName:statusBtn.Reject,
                btnIcon: "cancel",
                btnIconSizeClass: "s-16",
                btnIconColorClass: "green-600",
                btnActionType: ActionType.USEURL,
                btnAction: Actions.REJECT,
                url: "/challan"
            }]
        }
        
    
        this.columns = [{
            colDef :'supplier',
            colName : 'Supplier',
            colValue : 'supplier',
            toDisplay : false
        },{
            colDef :'manufacturersAddress',
            colName : 'Address',
            colValue : 'manufacturersAddress',
            toDisplay : false
        },{
            colDef :'challanDate',
            colName : 'Challan Date',
            colValue : 'challanDate',
            colType:'date',
            toDisplay : true
        },{
            colDef :'challanNumber',
            colName : 'Challan No',
            colValue : 'challanNumber',
            toDisplay : true
        },{
            colDef :'preparedBy',
            colName : 'Prepared By',
            colValue : 'preparedBy',
            toDisplay : true
        },{
            colDef :'status',
            colName : 'Status',
            colValue : 'status',
            toDisplay : true,
            colType : 'status',
        },{
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
            addNewClickUrl :'/challans/new',
            rowClickUrl : '/challans/',
            addNewClickName : 'Add',
            topHeadName:'Challans',
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
    ngOnInit(): void
    {
        this.challans=this.__challanService.onDataChanged.getValue();      
        // this._router.routeReuseStrategy.shouldReuseRoute = function(){
        //     return false;
        // };
        // this._router.events.subscribe((evt) => {
        //     if (evt instanceof NavigationEnd) {
        //         this._router.navigated = false;
        //         window.scrollTo(0, 0);
        //     }
        // });
    }




}