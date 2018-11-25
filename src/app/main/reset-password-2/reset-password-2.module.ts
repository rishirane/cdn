import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/services/authguard';
import { ResetPassword2Component } from './reset-password-2.component';




const routes:Routes = [
    {
        path     : 'auth/resetPassword',
        component: ResetPassword2Component,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
    }
];

@NgModule({
    declarations: [
        ResetPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ResetPassword2Module
{
}
