
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { Injectable } from '@angular/core';

import { Challan } from './challan/challan.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';

// const baseUrl:string='api/challans';

const baseUrl:string=config.url+":"+config.port+"/challan";
@Injectable()
export class ChallanService extends TableDataProviderService
{
    tableData: Challan[];
    onDataChanged: BehaviorSubject<any>;
    
    
    routeParams: any;
    product: Challan;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient: HttpClient,_loginService:LoginService)
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
        
        if(route.routeConfig.path==="challans"){
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
        }
        else{

            return new Promise((resolve, reject) => {
    
                Promise.all([
                    this.getChallan()
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                );
            });

            
        }
        

    }

    public getTableEntries(baseUrl:string): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient.get(baseUrl+"/type?id="+this.loginData.orgId+"&type="+this.loginData.orgType)
                .subscribe((response: any) => {
                    this.tableData = response;
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveChallan(product): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl + product.id, product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addChallan(product): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateChallan(challan): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl+"?id="+challan.id, challan)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get Challan Details
     *
     * @returns {Promise<any>}
     */
    getChallan(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else
            {
                
                this._httpClient.get(baseUrl +"/" +this.routeParams.id)
                    .subscribe((response: any) => {
             
                        this.onDataChanged.next(response);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Get Manufacturers
     *
     * @param product
     * @returns {Promise<any>}
     */
    getManufacturers(supplrId): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port + '/org')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get Manufacturers
     *
     * @param product
     * @returns {Promise<any>}
     */
    // getPurchaseOrders(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get('api/purchase-orders/')
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }


    /**
     * Get Manufacturers
     *
     * @param product
     * @returns {Promise<any>}
     */
    getPurchaseOrders(id): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port+'/purchaseorder/list?supplierId='+this.loginData.orgId+'&manufacturerId='+ id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
            
        });
    }


    getUnits(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port + "/org/enum")
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getProducts(id): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/podetails/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }



}
