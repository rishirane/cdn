import { Component, OnInit } from '@angular/core';
import { TableConfig,ColumnConfig,ActionButton, ActionType, Actions } from '@custom/config/tablelist.config';
import { UserService } from "../user.service";
import { UsersList} from "./user.model";
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  actButtons : ActionButton[];
  columns : ColumnConfig[];
  tableConfig : TableConfig;
  constructor(public _userService: UserService, public _router: ActivatedRoute) { 
              let orgId=this._router.snapshot.params.orgId;
      
              
                this.actButtons=[{
                  btnName:"Accept",
                  btnIcon: "check_circle_outline",
                  btnIconSizeClass: "s-16",
                  btnIconColorClass: "green-500",
                  btnActionType: ActionType.USEURL,
                  btnAction: Actions.ACCEPTED,
                  url: "/userRegistration"
              }]
              

              this.columns= [{
                colDef: 'username',
                colName: 'User Name',
                colValue: 'firstName',
                toDisplay: true
              },
              {
                colDef: 'roleName',
                colName: 'Role',
                colValue: 'roleName',
                toDisplay: true
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
              let addurl=encodeURI('/users/new;orgId='+orgId);
              this.tableConfig = {
                expectedColoumns: this.columns,
                addNewClickUrl: '/users/new/'+orgId,
                rowClickUrl: '/users/',
                addNewClickName: 'Add New User',
                topHeadName: 'Users',
                isTopHeadRequired: true,
                removeRowClick:false
              }
  }
  usersList:UsersList[];

  ngOnInit() {
    // this.USERForm = this.createControl();

    // this.createControl();
    this.usersList = this._userService.onDataChanged.getValue();

  }

}
