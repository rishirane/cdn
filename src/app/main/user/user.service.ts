import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';


const baseUrl:string=config.url+":"+config.port;
@Injectable({
  providedIn: 'root'
})
export class UserService extends TableDataProviderService {
  onDataChanged: BehaviorSubject<any>;
  routeParams: any;
  product: any;
  tableData: any[];
    
  /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
  constructor( _httpClient: HttpClient,_loginService:LoginService) {

    super(_httpClient,_loginService);
    this.onDataChanged = new BehaviorSubject({});

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
        console.log("orgId",this.routeParams)
    
        if(route.routeConfig.path==="users"){
            return new Promise((resolve, reject) => {

                Promise.all([
                    console.log("data in getTable",this.loginData.orgId),
                    this.getTableEntries(baseUrl+"/userRegistration/user"),
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
                    this.getUser()
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
     * Get User Details
     *
     * @returns {Promise<any>}
     */
    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            //if ( this.routeParams.orgId === 'new' )
            console.log("Params:",this.routeParams)
            if(!this.routeParams.id || this.routeParams.id === 'new')
            {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else
            {
                
                this._httpClient.get(baseUrl +"/userRegistration?id=" +this.routeParams.id)
                    .subscribe((response: any) => {
                        console.log("data of getUser",response)
                        this.onDataChanged.next(response);
                        resolve(response);
                    }, reject);
            }
        });
    }


    public getOrganozationsDetails(baseUrl:string , orgId: string) {
        return new Promise((resolve, reject) => {

            this._httpClient.get(baseUrl+"?orgId=" + orgId)
                .subscribe((response: any) => {
                    this.tableData = response;
                    console.log("data in getTable",this.tableData),
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    
    }

    public getTableEntries(baseUrl:string): Promise<any>{
        return this.getOrganozationsDetails(baseUrl, this.routeParams.orgId)

    }



    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    updateUserData(userdtl): Promise<any>
    {
        return new Promise((resolve, reject) => {
            console.log("data of login",this.loginData.orgId)
            this._httpClient.put(baseUrl+"/userRegistration?id="+userdtl.id, userdtl)
                .subscribe((response: any) => {
                    console.log("data of login",response)
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
    addUserData(userdtl): Promise<any>
    {
        return new Promise((resolve, reject) => {
            
            this._httpClient.post(baseUrl+"/userRegistration/bankUser", userdtl)
                .subscribe((response: any) => {
                    console.log("RESPONSE IS",response)
                    resolve(response);
                }, reject);
        });
    }
     //get UserType
     getEnumData(): Promise<any>
     {
         return new Promise((resolve, reject) => {
             this._httpClient.get(config.url+":"+config.port+"/org/enum")
                 .subscribe((response: any) => {
                     console.log("response of userType",response)
                     resolve(response);
                 }, reject);
         });
     }

     addActivateUserData(userdtl){

        return new Promise((resolve, reject) => {
            
            this._httpClient.patch(baseUrl+"/userRegistration/active?username="+userdtl.username, userdtl)
                .subscribe((response: any) => {
                    console.log("RESPONSE IS",response)
                    
                    resolve(response);
                }, reject);
        });
     }
 

}
