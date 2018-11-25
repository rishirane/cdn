import { NgModule } from '@angular/core';
import {  Routes, RouterModule } from '@angular/router';

import {
    MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule,
    MatTableModule, MatTabsModule,MatCheckboxModule,MatMenuModule,MatToolbarModule,MatDatepickerModule, MatRadioModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule,FuseConfirmDialogModule } from '@fuse/components';

import { ChallansComponent } from './challans/challans.component';

import { ChallanComponent } from './challan/challan.component';


import { TranslateModule } from '@ngx-translate/core';

import { TableListModule } from '@custom/modules/tablelist.module'

import { ChallanService } from './challan.service';

import { ChildListModule } from '@custom/modules/childlist.module';


import { ChallanPOComponent } from './challan/product/product.component';


// import { ContactsComponent } from 'app/main/demo/contacts/contacts.component';
// import { ContactsService } from 'app/main/demo/contacts/contacts.service';
// import { ContactsContactListComponent } from 'app/main/demo/contacts/contact-list/contact-list.component';
// import { ContactsSelectedBarComponent } from 'app/main/demo/contacts/selected-bar/selected-bar.component';
// import { ContactsContactFormDialogComponent } from 'app/main/demo/contacts/contact-form/contact-form.component';


import {BaseConfigModule}from '@custom/modules/base.module'

import { AuthGuard } from 'app/services/authguard';


const routes: Routes = [
    {
        path     : 'challans',
        component: ChallansComponent,
        resolve  : {
            data: ChallanService
            // contacts: ContactsService
        },
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path     : 'challans/:id',
        component: ChallanComponent,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        resolve  : {
            data: ChallanService,
            // contacts: ContactsService
        }
    },
    {
        path     : 'challans/:id/:handle',
        component: ChallanComponent,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        resolve  : {
            data: ChallanService,
            // contacts: ContactsService
        }
    },
    // {
    //     path     : 'contacts',
    //     component: ContactsComponent,
    //     resolve  : {
    //         contacts: ContactsService
    //     }
    // }
    
];

@NgModule({
    declarations: [
        ChallansComponent,
        ChallanComponent,
        ChallanPOComponent        
        
        // ContactsComponent,
        // ContactsContactListComponent,
        // ContactsSelectedBarComponent,
        // ContactsContactFormDialogComponent
      
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

        MatCheckboxModule,
        MatDatepickerModule,
        MatRippleModule,
        MatTableModule,
        MatRadioModule,

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
        BaseConfigModule
    ],
    providers   : [
        ChallanService
    ],
    entryComponents: [
        // ContactsContactFormDialogComponent
        ChallanPOComponent
    ]
})
export class ChallansModule
{
}
