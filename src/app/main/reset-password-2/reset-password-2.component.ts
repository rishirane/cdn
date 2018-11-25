import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response, Http, Headers } from '@angular/http';
import { config } from "config";
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
    selector: 'reset-password-2',
    templateUrl: './reset-password-2.component.html',
    styleUrls: ['./reset-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPassword2Component implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    changePasswordForm: FormGroup;
    url = config.url;
    port = "8000";
    username: string;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    isChangePass: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private http: Http,
        private routerData: ActivatedRoute,
        private router: Router,
        private _matSnackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.routerData.queryParams.subscribe((params: Params) => {
            this.username = params['username'];
            if (!this.username) {
                this.isChangePass = true;
                this.username = localStorage.getItem("username");
            }
        });


        this.resetPasswordForm = this._formBuilder.group({
            // name           : ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
        });

        this.changePasswordForm = this._formBuilder.group({
            // name           : ['', Validators.required],
            oldPassword: ['', [Validators.required]],
            newPassword: ['', Validators.required],
            confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'confirmPassword' field
        // when the 'password' field changes
        this.resetPasswordForm.get('newPassword').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('confirmPassword').updateValueAndValidity();
            });
    }

    openSnackBar(data) {
        this._matSnackBar.open(data, 'Close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    changePassword(data){
        data.appName = config.appName;
        data.username = this.username;
        console.log("data", data);
        this.http.put(this.url + ":" + this.port + "/login", data)
            .map(
                (response) => response.json()
            )
            .catch((err) => {
                console.log("Failed to change password => ", err);
                this.openSnackBar("Could not change password");
                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                console.log("Password changed Successfully => => ", res);
                this.openSnackBar("Password changed Successfully!!");
                this.router.navigate(["/auth/login"]);
            })
    }

    resetPassword(data) {

        data.appName = config.appName;
        data.username = this.username;
        console.log("data", data);
        this.http.put(this.url + ":" + this.port + "/login/forgotPassword", data)
            .map(
                (response) => response.json()
            )
            .catch((err) => {
                console.log("Failed to change password => ", err);
                this.openSnackBar("Could not change password");
                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                console.log("Successfully changed password => => ", res);
                this.openSnackBar("Password changed Successfully!!");
                this.router.navigate(["/auth/login"]);
                // var body = res["body"];
                // localStorage.setItem("token", body["token"].userToken)
                // this.openSnackBar("Login Successfully!!");
                // this.getSessionData();
                // localStorage.setItem("currentUser", body["token"].firstName);
                // localStorage.setItem("username", body["token"].username);
                // localStorage.setItem("role", body["token"].role);
                // if (body["token"].profile == 'true' && body["token"].role == 'donor') {
                //     console.log(" Login is successful");
                // this.router.navigate(["/purchaseorders"]);
                //     this.loginForm.reset();

                // }
                // if (body["token"].profile == 'true' && body["token"].role == 'crm') {
                //     console.log(" Login is successful");
                //     this.router.navigate(["/projects/project/publishproject"]);
                //     this.loginForm.reset();

                // } if (body["token"].profile == 'true' && body["token"].role != 'donor' && body["token"].role != 'crm') {
                //     console.log(" Login is successful");
                //     this.router.navigate(["/projects/project/viewallproject"]);
                //     this.loginForm.reset();

                // } else {
                //     console.log(" Login is unsuccessful");

                // }

            })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const newPassword = control.parent.get('newPassword');
    const confirmPassword = control.parent.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
        return null;
    }

    if (confirmPassword.value === '') {
        return null;
    }

    if (newPassword.value === confirmPassword.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
