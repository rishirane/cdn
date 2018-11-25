import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, Inject, Injectable } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/internal/operators';




import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import 'rxjs/add/observable/of';

import { ActionType, Actions } from '../../config/tablelist.config';
import { LoginService } from 'app/main/login/logindetails.service';
import { TableListBaseComponent } from '@custom/config/tablebase.component';
import { TableDataProviderService } from './tablelist.service';


import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { statusCode } from 'config';

import { SearchComponent } from '../../../app/main/search/search.component'

const status =
{
    0: {
        'status': statusCode.Draft,

    },
    1: {
        'status': statusCode.New,

    },
    4: {
        'status': statusCode.Issued,
        'message': 'you want to issue'
    },
    5: {
        'status': statusCode.Rejected,
        'message': 'you want to reject'
    },
    2: {
        'status': statusCode.Updated,

    },
    3: {
        'status': statusCode.Discard,
        'message': 'you want to discard'
    },
    6: {
        'status': statusCode.Approved,
        'message': 'you want to accept'
    },
    7: {
        'status': statusCode.Rejected,
        'message': 'you want to reject'
    },
    8: {
        'status': statusCode.AcceptRejection,
        'message': 'you want to accept rejection'
    }
};


@Component({
    selector: 'tablelist-data',
    templateUrl: './tablelist.component.html',
    styleUrls: ['./tablelist.component.scss'],
    animations: fuseAnimations,
})
export class TableListComponent extends TableListBaseComponent implements OnInit {
    
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    // @ViewChild('filter')
    // filter: ElementRef;
  
  
    @Input()
    public set data(value) {
        this._data.next(value);
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    public get data() {
        return this._data.getValue();
    }

    isLoadingPassed: boolean;


    public dataSource: FilesDataSource | null;

    filterDataValue: string;

    @Input()
    service: TableDataProviderService | null;

    constructor(public _matDialog: MatDialog, public _loginService: LoginService, public _router: Router) {
        super(_matDialog, _loginService);

    }

    set setDisplayedColumns(value: string[]) {
        this.displayedColumns = value;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this._data
            .subscribe(x => {
                this.dataSource = new FilesDataSource(this.data, this.paginator, this.sort);
                this.isLoadingPassed = this.isLoading(this.dataSource.filteredData.length);
            });

            // fromEvent(this.filter.nativeElement, 'keyup')
            // .pipe(
            //     takeUntil(this._unsubscribeAll),
            //     debounceTime(150),
            //     distinctUntilChanged()
            // )
            // .subscribe(() => {
            //     if ( !this.dataSource )
            //     {
            //         return;
            //     }

            //     this.dataSource.filter = this.filter.nativeElement.value;
            // });


        }
    /**
        * Delete Contact
    */
    deleteData(url: any, keyToSend: string, value: any): void {

        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.deleteEntry(url, keyToSend, value).then(() => {


                    this._router.navigate([this._router.url]);
                });


            }
            this.confirmDialogRef = null;
        });


    }

    gotopage(url: any, keyToSend: string): void {
   
        this._router.navigate([url,{ orgId: keyToSend  }]);
    }



    onIconClick(evnt: Event, columnAction: any, keyToSend: string) {


        if (!(columnAction instanceof String)) {

                        if (columnAction.btnActionType === ActionType.USEURL.valueOf()) {
                            let actionObject = status[columnAction.btnAction];
                           
                            if (columnAction.btnAction === Actions.DELETE) {
                                this.deleteData(columnAction.url, keyToSend, actionObject.status);

                            }else if(columnAction.btnAction === Actions.GOTOPAGE){
                         
                                this.gotopage(columnAction.url, keyToSend);
                            } else {

                                let rejectReason;
                                let status;
                                const dialogRef = this._matDialog.open(DialogOverviewExampleDialog, {
                                    width: '300px',
                                    data: { reason: rejectReason }
                                });
                                
                                // dialogRef.componentInstance.confrimMessage = 'Are you sure you have seen the details? Do you want to continue ?  '+actionObject.message+'?';
                                dialogRef.componentInstance.confrimMessage = 'Are you sure you have seen the details? Do you want to continue ?';
            
                                dialogRef.afterClosed().subscribe(result => {
                                    rejectReason = result;
               
                                    if(rejectReason===false){
                                        return;
                                    }
                                    if ((columnAction.btnAction === Actions.REJECT || columnAction.btnAction === Actions.RECDREJECT)) {

                                        if(rejectReason && rejectReason.length>0){
                                            this.service.fireStatusAction(columnAction.url, keyToSend, actionObject.status + (columnAction.statusActionSuffix ? columnAction.statusActionSuffix : ''), rejectReason).
                                            then(() => {
                                                this._router.navigate([this._router.url]);
                                            
                                            });
                                        }else{
                                            alert("Please enter a reason");
                                            return;
                                        }
                                        
                                    }else {
                                        if ((columnAction.btnAction === Actions.ACCEPTED && !rejectReason)) { 
                                            rejectReason = "Accepted";
                                        }
                                        this.service.fireStatusAction(columnAction.url, keyToSend, actionObject.status + (columnAction.statusActionSuffix ? columnAction.statusActionSuffix : ''), rejectReason).
                                        then(() => {
                                            this._router.navigate([this._router.url]);
                                        
                                        });

                                        ;
                                    } 
                                });
                           
                        }
                }

            }

            evnt.stopPropagation();
        }

    public isLoading(value) {
        if(value  === 0) {
            return true;
        } else {
            return false;
        }
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
    constructor(public data: any[], private _matPaginator: MatPaginator, private _matSort: MatSort) {
        super();
        this.filteredData = this.data;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {


        const displayDataChanges = [
            this.data,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {


                    // if(this._tableDataProviderService && this._tableDataProviderService.tableData){
                    let data = this.data.slice();
                    data = this.filterData(data);

                    this.filteredData = [...data];

                    // data = this.sortData(data);

                    // Grab the page's slice of data.
                    const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                    return data.splice(startIndex, this._matPaginator.pageSize);
                    // }else{
                    //     return [];
                    // }


                }
                ));


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
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
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._matSort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                // case 'name':
                //     [propertyA, propertyB] = [a.name, b.name];
                //     break;
                case 'poNumber':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active, b.active];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }




    /**
     * Disconnect
     */
    disconnect(): void {
    }
}


@Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: './reasondialog.html',
})
export class DialogOverviewExampleDialog {

    
    constructor(
        // public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    //     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    // onNoClick(result): void {
    //     this.data.status = result;
    //     this.dialogRef.close();
    
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}

    public confrimMessage: string;
}



export interface DialogData {
    reason: string;
    status: boolean;
}