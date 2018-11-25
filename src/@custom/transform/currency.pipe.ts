
import { Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LoginService } from 'app/main/login/logindetails.service';

@Pipe({name: 'SCM_Currency'})
export class SCMCurrency extends CurrencyPipe {

  loginData:any;
  constructor(public _loginService:LoginService)  {
      super('en');
  }

  transform(value: any): any {
    value=value.toString();
    this.loginData=this._loginService.getloginDetails();
    let isNegative = false;
    if(value.startsWith("-")){
      isNegative=true;
    }
    let doublenumber = Number(value.replace(/[^0-9\.]+/g,""));
    
    let returnVal= super.transform(doublenumber,this.loginData.currency,"symbol","1."+this.loginData.decimalAllowed+"-"+this.loginData.decimalAllowed,this.loginData.locale);

    let currencyDigits= (isNegative ? "-" : "") +returnVal.toString().replace(/[^0-9\.]+/g,"");

    
    return Number(currencyDigits);
  }


  parse(value): number {

    this.loginData=this._loginService.getloginDetails();
    
    let doublenumber = Number(value.toString().replace(/[^0-9\.]+/g,""));

    return doublenumber;
  }
}