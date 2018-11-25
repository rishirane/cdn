import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Org } from './orgform/org.model';
import { TableDataProviderService } from '@custom/components/tablelist/tablelist.service';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';

// const baseUrl: string = 'api/orgFakeDB/'; 
const baseUrl: string = config.url+":"+config.port+'/org';

@Injectable({
    providedIn: 'root'
})
export class OrgService extends TableDataProviderService{

    routeParams: any;
    orgData: any;

    // tableData: Org[];


    constructor(_httpClient: HttpClient,_loginService:LoginService) {
        super(_httpClient,_loginService);

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

        if (route.routeConfig.path === "org") {

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
                    this.getOrg()
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                );
            });
        }
    }

    getOrg(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.routeParams.id || this.routeParams.id === 'new') {
                this.onDataChanged.next(false);
                resolve(false);
            }
            else {

                // this._httpClient.get(baseUrl + this.routeParams.id)
                this._httpClient.get(baseUrl +'/'+ this.routeParams.id)
                    .subscribe((response: any) => {
                        console.log("child",response)
                        this.orgData = response;
                        this.onDataChanged.next(this.orgData);
                        resolve(response);
                    }, reject);
            }
        });
    }

    // getTableEntries(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get(baseUrl)
    //             .subscribe((response: any) => {
    //                 this.tableData = response;
    //                 this.onDataChanged.next(this.tableData);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }


    getMiscOrgData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(baseUrl + "/enum")
                .subscribe((response: any) => {
                    console.log("response of MiscOrgData",response);
                    resolve(response);
                }, reject);
        });
    }


    getaddressType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/addressType/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getdivision(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/divisions/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getregistrationType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/registarationType/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getIssuingCountry(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/issuingCountries/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getIssuingOffice(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/issuingOffices/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getDocType(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/docType/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getRoles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/roles/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    getBankList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/bankList/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getBranchList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/branchList/')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addOrganization(orgFormValues): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(baseUrl, orgFormValues)
                .subscribe((response: any) => {
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
    updateOrganization(orgFormValues): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(baseUrl+"?id="+orgFormValues.id, orgFormValues)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


}





