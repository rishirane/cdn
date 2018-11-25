import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from 'config';
import { Invoice } from '../Invoice/Invoice/invoice/invoice.model';
import { LoginService } from 'app/main/login/logindetails.service';

const baseUrl:string=config.url+":"+config.port+'/invoice';

@Injectable()
export class FundRequisitionService extends TableDataProviderService
{
    routeParams: any;
    // onDataChanged: BehaviorSubject<any>;
    tableData : Invoice[];
    fundReqData: any;

    
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient: HttpClient, _loginService: LoginService)
    {
        super(_httpClient,_loginService);
    }


    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        if(route.routeConfig.path==="fundReqFactoring"){
           
            return new Promise((resolve, reject) => {

                Promise.all([
                    this.getFundReq(),
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                );
            });
        }
    }    

    getFundReq(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            {
                this._httpClient.get(config.url+":"+config.port+'/fundRequisition/data')
                .subscribe((response: any) => {
                    this.onDataChanged.next(response);
                    resolve(response);
                }, reject);
            }
        });
    }

}