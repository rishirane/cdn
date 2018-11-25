import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, Http, Headers } from '@angular/http';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { config } from "config";
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
    selector     : 'forgot-password-2',
    templateUrl  : './forgot-password-2.component.html',
    styleUrls    : ['./forgot-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPassword2Component implements OnInit
{
    forgotPasswordForm: FormGroup;
    url = config.url;
    port = "8000";
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private routerData: ActivatedRoute,
        private router: Router,
        private http: Http,
        private _matSnackBar: MatSnackBar
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    openSnackBar(data) {
        this._matSnackBar.open(data, 'Close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    forgotPassword(data)
    {
        data.appName = config.appName;
        data.url = config.url;
        console.log("data",data);
        this.http.post(this.url + ":" + this.port + "/login/forgotPassword", data)
            .map(
                (response) => response.json()
            )
            .catch((err) => {
                console.log("Failed in process of login => ", err);
                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                console.log("result after successfull login => => ", res);
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
}
