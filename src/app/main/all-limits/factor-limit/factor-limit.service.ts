import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';
import { FactorLimit } from '../factor-limit/factor-form/factor-form.model';

const baseUrl: string = config.url + ":" + config.port + '/factoringLimit';
// const baseUrl:string='http://192.168.5.121:10011/factoringLimit';
@Injectable({
  providedIn: 'root'
})
export class FactorLimitService extends TableDataProviderService {

//   onDataChanged: BehaviorSubject<any>;
routeParams: any;
factorData: any;
tableData : FactorLimit[];
onDataChanged: BehaviorSubject<any>;

/**
 * Constructor
 *
 * @param {HttpClient} _httpClient
 */
constructor(_httpClient: HttpClient,_loginService:LoginService)
{
    
    // Set the defaults
    super(_httpClient,_loginService);
    this.onDataChanged=new BehaviorSubject({});
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

    if (route.routeConfig.path === "factoringLimit") {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getTableEntries(baseUrl),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    } else {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFoLimitFacility()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });


    }

}
/**
    * Get All Factor Limit Details 
    *
    * @returns {Promise<any>}
    */
public getTableEntries(baseUrl: string): Promise<any> {

    return new Promise((resolve, reject) => {
        this._httpClient.get(baseUrl)
            .subscribe((response: any) => {
                this.tableData = response;
        
                this.onDataChanged.next(this.tableData);
                resolve(response);
            }, reject);
    });
}

/**
    * Get Factor Limit Details by supplierName
    *
    * @returns {Promise<any>}
    */
   getfactorLimitDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
        if (this.routeParams.id === 'new') {
            this.onDataChanged.next(false);
            resolve(false);
        }
        else {

            this._httpClient.get(baseUrl + '/' + this.routeParams.supplierName)
                .subscribe((response: any) => {

                    this.factorData = response;
                    console.log("data get by Supplier Name", this.factorData)
                    this.onDataChanged.next(this.factorData);
                    resolve(response);
                }, reject);
        }
    });
}
 /**
         * Get Org Details
         *
         * @param none
         * @returns {Promise<any>}
         */
        getOrg(): Promise<any> {
            return new Promise((resolve, reject) => {
                this._httpClient.get('api/orgFakeDB/')
                    .subscribe((response: any) => {
                        console.log("response of org", response)
                        resolve(response);
                    }, reject);
            });
        }
/**
    * Get Factor Limit Details by Id
    *
    * @returns {Promise<any>}
    */
   getFoLimitFacility(): Promise<any> {
    return new Promise((resolve, reject) => {
        if (this.routeParams.id === 'new') {
            this.onDataChanged.next(false);
            resolve(false);
        }
        else {

            this._httpClient.get(baseUrl + '/' + this.routeParams.id)
                .subscribe((response: any) => {

                    this.factorData = response;
                    console.log("data get by Id", this.factorData)
                    this.onDataChanged.next(this.factorData);
                    resolve(response);
                }, reject);
        }
    });
}

/**
   * Save Factor Limit Details
   *
   * @param foFacility
   * @returns {Promise<any>}
   */
  updateFOFacility(foFacility): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.put(baseUrl + "?id=" + foFacility.id, foFacility)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });
}

/**
 * Add Factor Limit Details
 *
 * @param foFacility
 * @returns {Promise<any>}
 */
addFOFacility(foFacility): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(baseUrl, foFacility)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });
}



}

