import {Injectable, OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { config } from 'config';

const baseUrl:string=config.url+ ":" + config.port + "/login"



@Injectable()
export class LoginService implements OnInit {
  
    loginData: any= {};
    token: string=null;


    manufacturerData: any={
        "username": "TATA Owner",
        "password": "12345",
        "orgName":"TATA",
        "orgId":"5bdb118cff4e447a8e4f90b6",
        "orgType":"Manufacturer",
        "deliveryAddress":[
            {"place":"Gazhiabad"},
            {"place":"Trivandrum"}
        ] ,
        "billingAddress" :[
            {"place":"Howrah"},
            {"place":"Jaipur"}
        ], 
        "date": "2018-10-23T23:00:00.000Z",
        "designation": "DyGM",
        "locale":"en",
        "currency":"BDT",
        "decimalAllowed":"2",
        "dateformat":"MM/dd/yyyy",
        "addressAllowedSpecialChars":"_@"
    };

    supplierData: any={
        "username": "MRF Owner",
        "password": "12345",
        "orgName":"MRF",
        "orgId":"5bdd76ccaf39a821eb84003f",
        "orgType":"Supplier",
        "deliveryAddress":[
            {"place":"Gazhiabad"},
            {"place":"Trivandrum"}
        ] ,
        "billingAddress" :[
            {"place":"Howrah"},
            {"place":"Jaipur"}
        ], 
        "date": "2018-10-23T23:00:00.000Z",
        "designation": "DyGM",
        "locale":"en",
        "currency":"BDT",
        "decimalAllowed":"2",
        "dateformat":"MM/dd/yyyy",
        "addressAllowedSpecialChars":"_@()"
    };

    constructor(private _httpClient: HttpClient)
    {
        
    }

  public _test:any;


  ngOnInit(): void {
     
  }
  


  authenticate(data): Promise<any> {

    return new Promise((resolve, reject) => {
        this._httpClient.post(baseUrl,data)
            .subscribe((response: any) => {
               
                if(response.tokenData){
                    
                    this.loginData=response.tokenData;
                    this.setToken( response.token);
                    resolve(response);
                }else{
                    resolve("FAILED");
                }
                

            }, reject);
    });
  }

  setManufacturerData(){
    this.setToken( "response.token");
        this.loginData=this.manufacturerData;
  }

  setSupplierData(){
        this.setToken( "response.token");
        this.loginData=this.supplierData;
  }

  getloginDetails():any {
    return this.loginData;
  }


  setToken(token: string) {

      this.token=token;
  }
  getToken() {
    return this.token;
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
}