import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { ChildListModule } from '@custom/modules/childlist.module';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TableListModule } from '@custom/modules/tablelist.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from 'app/services/authguard';
import { MaterialModule } from "../../material";
import { FundReqFactoring } from './fundrequisitionfactoring.component';
import { FundRequisitionService } from './fundrequisitionfactoring.service';
import { InvoiceDetailsTable } from "./table-selection/table-selection-example";






const routes :Routes= [
    {
        path     : 'fundReqFactoring',
        component: FundReqFactoring,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        resolve  : {
            data: FundRequisitionService,
        }
    }
];

@NgModule({
    declarations: [
        FundReqFactoring,InvoiceDetailsTable
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MaterialModule,
        MatCheckboxModule,  
        MatRadioModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        TableListModule,
        ChildListModule,


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



        
        // MatPaginator, 
        // MatSort, 
        // MatTableDataSource

    ],
    exports     : [
        FundReqFactoring
    ],
    providers : [
        FundRequisitionService
    ]
})

export class FundReqFactoringModule
{
}
