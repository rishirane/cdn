
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { BaseConfigModule } from '@custom/modules/base.module';
import { ChildListModule } from '@custom/modules/childlist.module';
import { TableListModule } from '@custom/modules/tablelist.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from 'app/services/authguard';
import { FacilityDefinitionService } from "../facility-definition/facility-definition.service";
import { FacilityHeaderComponent } from './facility-header/facility-header.component';
import { FacilityTableComponent } from './facility-table/facility-table.component';
import { WorkOrderLimitComponent } from './work-order-limit/work-order-limit.component';


const routes :Routes= [
  {
    path     : 'WOLimitFacilityDefinition',
    component: FacilityTableComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    resolve  : {
      data: FacilityDefinitionService,
  }
},
  {
      path     : 'WOLimitFacilityDefinition/:id',
      component: FacilityHeaderComponent,
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      resolve  : {
        data: FacilityDefinitionService,
    },
    children:[
      {
          path     : 'debtor/:id',  
          component: WorkOrderLimitComponent,
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          resolve  : {
              data: FacilityDefinitionService
          },
      }
  ]
  }
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
    ChildListModule
  
  ],
  providers   : [
    FacilityDefinitionService
],
  declarations: [WorkOrderLimitComponent, FacilityTableComponent, FacilityHeaderComponent],
  exports: [WorkOrderLimitComponent]
})
export class FacilityDefinitionModule { }
