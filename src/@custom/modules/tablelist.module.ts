import { NgModule, ModuleWithProviders } from "@angular/core";
import { TableListComponent, DialogOverviewExampleDialog } from "../components/tablelist/tablelist.component";
import {
    MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule,
    MatTableModule, MatTabsModule,MatCheckboxModule,MatMenuModule,MatToolbarModule,MatDatepickerModule,
    MatDialogModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule,FuseConfirmDialogModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import {  Routes,RouterModule } from '@angular/router';
import { SCMCurrency } from "@custom/transform/currency.pipe";
import { BaseConfigModule } from "./base.module";
import { SearchModule } from "app/main/search/search.module";


@NgModule({
    declarations: [
       
        TableListComponent,
        DialogOverviewExampleDialog
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

        MatCheckboxModule,
        MatDatepickerModule,
        MatRippleModule,
        MatTableModule,

        MatDialogModule,

        BaseConfigModule,
        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        FuseSidebarModule,
        FuseConfirmDialogModule,

        SearchModule
    ],
    providers   : [
        SCMCurrency
    ],
    exports: [
        TableListComponent,
        DialogOverviewExampleDialog
    ],
    entryComponents: [
        // ContactsContactFormDialogComponent
        DialogOverviewExampleDialog
    ]
    
})

export class TableListModule
{

}