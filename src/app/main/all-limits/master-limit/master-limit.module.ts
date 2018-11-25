
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
import { AuthGuard } from 'app/services/authguard';
import { FacilityDefinitionModule } from '../../facility-definition/facility-definition.module';
import { MasterFormComponent } from './master-form/master-form.component';
import { MasterLimitService } from "./master-limit.service";
import { MasterTableComponent } from './master-table/master-table.component';


const routes = [
  {
      path     : 'compositeLimit',
      component: MasterTableComponent,
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      resolve  : {
        data: MasterLimitService,
    }
  },
{
  path     : 'compositeLimit/:id',
  component: MasterFormComponent,
  canActivate:[AuthGuard],
  canActivateChild:[AuthGuard],
  resolve  : {
      data: MasterLimitService,
  },
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
    MasterLimitService
],
  
  declarations: [MasterFormComponent, MasterTableComponent],
})
export class MasterLimitModule { }
