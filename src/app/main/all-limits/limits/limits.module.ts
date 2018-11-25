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
import { AuthGuard } from 'app/services/authguard';
// import { FacilityDefinitionModule } from '../facility-definition/facility-definition.module';
import { FacilityDefinitionModule } from '../../facility-definition/facility-definition.module';
import { WorkOrderLimitComponent } from '../../facility-definition/work-order-limit/work-order-limit.component';
import { LimitsService } from "./limits.service";
import { DebtorLimitComponent } from './wolimit/debtor-limit/debtor-limit.component';
import { WOLimitComponent } from './wolimit/wolimit.component';
import { WolimittableComponent } from './wolimittable/wolimittable.component';


const routes = [
  {
      path     : 'workOrderLimit',
      component: WolimittableComponent,
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      resolve  : {
        data: LimitsService,
    }
  },
{
  path     : 'workOrderLimit/:id',
  component: WOLimitComponent,
  canActivate:[AuthGuard],
  canActivateChild:[AuthGuard],
  resolve  : {
      data: LimitsService,
  },
  
  children:[
      {
          path     : 'debtorLimit/:id',  
          component: WOLimitComponent,
          canActivate:[AuthGuard],
          canActivateChild:[AuthGuard],
          resolve  : {
              data: LimitsService
          },
      }
  ]
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
    LimitsService
],
    
    declarations: [WOLimitComponent, WolimittableComponent, DebtorLimitComponent],
  entryComponents:[DebtorLimitComponent,WorkOrderLimitComponent]
})
export class LimitsModule { }
