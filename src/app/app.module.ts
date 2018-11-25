import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatRadioModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { AppComponent } from './app.component';
import { FakeDbService } from './fake-db/fake-db.service';
import { fuseConfig } from './fuse-config';
import { LayoutModule } from './layout/layout.module';
import { AllLimitsModule } from "./main/all-limits/all-limits.module";
import { ChallansModule } from './main/Challan/challans.module';
import { FacilityDefinitionModule } from "./main/facility-definition/facility-definition.module";
import { ForgotPassword2Module } from "./main/forgot-password-2/forgot-password-2.module";
import { FundReqFactoringModule } from "./main/fund-req-factoring/fundrequisitionfactoring.module";
import { InvoicesModule } from './main/Invoice/Invoice/Invoices.module';
import { LoginModule } from "./main/login/login.module";
import { LoginService } from './main/login/logindetails.service';
import { OrganisationModule } from "./main/org/org.module";
import { PurchaseOrderModule } from './main/purchaseorder/purchaseorder.module';
import { ResetPassword2Module } from "./main/reset-password-2/reset-password-2.module";
import { SampleModule } from './main/sample/sample.module';
import { UserModule } from "./main/user/user.module";
import { MaterialModule } from './material';
import { AuthGuard } from './services/authguard';



const appRoutes: Routes = [
        {
            path      : '**',
            redirectTo: '/auth/login'
        },
        {
            path      : 'forgotPassword',
            redirectTo: '/auth/forgotPassword'
        },
   
];



@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        LoginService,
        AuthGuard,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        MaterialModule,
        FacilityDefinitionModule,


        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

       
        LayoutModule,
        SampleModule,
        MatInputModule,
        MatRadioModule,
        LoginModule,
        ForgotPassword2Module,


        OrganisationModule,   
        InvoicesModule,
        // InvoicesPaymentModule,
        FacilityDefinitionModule,
        PurchaseOrderModule,
        ChallansModule,
       
        ResetPassword2Module,
        UserModule,
        AllLimitsModule,
        FundReqFactoringModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
