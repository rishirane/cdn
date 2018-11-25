
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BaseConfigModule } from '@custom/modules/base.module';
import { ChildListModule } from '@custom/modules/childlist.module';
import { TableListModule } from '@custom/modules/tablelist.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from "app/services/authguard";
// import { FacilityDefinitionModule } from '../facility-definition/facility-definition.module';
import { FacilityDefinitionModule } from '../../facility-definition/facility-definition.module';
import { WorkOrderLimitComponent } from '../../facility-definition/work-order-limit/work-order-limit.component';
import { FactorFormComponent } from './factor-form/factor-form.component';
import { SalesLedgerLimitComponent } from './factor-form/sales-ledger-limit/sales-ledger-limit.component';
import { FactorLimitService } from "./factor-limit.service";
import { FactorTableComponent } from './factor-table/factor-table.component';

const routes = [
  {
      path     : 'factoringLimit',
      component: FactorTableComponent,
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      resolve  : {
        data: FactorLimitService,
    }
  },

{
  path     : 'factoringLimit/:id',
  component: FactorFormComponent,
  canActivate:[AuthGuard],
  canActivateChild:[AuthGuard],
  resolve  : {
      data: FactorLimitService,
  },
  
  // children:[
  //     {
  //         path     : 'debtorLimit/:branchId',  
  //         component: FactorFormComponent,
  //         resolve  : {
  //             data: FactorLimitService
  //         },
  //     }
  // ]
},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatMenuModule,
        MatToolbarModule,
        MatDatepickerModule,

        MatCheckboxModule,
        MatDatepickerModule,

        TableListModule,
        BaseConfigModule,
        ChildListModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        FuseSidebarModule,
        FuseConfirmDialogModule,
        FacilityDefinitionModule
    
    
  ],
  providers   : [
    FactorLimitService
],
 
  declarations: [FactorFormComponent, FactorTableComponent, SalesLedgerLimitComponent],
  entryComponents:[SalesLedgerLimitComponent,WorkOrderLimitComponent]
})
export class FactorLimitModule { }
