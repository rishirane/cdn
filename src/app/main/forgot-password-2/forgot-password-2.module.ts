import { NgModule } from '@angular/core';
import {  Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ForgotPassword2Component } from './forgot-password-2.component';

const routes:Routes = [
    {
        path     : 'auth/forgotPassword',
        component: ForgotPassword2Component
    }
];

@NgModule({
    declarations: [
        ForgotPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule,
    ]
})
export class ForgotPassword2Module
{
}
