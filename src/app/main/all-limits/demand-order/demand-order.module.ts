
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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from "app/services/authguard";
import { FacilityDefinitionModule } from '../../facility-definition/facility-definition.module';
import { WorkOrderLimitComponent } from '../../facility-definition/work-order-limit/work-order-limit.component';
import { DemandOrderFormComponent } from './demand-order-form/demand-order-form.component';
import { ProgramSetUpComponent } from './demand-order-form/program-set-up/program-set-up.component';
import { DemandOrderTableComponent } from './demand-order-table/demand-order-table.component';
import { DemandOrderService } from "./demand-order.service";

const routes = [
  {
      path     : 'distributorFinanceLimit',
      component: DemandOrderTableComponent,
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      resolve  : {
        data: DemandOrderService,
    }
  },

{
  path     : 'distributorFinanceLimit/:id',
  component: DemandOrderFormComponent,
  canActivate:[AuthGuard],
  canActivateChild:[AuthGuard],
  resolve  : {
      data: DemandOrderService,
  },
  
  children:[
      {
          path     : 'debtorLimit/:branchId',  
          component: DemandOrderFormComponent,
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          resolve  : {
              data: DemandOrderService
          },
      }
  ]
},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    BaseConfigModule,
    MatRippleModule,
    MatTableModule,

    NgxChartsModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),

    FuseSharedModule,
    FuseWidgetModule,
    TranslateModule,
    FuseSidebarModule,
    FuseConfirmDialogModule,
    TableListModule,
    ChildListModule,
    FacilityDefinitionModule
  ],
  providers   : [
    DemandOrderService
],
  declarations: [DemandOrderFormComponent, DemandOrderTableComponent, ProgramSetUpComponent],
  entryComponents:[ProgramSetUpComponent,WorkOrderLimitComponent]
})
export class DemandOrderModule { }
