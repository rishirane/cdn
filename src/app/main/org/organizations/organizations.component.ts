import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TableConfig, ColumnConfig, ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { Org } from '../orgform/org.model';
import { OrgService } from '../org.service';


@Component({
    selector: 'organizations-list',
    templateUrl: './organizations.component.html',
    styleUrls: ['./organizations.component.scss'],
    animations: fuseAnimations,

})
export class OrganizationsComponent implements OnInit {
    actButtons : ActionButton[];

    columns : ColumnConfig[];

    tableConfig : TableConfig;
    Organizations: Org[];

    constructor(public _orgservice: OrgService) {
        this.actButtons=[{
            btnName:"Accept",
            btnIcon: "check_circle_outline",
            btnIconSizeClass: "s-16",
            btnIconColorClass: "green-600",
            btnActionType: ActionType.USEURL,
            btnAction: Actions.ACCEPTED,
            url: "/org"
        },{
            btnName:"Reject",
            btnIcon: "cancel",
            btnIconSizeClass: "s-16",
            btnIconColorClass: "green-600",
            btnActionType: ActionType.USEURL,
            btnAction: Actions.RECDREJECT,
            url: "/org"
        },{
            btnName:"Users",
            btnIcon: "person",
            btnIconSizeClass: "s-16",
            btnIconColorClass: "green-600",
            btnActionType: ActionType.USEURL,
            btnAction: Actions.GOTOPAGE,
            url: "/users"
        }]
       this.columns=[
            {
                colDef: 'contactName',
                colName: 'Created By',
                colValue: 'contactName',
                toDisplay: true
            }, 
            {
                colDef: 'entityTypeName',
                colName: 'Entity Type',
                colValue: 'entityTypeName',
                toDisplay: true
    
            },
            {
                colDef: 'orgName',
                colName: 'Organization Name',
                colValue: 'orgName',
                toDisplay: true
    
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
            }

        ];
    
        this.tableConfig = {
            expectedColoumns: this.columns,
            addNewClickUrl: '/org/new',
            rowClickUrl: '/org/',
            addNewClickName: 'Add',
            topHeadName: 'Organization',
            isTopHeadRequired: true,
        }
    
    

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let organizations = this._orgservice.onDataChanged.getValue();
        let orgArr = [];
        for (let x in organizations) {
            orgArr.push(new Org(organizations[x]));
        }
        this.Organizations = orgArr;
    }

}
