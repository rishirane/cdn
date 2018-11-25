import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { BaseConfigModule } from '@custom/modules/base.module';
import { ChildListModule } from '@custom/modules/childlist.module';
import { TableListModule } from '@custom/modules/tablelist.module';
import { SCMCurrency } from '@custom/transform/currency.pipe';
import { SCMDate } from '@custom/transform/date.pipe';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from 'app/services/authguard';
import { InvoiceService } from './invoice.service';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductComponentInvoice } from './invoice/product/product.component';
import { InvoicesComponent } from './invoices/invoices.component';







const routes: Routes = [
    {
            path     : 'invoices',
            component: InvoicesComponent,
            canActivate:[AuthGuard],
            canActivateChild:[AuthGuard],
            resolve  : {
                data: InvoiceService,
            },
            runGuardsAndResolvers: 'always'
        },
        {
            path     : 'invoices/:id',
            component: InvoiceComponent,
            canActivate:[AuthGuard],
            canActivateChild:[AuthGuard],
            resolve  : {
                data: InvoiceService,
            
            },
        
        },

];

@NgModule({
    declarations: [
        InvoicesComponent,
        InvoiceComponent,
        ProductComponentInvoice
    ],
    imports     : [
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
        InvoiceService, SCMCurrency,SCMDate
    ],
    entryComponents:[ProductComponentInvoice]
})
export class InvoicesModule
{

}