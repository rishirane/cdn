
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from 'app/main/login/logindetails.service';

@Pipe({name: 'SCM_Date'})
export class SCMDate extends DatePipe {

  loginData:any;
  constructor(public _loginService:LoginService)  {
      super('en');
  }
  transform(value: string): any {
    if(value && value!=="null"){
      this.loginData=this._loginService.getloginDetails();
      
      let returnVal= super.transform(value,this.loginData.dateformat);
      return returnVal;
    }else{
      return "";
    }
  }


//   parse(value: string): string {

//     this.loginData=this._loginService.getloginDetails();
    
//     let doublenumber = Number(value.toString().replace(/[^0-9\.]+/g,""));

//     return ""+doublenumber;
//   }
}