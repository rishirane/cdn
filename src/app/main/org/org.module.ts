import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { ChildListModule } from '@custom/modules/childlist.module';
import { TableListModule } from '@custom/modules/tablelist.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/services/authguard';
import { MaterialModule } from "../../material";
import { OrgService } from "./org.service";
import { OrganizationsComponent } from './organizations/organizations.component';
import { AddressComponent } from './orgform/address/address.component';
import { BankComponent } from './orgform/bank/bank.component';
import { CompanyComponent } from './orgform/company/company.component';
import { OrgComponent } from './orgform/org.component';
import { ShareholderComponent } from './orgform/shareholder/shareholder.component';










const routes: Routes = [
    {
        path     : 'org',
        component: OrganizationsComponent,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        resolve  : {
            data: OrgService,
        }
    },
    {
      path     : 'org/:id',
      component: OrgComponent,
      canActivate:[AuthGuard],
      canActivateChild:[AuthGuard],
      resolve  : {
          data: OrgService,
      }
  }
  ];

@NgModule({
    declarations: [
        OrgComponent,
        AddressComponent,
        OrganizationsComponent,
        CompanyComponent,
        ShareholderComponent,
        BankComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MaterialModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,

        FuseSharedModule,
        ChildListModule,
        TableListModule
    ],
    entryComponents:[AddressComponent,CompanyComponent, ShareholderComponent,BankComponent]
})
export class OrganisationModule
{
}
