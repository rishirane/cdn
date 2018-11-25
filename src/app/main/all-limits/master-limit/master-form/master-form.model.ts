import { MatChipInputEvent } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { USE_DEFAULT_LANG } from '@ngx-translate/core';
import { appConst } from 'config';

export class masterLimit {
    supplierId?: string
    supplierName?: string;
    limitTypeId: number;
    limitTypeName: string;
    totalLimit?: number;
    woBranchId?: string;
    woAccNo?: number;
    woLimit?: number;
    factoringBranchId?:string;
    factoringAccNo?: number; 
    factoringLimit?: number;
    status?:string;
    id?:string

    /**
     * Constructor
     *
     * @param woLimit
     */
    constructor(woLimit?) {
        woLimit = woLimit || {};
        this.supplierName=woLimit.supplierName || '',
        this.totalLimit=woLimit.totalLimit || 0,
        this.woBranchId=woLimit.woBranchId || '',
        this.woAccNo= woLimit.woAccNo || '',
        this.woLimit= woLimit.woLimit || 0,
        this.factoringBranchId= woLimit.factoringBranchId || '',
        this.factoringAccNo= woLimit.factoringAccNo || '',
        this.factoringLimit= woLimit.factoringLimit || 0,
        this.limitTypeId = woLimit.limitTypeId || undefined;
        this.limitTypeName = woLimit.limitTypeName || '';
        this.status = woLimit.status || appConst.default_status;
        this.supplierId = woLimit.supplierId || '',
        this.id = woLimit.id || '';
    }

}
export class limitTypeInt {
    id?: number;
    name?: string;
    constructor(limitTypeInt?) {
        limitTypeInt = limitTypeInt || {};
        this.id = limitTypeInt.id || '';
        this.name = limitTypeInt.name || '';
    }
}











