export enum ActionType {
    USEURL = 0,
    USEDATA = 1,
}


export enum Actions {
    DRAFT = 0,
    SUBMIT = 1,
    UPDATE = 2,
    DELETE = 3,
    AUTHORIZE = 4,
    REJECT = 5,

    ACCEPTED = 6,
    RECDREJECT = 7,
    ACCEPTREJECT = 8,
    GOTOPAGE = 9
}

export class ActionButton{
    btnName:string;
    btnIcon: string;
    btnIconSizeClass?: string;
    btnIconColorClass?: string;
    btnAction: Actions;
    btnActionType: ActionType=ActionType.USEURL;
    statusActionSuffix?:string;
    url? :string;
    
}

export class ColumnConfig{
    colDef:string;
    colName: string;
    colValue: string;
    toDisplay? :boolean = true;
    isRowButtons? :boolean =false;
    actionButtons?:ActionButton[];
    isTotalColoumn?:boolean=false;
    totalColoumnHeader?:string;
    colType? : string;
    toAddSuffix?:boolean=true;

}



export class TableConfig{

    expectedColoumns :ColumnConfig[];
    addNewClickUrl? : string;
    rowClickUrl? :string;
    addNewClickName? :string;
    topHeadName?: string;
    isTopHeadRequired : boolean =true;
    isDataProvided?: boolean=false;
    grandTotalColumnName?:string;
    addFormUrl?:string;
    hasFooter?:boolean=false;
    removeRowClick?:boolean=false;
}