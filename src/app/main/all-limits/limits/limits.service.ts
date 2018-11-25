
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FactorLimit } from './wolimit/wolimit.model';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';

const baseUrl: string = config.url + ":" + config.port + '/workOrderLimit';
// const baseUrl:string='http://192.168.5.191:10012/workOrderLimit?supplierName=MRF';

@Injectable({
  providedIn: 'root'
})
export class LimitsService extends TableDataProviderService {

//   onDataChanged: BehaviorSubject<any>;
    routeParams: any;
    woData: any;
    tableData : FactorLimit[];
    onProductChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient: HttpClient,_loginService:LoginService)
    {
        
        // Set the defaults
        super(_httpClient,_loginService);
        this.onProductChanged=new BehaviorSubject({});
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
    
        if (route.routeConfig.path === "workOrderLimit") {

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
                    this.getWoLimitFacility()
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
        * Get All Work Order Limit Details 
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
        * Get Work Order Limit Details by Id
        *
        * @returns {Promise<any>}
        */
    getWoLimitFacility(): Promise<any> {


        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else {
    
                this._httpClient.get(baseUrl + '/' + this.routeParams.id)
                    .subscribe((response: any) => {
    
                        this.woData = response;
                        console.log("data get by Id", this.woData)
                        this.onDataChanged.next(this.woData);
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
       * Save Work Order Limit Details
       *
       * @param foFacility
       * @returns {Promise<any>}
       */
      updateWOFacility(woFacility): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl + "?id=" + woFacility.id, woFacility)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    
    /**
     * Add Work Order Limit Details
     *
     * @param woFacility
     * @returns {Promise<any>}
     */
    addWOFacility(woFacility): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, woFacility)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    
    
    
}

