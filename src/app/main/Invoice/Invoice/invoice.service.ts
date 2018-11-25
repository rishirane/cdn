import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from './invoice/invoice.model';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';

const baseUrl:string=config.url+":"+config.port+'/invoice';

@Injectable()
export class InvoiceService extends TableDataProviderService
{
    routeParams: any;
    // onDataChanged: BehaviorSubject<any>;
    tableData : Invoice[];

    
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient: HttpClient,_loginService:LoginService )
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

        if(route.routeConfig.path==="invoices"){
           
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
                    this.getInvoice()
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
     * Get product
     *
     * @returns {Promise<any>}
     */
    getInvoice(): Promise<any>
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
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveInvoice(product): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl + "/"+product.id, product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }



    updateInvoice(invoice): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl+"?id="+invoice.id, invoice)
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
    addInvoice(product): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, product)
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
    getManufacturers(supplrId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get(config.url+":"+config.port+'/org')
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
    // getPurchaseOrders(id): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get('api/purchaseordersbymanufacturer/' + id)
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }


    getAcceptedPurchaseOrders(id): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port+'/purchaseorder/list?supplierId='+this.loginData.orgId+'&manufacturerId='+ id)
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
    getChallansByPONumber(id): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port + '/challan/list/' +  id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getEnum(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port + "/org/enum")
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    // getPurchaseOrders(id): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get(config.url+":"+config.port+'/purchaseorder/accepted?id='+this.loginData.orgId+'&type='+ id)
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }



}
