
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FactorLimit } from '../facility-definition/work-order-limit/work-order-limit.model';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';
const baseUrl: string = config.url + ":" + config.port + '/WOLimitFacilityDefinition';

@Injectable({
    providedIn: 'root'
})
export class FacilityDefinitionService extends TableDataProviderService {
    //   onDataChanged: BehaviorSubject<any>;
    routeParams: any;
    WOFacilityData: any;
    WODetails:any;
    tableData: FactorLimit[];
    
      private messageSource = new BehaviorSubject("default message");
      currentMessage = this.messageSource.asObservable();
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


        if (route.routeConfig.path=== "WOLimitFacilityDefinition") {

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
                    this.getWOLimitFacility()
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
        * Get All Work Order Fcaility Details 
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
        * Get Work Order Fcaility Details by Id
        *
        * @returns {Promise<any>}
        */
       getWOLimitFacility(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else {

                this._httpClient.get(baseUrl + '/' + this.routeParams.id)
                    .subscribe((response: any) => {

                        // if(response){
                        //     this.WOFacilityData =response[0];
                        // }
                        this.WOFacilityData = response;
                        this.onDataChanged.next(this.WOFacilityData);
                        resolve(response);
                    }, 
                   
                    reject
                    );
            }
        });
    }
/**
    * Get Factor Limit Details by supplierName
    *
    * @returns {Promise<any>}
    */
   WOLimitFacilityDetails(supplierId): Promise<any> {
    return new Promise((resolve, reject) => {

            this._httpClient.get(baseUrl + '/?supplierId=' +supplierId)
            // this._httpClient.get(baseUrl + '/WOLimitFacilityDefinition?supplierId=1234')
                .subscribe((response: any) => {

                    this.WODetails = response;
                    console.log("data get by Supplier Name", this.WODetails)
                    this.onDataChanged.next(this.WODetails);
                    resolve(response);
                }, reject);
        
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

  //get data from Enum
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
    getSuppliers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port+'/org')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    /**
       * Save Work Order Fcaility Details
       *
       * @param woFacility
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
     * Add Work Order Fcaility Details
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


