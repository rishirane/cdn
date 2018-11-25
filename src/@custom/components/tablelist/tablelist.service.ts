import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'app/main/login/logindetails.service';
import { config } from 'config';
import { HttpClient } from '@custom/util/httpclient';

const baseUrl:string=config.url+":"+config.port;
export abstract class TableDataProviderService implements Resolve<any>
{
    
    tableData: any[];
    onDataChanged: BehaviorSubject<any>;
    
    loginData:any;

    constructor(public _httpClient: HttpClient,public _loginService: LoginService)
    {
        this.loginData=_loginService.getloginDetails();
        this.onDataChanged = new BehaviorSubject({});
       
    }



    public getTableEntries(baseUrl:string): Promise<any>{
      
        return new Promise((resolve, reject) => {
            this._httpClient.get(baseUrl)
                .subscribe((response: any) => {
                    this.tableData = response;
                  
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    }
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
    }



    deleteEntry(url:string,key:string,status:any): Promise<any>{

        return new Promise((resolve, reject) => {
            this._httpClient.delete(baseUrl+url+"?id="+key+"&status="+status,{
               
            })
            .subscribe((response: any) => {
                    this.tableData = response;
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    }

    getUsers(url:string,key:string): Promise<any>{

        return new Promise((resolve, reject) => {
            this._httpClient.get(baseUrl+url+"?orgId="+key,{
               
            })
            .subscribe((response: any) => {
                    this.tableData = response;
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    }

    fireStatusAction(url:string,key:string,status:string,rejectReason?:string){//: Promise<any>{
      
        return new Promise((resolve, reject) => {
            this._httpClient.patch(baseUrl+url+"?id="+key , {'status':status,'reason':rejectReason})
            .subscribe((response: any) => {
                    this.tableData = response;
                    this.onDataChanged.next(this.tableData);
                    resolve(response);
                }, reject);
        });
    }


}