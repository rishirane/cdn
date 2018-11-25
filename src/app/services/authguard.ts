import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../main/login/logindetails.service';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        console.log("childRoute",childRoute);
        return true;
        // if(this._loginService.isLoggednIn()){
        //     return true;
        // }else{
        //     this.myRoute.navigate(["login"]);
        //     return false;
        // }
    }

    constructor(private _loginService: LoginService, private myRoute: Router){
        
    }  
    canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        console.log("this._loginService.isLoggednIn()",this.myRoute);

        if(this._loginService.isLoggednIn()){
            return true;
        }else{
            this.myRoute.navigate(["login"]);
            return false;
        }
    }


     // This method is called once and a list of permissions is stored in the permissions property
     initializePermissions() {
       
     }
}