import { TableConfig, ColumnConfig, ActionButton, Actions } from "./tablelist.config";
import { Input } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material";
import { LoginService } from "app/main/login/logindetails.service";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";


export class TableListBaseComponent {

    @Input() public tableConfig: TableConfig;
    public _data=new BehaviorSubject<any>([]);

    public displayedColumns : any[];
    public columns:any[];
    public _unsubscribeAll: Subject<any>;


     
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    constructor(  public _matDialog: MatDialog, public _loginService:LoginService)
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
            
        

            let expectedColoumns=this.tableConfig.expectedColoumns;
            this.columns=[];

            for(var i=0;i<expectedColoumns.length;i++){
                
                let readColVal=expectedColoumns[i].colValue;
                let isColumnHasButtons=expectedColoumns[i].isRowButtons || false;
                let colType=expectedColoumns[i].isRowButtons ? 'ActionColoumn' : expectedColoumns[i].isTotalColoumn ? 'TotalColumn' : 'ValueColumn';
                let isToDisplay=expectedColoumns[i].toDisplay || true;
                let totalHeaderColText=expectedColoumns[i].totalColoumnHeader || '';
                let actionButtons=expectedColoumns[i].actionButtons || [];
                let coloumnType=expectedColoumns[i].colType || 'value';
                
                let colHeadValue=this.addColoumnHeaderSuffix(expectedColoumns[i])

                let jData={
                    
                };
                
                if(!isColumnHasButtons){
                    jData={
                        columnDef: expectedColoumns[i].colDef,  
                        header:colHeadValue,  
                        isColumnHasButtons: isColumnHasButtons,
                        columnVal :colType,
                        coloumnType:coloumnType,
                        isToShow : isToDisplay,
                        totalHeaderColText:totalHeaderColText,
                        cell :   (element: any) => `${ element[readColVal]}` 
                    };
                    
                    
                }else{

                    jData={
                        columnDef: expectedColoumns[i].colDef,  
                        header:colHeadValue,  
                        isColumnHasButtons: isColumnHasButtons,
                        columnVal :colType,
                        coloumnType:coloumnType,
                        isToShow : isToDisplay,
                        totalHeaderColText:totalHeaderColText,
                        columnActionsButtons:actionButtons,
                        getStyle : (actionButtons: ActionButton) => {
                            `${actionButtons.btnIcon}+' '+${actionButtons.btnIconColorClass}+' '+${actionButtons.btnIconSizeClass}`
                        }
                    };
                    
                        
                }
            
                this.columns.push(jData);
            }


            this.displayedColumns = this.columns.map(c => c.columnDef);

          
        }

        
        addColoumnHeaderSuffix(expectedColoumn:ColumnConfig):string{
            let colHeadValue=expectedColoumn.colName;
            if(expectedColoumn.colType==='amount' && (expectedColoumn.toAddSuffix===undefined || expectedColoumn.toAddSuffix===true)){
                
                colHeadValue=colHeadValue+" ("+this._loginService.loginData.currency+") ";
            }
            return colHeadValue;
        }


        takeStatusActionsWithUrl(columnAction:ActionButton,keyToSend:string){
            if(columnAction.btnAction===Actions.DELETE){
                
            }
        }

}