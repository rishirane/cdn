import { NgModule } from "@angular/core";
import { SCMCurrencyFormatterDirective } from "@custom/directives/currency.directive";
import { SCMCurrency, } from "@custom/transform/currency.pipe";
import { LoginService } from "app/main/login/logindetails.service";
import { SCMDate } from "@custom/transform/date.pipe";
import { AmountComponent } from "@custom/components/uicomponents/amount.component";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { AddressCharacterDirective } from "@custom/directives/address.directive";

@NgModule({
    declarations: [
        SCMCurrencyFormatterDirective,SCMCurrency,SCMDate,AmountComponent,AddressCharacterDirective
    ],
    imports:[
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule
    ],
    providers   : [
        LoginService
    ],
    exports: [
        SCMCurrencyFormatterDirective,SCMCurrency,SCMDate,AmountComponent,AddressCharacterDirective
    ],
})

export class BaseConfigModule
{

}