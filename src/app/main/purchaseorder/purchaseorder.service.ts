import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PurchaseOrder } from './poform/poform.model';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';
const baseUrl:string=config.url+":"+config.port+"/purchaseorder";

@Injectable()
export class PurchaseOrderService extends TableDataProviderService
{

    routeParams: any;
    purchaseOrder: any;
    tableData : PurchaseOrder[];

    onProductChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor( _httpClient: HttpClient,_loginService: LoginService)
    {
        
        // Set the defaults
        super(_httpClient,_loginService);
        this.onDataChanged = new BehaviorSubject({});
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
    
        
        if(route.routeConfig.path==="purchaseorders"){
           
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
        // else if(route.routeConfig.path.startsWith("products")){

        //     return new Promise((resolve, reject) => {
    
        //         Promise.all([
        //             this.getProducts()
        //         ]).then(
        //             () => {
        //                 resolve();
        //             },
        //             reject
        //         );
        //     });

        // }
        else{

            return new Promise((resolve, reject) => {
    
                Promise.all([
                    this.getPurchaseOrder()
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
    getPurchaseOrder(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else
            {
                
                this._httpClient.get(baseUrl+'/'+ this.routeParams.id)
                    .subscribe((response: any) => {
                      
                        this.purchaseOrder = response;
                        this.onDataChanged.next(this.purchaseOrder);
                        resolve(response);
                    }, reject);
            }
        });
    }


/**
     * Get product
     *
     * @returns {Promise<any>}
     */
    // getProducts(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         if ( this.routeParams.id === 'new' )
    //         {
    //             this.onProductChanged.next(false);
    //             resolve(false);
    //         }
    //         else
    //         {
                
        
    //             this._httpClient.get(baseUrl +'/'+ this.routeParams.id)
    //                 .subscribe((response: any) => {
             
    //                     this.product = response;
    //                     this.onProductChanged.next(this.product);
    //                     resolve(response);
    //                 }, reject);
    //         }
    //     });
    // }


    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    updatePurchaseOrder(purchaseorder): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl+"?id="+purchaseorder.id, purchaseorder)
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
    addPurchaseOrder(purchaseorder): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, purchaseorder)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    

    statusService(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/status/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    getSuppliers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(config.url+":"+config.port+'/org')
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


    deliveryAddress(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/taxcode/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    billingAddress(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/taxcode/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }



}
