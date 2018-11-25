import { AgmCoreModule } from '@agm/core';
import { CommonModule } from "@angular/common";
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
import { AuthGuard } from 'app/services/authguard';
import { LoginService } from '../login/logindetails.service';
import { POFormComponent } from './poform/poform.component';
import { ProductComponent } from './poform/product/product.component';
import { PurchaseOrderService } from './purchaseorder.service';
import { PurchaseOrderComponent } from './purchaseorder/purchaseorder.component';

const routes: Routes = [
    {
        path     : 'purchaseorders',
        component: PurchaseOrderComponent,
        resolve  : {
            data: PurchaseOrderService,
        },
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path     : 'purchaseorders/:id',
        component: POFormComponent,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        resolve  : {
            data: PurchaseOrderService,
        },
        children:[
            {
                path     : 'products/:id',  
                component: POFormComponent,
               
                resolve  : {
                    data: PurchaseOrderService
                },
            }
        ]
    },
    // {
    //     path     : 'purchaseordersproducts/:id',
    //     component: POFormComponent,
    //     resolve  : {
    //         data: PurchaseOrderService
    //     },
    //     children:[
    //         {
    //             path     : 'products/:id',  
    //             component: POFormComponent,
    //             resolve  : {
    //                 data: PurchaseOrderService
    //             },
    //         }
    //     ]
    // }
    
];

@NgModule({
    declarations: [
        PurchaseOrderComponent,POFormComponent,ProductComponent
    ],
    imports     : [
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
        FuseConfirmDialogModule
    ],
    providers   : [
        PurchaseOrderService,
        LoginService,
        SCMCurrency,
        SCMDate
    ],
    entryComponents:[ProductComponent]
    
})
export class PurchaseOrderModule
{
}
