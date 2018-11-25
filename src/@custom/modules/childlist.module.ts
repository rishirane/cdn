import { NgModule, ModuleWithProviders } from "@angular/core";
import {
    MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule,
    MatTableModule, MatTabsModule,MatCheckboxModule,MatMenuModule,MatToolbarModule,MatDatepickerModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule,FuseConfirmDialogModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import {  Routes, RouterModule } from '@angular/router';

import { ChildListComponent } from "@custom/components/childlist/childlist.component";
import { SCMCurrency } from "@custom/transform/currency.pipe";
import { BaseConfigModule } from "./base.module";


@NgModule({
    declarations: [
       
        ChildListComponent
      
    ],
    imports     : [
        RouterModule,
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
        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        FuseSidebarModule,
        FuseConfirmDialogModule
    ],
    providers   : [
        SCMCurrency
    ],
    exports: [
        ChildListComponent
    ],
    
})

export class ChildListModule
{

}