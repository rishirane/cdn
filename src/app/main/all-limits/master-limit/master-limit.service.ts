import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { masterLimit } from "../master-limit/master-form/master-form.model";
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';

const baseUrl: string = config.url + ":" + config.port + '/compositeLimit';
@Injectable({
    providedIn: 'root'
})
export class MasterLimitService extends TableDataProviderService {
    //   onDataChanged: BehaviorSubject<any>;
    routeParams: any;
    compositeData: any;
    tableData: masterLimit[];

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


        if (route.routeConfig.path === "compositeLimit") {

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
                    this.getMasterLimit()
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
        * Get All Master Limit Details 
        *
        * @returns {Promise<any>}
        */
    public getTableEntries(baseUrl: string): Promise<any> {

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
        * Get Master Limit Details by Id
        *
        * @returns {Promise<any>}
        */
    getMasterLimit(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else {

                this._httpClient.get(baseUrl + '/' + this.routeParams.id)
                    .subscribe((response: any) => {

                        this.compositeData = response;
                        console.log("data get by Id", this.compositeData)
                        this.onDataChanged.next(this.compositeData);
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
    getSuppliers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url + ":" + config.port + '/org')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
   * Get workOrder Details
   *
   * @param none
   * @returns {Promise<any>}
   */
  workOrderDetails(supplierId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url + ":" + config.port +  '/workOrderLimit?supplierId=' +supplierId)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
   * Get workOrder Details
   *
   * @param none
   * @returns {Promise<any>}
   */
  factorLimitDetails(supplierId): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(config.url + ":" + config.port +  '/factoringLimit?supplierId=' +supplierId)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });
}

    /**
     * Get Limit Type Details
     *
     * @param none
     * @returns {Promise<any>}
     */
    getMiscOrgData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port+ "/org/enum")
                .subscribe((response: any) => {
                    console.log("response of MiscOrgData",response);
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
    } "?id="
    /**
       * Save Master Limit Details
       *
       * @param masterData
       * @returns {Promise<any>}
       */
    updateMasterLimit(masterData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl + "?id=" + masterData.id, masterData)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Master Limit Details
     *
     * @param masterData
     * @returns {Promise<any>}
     */
    addMasterLimit(masterData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, masterData)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


}

