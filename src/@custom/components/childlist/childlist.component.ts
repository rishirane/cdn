import {Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit} from '@angular/core';

import { BehaviorSubject, Observable,merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ChildItem } from './child-item';

import { ChildItemComponent } from './childitem.component';
import { LoginService } from 'app/main/login/logindetails.service';
import { TableListBaseComponent } from '@custom/config/tablebase.component';

export interface Transaction {
  item: string;
  cost: number;
}

/**
 * @title Table with a sticky footer
 */
@Component({
  selector: 'childlist-table',
  styleUrls: ['childlist.component.scss'],
  templateUrl: 'childlist.component.html',
})
export class ChildListComponent extends TableListBaseComponent{


    @ViewChild('dynamicComponent', { read: ViewContainerRef }) myRef;
    @ViewChild('tableFooterComponent', { read: ViewContainerRef }) tableFooterComponentRef;


    public _ChildItem=new BehaviorSubject<ChildItem>(null);



    @Input()
    set ChildItem(value){
        this._ChildItem.next(value);
    }
    get ChildItem(){
        return this._ChildItem.getValue();
    }


    dataSource: FilesDataSource | null;

    
    public childPageType:string='list';


    @Input()
    set data(value){
        value=value?value:[];
        this._data.next(value);
    }

    get data(){
        return this._data.getValue();
    }


    @Output() valueChange:EventEmitter<any> = new EventEmitter<any>();

    childFormComponentRef: ChildItemComponent;

    constructor(  public _matDialog: MatDialog, public _loginService:LoginService,private _componentFactoryResolver: ComponentFactoryResolver)
    {
        super(_matDialog,_loginService);
    }
    
    set setDisplayedColumns(value: string[]){
       this.displayedColumns=value;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void
    {
      
            super.ngOnInit();
            
            this.dataSource =  new FilesDataSource(this.data);

            this._data
                .subscribe(x => {
                   
                    this.dataSource =  new FilesDataSource(x);
            });

            this._ChildItem
                .subscribe(childItem=>{
                        this.loadChildForm(childItem);
                });

          
        }
        


        loadChildForm(childItem:ChildItem){
            
            if(childItem && this.myRef){
               
                let componentFactory = this._componentFactoryResolver.resolveComponentFactory(childItem.component);

                    this.myRef.clear();
                    let componentRef = this.myRef.createComponent(componentFactory);
                    this.childFormComponentRef=(<ChildItemComponent>componentRef.instance);
                    this.childFormComponentRef._changableData.next(childItem.data);
                    
             
                
            }
        }
        /**
            * Delete Contact
        */
        deleteData(columnAction:string,keyToDelete:string): void
        {
           
            this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                disableClose: false
            });

            this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

            this.confirmDialogRef.afterClosed().subscribe(result => {
                if ( result )
                {

                    this.onRowDeleteData(keyToDelete);
                }
                this.confirmDialogRef = null;
            });


        }

        onIconClick(evnt:Event,columnAction:string,keyToSend:string){

                if(columnAction==='delete'){
                    this.childPageType='list';
                    this.deleteData(columnAction,keyToSend);
                }else if(columnAction==='add'){
                   this.childPageType=columnAction;
                   this.addNewData();
                }else if(columnAction==='edit'){
                    this.childPageType=columnAction;
                    this.onRowClick(keyToSend);
                }else if(columnAction==='save'){
                    this.onSaveData();
                }else{
                    this.valueChange.emit({"formshow":true});
                    this.onBackToList(); 
                }
                evnt.stopPropagation();
                
        }


        addNewData(){
            if(this.childFormComponentRef){
                this.childFormComponentRef.addNewClicked();
                this.valueChange.emit({"formshow":false});
            }
        }

        onRowDeleteData(keyToRemove:string){
            const productIndex=this.data.findIndex( record => record.id === keyToRemove );
            this.data.splice(productIndex, 1);
            this._data.next(this.data);
            this.valueChange.emit({"data":this.data,"formshow":true});
        }


        
        onSaveData(){
            if(this.childFormComponentRef){
  
                let updatedRowData=this.childFormComponentRef.saveData();
                if(updatedRowData.id){
                    let indxToUpdate=this.data.findIndex(record => record.id === updatedRowData.id);
                    this.data[indxToUpdate]=updatedRowData;
                }else{
                    this.data.push(updatedRowData);
                }
               
                this._data.next(this.data);
                this.valueChange.emit({"data":this.data,"formshow":true});
            }else{
                this.valueChange.emit({"formshow":true});
            }
            this.onBackToList();
        }

        onBackToList(){
            this.childPageType='list';
            if(this.childFormComponentRef){
                this.childFormComponentRef._changableData.next(false);
            }
        }

        onRowClick(keyToCheck:string){
            if(this.childFormComponentRef){
                let returnData={};
                if(this.data){
                    const productIndex=this.data.findIndex( record => record.id === keyToCheck );
                    returnData = this.data[productIndex];  
                }
                
                this.childFormComponentRef.setData(returnData);
                this.valueChange.emit({"formshow":false});
            }

        }
        /**
         * Create total cost row based on coloumn
  
   
         */
        getTotalCost(coloumnToTotal) {
    
                let grandTotal="0";
                if(this.data){
                    grandTotal=this.data.map(t => t[coloumnToTotal]).reduce((acc, value) => {
                        let addVal=value;
                        try{
                            let stAddVal=''+addVal;
                            if(stAddVal.indexOf(".")!=-1){
                                addVal=parseFloat(stAddVal);
                            }else{
                                addVal=parseInt(stAddVal);
                            }
                        }catch(e){
                            
                        }
                        return acc + addVal;
                    }, 0);
                }
                return grandTotal;
        }


        setCurrentTodo(id): void
        {
           // this._location.go(this.tableConfig.addNewClickUrl+'/'+ id);
        }
        
     /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}



export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');



    /**
     * Constructor
     *
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(private data:any[])
    {
        super();
        this.filteredData = this.data;
    }


    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
    
        const displayDataChanges = [
            this.data,
            this._filterChange,
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        
                            let data = this.data.slice();

                            data = this.filterData(data);
                    
                            for (let i in data) {
                                if(!data[i].hasOwnProperty("id") || data[i].id===""){
                                    data[i]["id"]=this.makeid();
                                }
                            }
                            
                            this.filteredData = [...data];
                            return data;
                        
                            
                    }
                ));
        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------


    makeid() {
        var text = "";
        var possible = "AxCdEFsHI6KLwNoPmYS5UVkXRZa9cDefghijWlQn2pqrGtuvMByz01O34TJ78b";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------


    /**
     * Disconnect
     */
    disconnect(): void
    {
    }



  /** Gets the total cost of all transactions. */
  
}