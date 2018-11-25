
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TableListModule } from '@custom/modules/tablelist.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/services/authguard';
import { MaterialModule } from "../../material";
import { ActiveUserComponent, DialogOverviewExampleDialog } from './active-user/active-user.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';
import { UserService } from "./user.service";
import { UserformComponent } from './userform/userform.component';
import { UserComponent } from './userList/user.component';


const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    resolve: {
      data: UserService,
    }
  },
  {
    path: 'users/:id/:orgId',
    component: UserformComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    resolve: {
      data: UserService,
    },
   
  },
  {
    path: 'users/:id',
    component: UserformComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    resolve: {
      data: UserService,
    },
    
  },
  {
    path: 'activeUsers/:username',
    component: ActiveUserComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    resolve: {
      data: UserService,
    },
    
  },
  {
    path: 'notification',
    component: UserNotificationComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    runGuardsAndResolvers: 'always',
    resolve: {
      data: UserService,
    },
    
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FuseSharedModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
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
    FuseConfirmDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRippleModule,
    MatTableModule,
    TableListModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog
],
  declarations: [UserComponent, UserformComponent, ActiveUserComponent,DialogOverviewExampleDialog, UserNotificationComponent]
 
})
export class UserModule { }
