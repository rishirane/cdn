import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from "../../../config";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { LoginService } from 'app/main/login/logindetails.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginData: any[];
    url = config.url;
    port = config.port;
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
        private router: Router,
        private _matSnackBar: MatSnackBar,
        private _loginService:LoginService,
        private http: Http
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        localStorage.clear();
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    loginAsSupplier(){
        this._loginService.setSupplierData();
        localStorage.setItem("username", "MRF Owner");
        this.router.navigate(["/purchaseorders"]);
    }

    loginAsManufacturer(){
        this._loginService.setManufacturerData();
        localStorage.setItem("username", "Tata Owner");
        this.router.navigate(["/purchaseorders"]);
    }
    openSnackBar(data) {
        this._matSnackBar.open(data, 'Close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    login(data) {
        data.appName = config.appName;
       


        this._loginService.authenticate(data).then((data) => {
            
            if(data && data!=="FAILED"){
              
                this.router.navigate(["/org"]);
                this.loginForm.reset();
                this.openSnackBar("Login Successfully!");
            }else{
                this.openSnackBar("Login Failed!");
            }
           
        });

        // this.http.post(this.url + ":" + this.port + "/login", data)
        //     .map(
        //         (response) => response.json()
        //     )
        //     .catch((err) => {
               
        //         this.openSnackBar("Login Failed!!");
        //         return Observable.throw(err)
        //     })
        //     .subscribe((res: Response) => {
        //         console.log("result after successfull login => => ", res);
        //         var tokenData = res["tokenData"];
                
        //         if (tokenData) {
        //             //this._loginService.setloginDetails();
        //             this.router.navigate(["/org"]);
        //             this.loginForm.reset();
        //             this.openSnackBar("Login Successfully!!");
        //             localStorage.setItem("username", tokenData.username);
                    
        //         }
              

        //     })

    }

}
