import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class userData {
    id: string;
    orgId: string;
    orgName: string;
    firstName:string;
    lastName:string;
    designation:string;
    status:string;
    roleId:number;
    roleName:string;
    contactNo:string;
    email:string;
    userTypeId: number;
    userTypeName: string;
    
    constructor(userdtls?) {
        userdtls = userdtls || {};
        this.id = userdtls.id|| '';
        this.orgName=userdtls.orgName|| '';
        this.orgId = userdtls.orgId || '';
        this.firstName = userdtls.firstName || '';
        this.lastName = userdtls.lastName || '';
        this.designation = userdtls.designation || '';
        this.status = userdtls.status || '';
        this.roleId = userdtls.roleId || 0;
        this.roleName = userdtls.roleName || '';
        this.contactNo = userdtls.contactNo || '';
        this.email = userdtls.email || '';
        this.userTypeId = userdtls.userTypeId || undefined;
        this.userTypeName = userdtls.userTypeName || '';
    }
    
}
export class UserRole{
    id:any;
    name:string;
   
    constructor(userdtls?) {
        userdtls = userdtls || {};
        this.id = userdtls.id || '';
        this.name = userdtls.name || '';
    }
    
}

export class UserType {
    id: number;
    name: string;
    constructor(userTypeInt?) {
        userTypeInt = userTypeInt || {};
        this.id = userTypeInt.id || '';
        this.name = userTypeInt.name || '';
    }
}

export class ActiveUser{
    status:string;
    username: string;
    agree: boolean;
    constructor(user?) {
        user = user || {};
        this.username = user.username || '';
        this.status = user.status || '';
        this.agree = user.agree || false;
    }
}