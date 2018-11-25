import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FactorLimit } from './demand-order-form/demand-order.model';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';

const baseUrl: string = config.url + ":" + config.port + '/distributorFinanceLimit';
// const baseUrl:string='http://192.168.5.191:10012/workOrderLimit?supplierName=MRF';
@Injectable({
    providedIn: 'root'
})
export class DemandOrderService extends TableDataProviderService {
    //   onDataChanged: BehaviorSubject<any>;
    routeParams: any;
    doData: any;
    tableData: FactorLimit[];
    onDataChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient: HttpClient, _loginService: LoginService) {

        // Set the defaults
        super(_httpClient, _loginService);
        this.onDataChanged = new BehaviorSubject({});
    }


    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        if (route.routeConfig.path === "distributorFinanceLimit") {

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
        * Get All Distributor Finance  Limit Details 
        *
        * @returns {Promise<any>}
        */
    public getTableEntries(baseUrl: string): Promise<any> {
        console.log("BASEURL", baseUrl);
        return new Promise((resolve, reject) => {
            this._httpClient.get(baseUrl)
                .subscribe((response: any) => {
                    this.tableData = response;
                    console.log("response of tableData", this.tableData)
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    }

    /**
        * Get Distributor Finance  Limit Details by Id
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

                        this.doData = response;
                        console.log("data get by Id", this.doData)
                        this.onDataChanged.next(this.doData);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Get TermPeriod Details
     *
     * @param none
     * @returns {Promise<any>}
     */
    getTermPeriod(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get('api/termPeriods/')
              .subscribe((response: any) => {
                  console.log("response of termperiod",response)
                  resolve(response);
              }, reject);
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
       * Save Distributor Finance  Limit Details
       *
       * @param doFacility
       * @returns {Promise<any>}
       */
    updateDOFacility(doFacility): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl + "?id=" + doFacility.id, doFacility)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Distributor Finance Limit Details
     *
     * @param doFacility
     * @returns {Promise<any>}
     */
    addDOFacility(doFacility): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, doFacility)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    
}

