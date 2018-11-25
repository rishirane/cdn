import { MatChipInputEvent } from '@angular/material';
import { appConst } from "config";

import { FuseUtils } from '@fuse/utils';

export class AddressDtls {
    id: any;
    addressTypeId: number;
    addressTypeName: string;
    addressLine1: string;
    addressLine2?: string;
    divisionId: number;
    divisionName: string;
    districtId: number;
    districtName: string;
    thanaId: number;
    thanaName: string;
    isMailingAddress: boolean;
    
    constructor(addressdtls?) {
        addressdtls = addressdtls || {};
        this.id = addressdtls.id || '';
        this.addressTypeId = addressdtls.addressTypeId || undefined;
        this.addressTypeName = addressdtls.addressTypeName || '';
        this.addressLine1 = addressdtls.addressLine1 || '';
        this.addressLine2 = addressdtls.addressLine2 || '';
        this.divisionId = addressdtls.divisionId || undefined;
        this.divisionName = addressdtls.divisionName || '';
        this.districtId = addressdtls.districtId || undefined;
        this.districtName = addressdtls.districtName || '';
        this.thanaId = addressdtls.thanaId || undefined;
        this.thanaName = addressdtls.thanaName || '';
        this.isMailingAddress = addressdtls.isMailingAddress || false;
    }
}
export class CompanyDtls {
    id: any;
    registrationTypeId: number;
    registrationTypeName: string;
    regNo: string;
    regDate: Date;
    issuingCountryId: number;
    issuingCountryName: string;
    issuingOfficeId: number;
    issuingOfficeName: string;
    hasValidity: boolean;
    expiryDate: Date;
    constructor(companydtls?) {
        companydtls = companydtls || {};
        this.id = companydtls.id || '';
        this.registrationTypeId = companydtls.registrationTypeId || undefined;
        this.registrationTypeName = companydtls.registrationTypeName || '';
        this.regNo = companydtls.regNo || '';
        this.regDate = companydtls.regDate || '';
        this.issuingCountryId = companydtls.issuingCountryId || undefined;
        this.issuingCountryName = companydtls.issuingCountryName || '';
        this.issuingOfficeId = companydtls.issuingOfficeId || undefined;
        this.issuingOfficeName = companydtls.issuingOfficeName || '';
        this.hasValidity = companydtls.hasValidity || false;
        this.expiryDate = companydtls.expiryDate || '';
    }
}

export class ShareholderDtls {
    id: any;
    shName: string;
    roleId: number;
    roleName: string;
    perShare: number;
    idDocTypeId: number;
    idDocTypeName: string;
    shDocumentNo: string;
    issuingCountryId: number;
    issuingCountryName: string;
    shHasValidity: boolean;
    shExpiryDate: Date;
    constructor(shareholderDtls?) {
        shareholderDtls = shareholderDtls || {};
        this.id = shareholderDtls.id || '';
        this.shName = shareholderDtls.shName || '';
        this.roleId = shareholderDtls.roleId || undefined;
        this.roleName = shareholderDtls.roleName || '';
        this.perShare = shareholderDtls.perShare || undefined;
        this.idDocTypeId = shareholderDtls.idDocTypeId || undefined;
        this.idDocTypeName = shareholderDtls.idDocTypeName || '';
        this.shDocumentNo = shareholderDtls.shDocumentNo || '';
        this.issuingCountryId = shareholderDtls.issuingCountryId || undefined;
        this.issuingCountryName = shareholderDtls.issuingCountryName || '';
        this.shHasValidity = shareholderDtls.shHasValidity || false;
        this.shExpiryDate = shareholderDtls.shExpiryDate || '';
    }
}

export class BankDtls {
    id: any;
    accountTitle: string;
    accountNumber: number;
    bankNameId: number;
    bankName: string;
    bankBranchId: number;
    bankBranchName: string;
    constructor(bankDtls?) {
        bankDtls = bankDtls || {};
        this.id = bankDtls.id || '';
        this.accountTitle = bankDtls.accountTitle || '';
        this.accountNumber = bankDtls.accountNumber || undefined;
        this.bankNameId = bankDtls.bankBranchId || undefined;
        this.bankName = bankDtls.bankName || '';
        this.bankBranchId = bankDtls.bankBranchId || undefined;
        this.bankBranchName = bankDtls.bankBranchName || '';
    }
}
export class Org {
    id: any;
    entityTypeId: number;
    entityTypeName: string;
    orgName: string;
    natureOfBusinessId: number;
    natureOfBusinessName: string;
    contactName: string;
    designation: string;
    mobile: string;
    phone: string;
    email: string;
    address: AddressDtls[];
    company: CompanyDtls[];
    shareholder: ShareholderDtls[];
    banks: BankDtls[];
    status?: string;

    constructor(organisation?) {
        organisation = organisation || {};
        this.id = organisation.id || '';
        this.entityTypeId = organisation.entityTypeId || undefined;
        this.entityTypeName = organisation.entityTypeName || '';
        this.orgName = organisation.orgName || '';
        this.natureOfBusinessId = organisation.natureOfBusinessId || undefined;
        this.natureOfBusinessName = organisation.natureOfBusinessName || '';
        this.contactName = organisation.contactName || '';
        this.designation = organisation.designation || '';
        this.mobile = organisation.mobile || '';
        this.phone = organisation.phone || '';
        this.email = organisation.email || '';
        this.address = organisation.address || [];
        this.company = organisation.company || [];
        this.shareholder = organisation.shareholder || [];
        this.banks = organisation.banks || [];
        this.status = organisation.status || appConst.default_status;
    }

    /**
     * Add category
     *
     * @param {MatChipInputEvent} event
     */
    addProducts(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add category
        if (value) {
            // this.productDetails.push(value);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    /**
     * Remove category
     *
     * @param category
     */
    // removeProducts(category): void {
    //     const index = this.productDetails.indexOf(category);

    //     if (index >= 0) {
    //         this.productDetails.splice(index, 1);
    //     }
    // }


}
export namespace PurchaseOrder {
    export type StatusEnum = 'approved' | 'rejected';
    export const StatusEnum = {
        Approved: 'approved' as StatusEnum,
        Rejected: 'rejected' as StatusEnum
    }
}


export class entityTypeInt {
    id: number;
    name: string;
    constructor(entityTypeInt?) {
        entityTypeInt = entityTypeInt || {};
        this.id = entityTypeInt.id || '';
        this.name = entityTypeInt.name || '';
    }
}

export class businessNature {
    id: any;
    name: string;
    constructor(businessNature?) {
        businessNature = businessNature || {};
        this.id = businessNature.id || '';
        this.name = businessNature.name || '';
    }
}



export class addressTypeInt {
    id: any;
    name: string;
    constructor(addresssTypeInt?) {
        addresssTypeInt = addresssTypeInt || {};
        this.id = addresssTypeInt.id || '';
        this.name = addresssTypeInt.name || '';
    }
}

export class division {
    id: any;
    name: string;
    constructor(division?) {
        division = division || {};
        this.id = division.id || '';
        this.name = division.name || '';
    }
}

export class district {
    id: any;
    name: string;
    constructor(district?) {
        district = district || {};
        this.id = district.id || '';
        this.name = district.name || '';
    }
}

export class thana {
    id: any;
    name: string;
    constructor(thana?) {
        thana = thana || {};
        this.id = thana.id || '';
        this.name = thana.name || '';
    }
}

export class registrationType {
    id: any;
    name: string;
    constructor(registrationType?) {
        registrationType = registrationType || {};
        this.id = registrationType.id || '';
        this.name = registrationType.name || '';
    }
}


export class issuingCountries {
    id: any;
    name: string;
    constructor(issuingCountries?) {
        issuingCountries = issuingCountries || {};
        this.id = issuingCountries.id || '';
        this.name = issuingCountries.name || '';
    }
}


export class issuingOffices {
    id: any;
    name: string;
    constructor(issuingOffices?) {
        issuingOffices = issuingOffices || {};
        this.id = issuingOffices.id || '';
        this.name = issuingOffices.name || '';
    }
}

export class roles {
    id: any;
    name: string;
    constructor(roles?) {
        roles = roles || {};
        this.id = roles.id || '';
        this.name = roles.name || '';
    }
}

export class bankList {
    id: any;
    name: string;
    constructor(bankList?) {
        bankList = bankList || {};
        this.id = bankList.id || '';
        this.name = bankList.name || '';
    }
}

export class branchList {
    id: any;
    name: string;
    constructor(branchList?) {
        branchList = branchList || {};
        this.id = branchList.id || '';
        this.name = branchList.name || '';
    }
}

export class documentType {
    id: any;
    name: string;
    constructor(documentType?) {
        documentType = documentType || {};
        this.id = documentType.id || '';
        this.name = documentType.name || '';
    }
}

export var validity = [
    {
        id: 1,
        value: true
    },
    {
        id: 2,
        value: false
    }
];


