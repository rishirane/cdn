import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LimitsModule} from './limits/limits.module'
import {FactorLimitModule  } from "./factor-limit/factor-limit.module";
import { DemandOrderModule } from "./demand-order/demand-order.module";
import { MasterLimitModule } from "./master-limit/master-limit.module";

@NgModule({
  imports: [
    CommonModule,
    LimitsModule,
    FactorLimitModule,
    DemandOrderModule,
    MasterLimitModule
  ],
  declarations: []
})
export class AllLimitsModule { }
