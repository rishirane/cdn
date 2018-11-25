import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            // {
            //     id       : 'sample',
            //     title    : 'Sample',
            //     translate: 'NAV.SAMPLE.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/sample',
            //     badge    : {
            //         title    : '25',
            //         translate: 'NAV.SAMPLE.BADGE',
            //         bg       : '#F44336',
            //         fg       : '#FFFFFF'
            //     }
            // },
            // {
            //     id       : 'po',
            //     title    : 'Purchase Order',
            //     translate: 'NAV.PO.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/PO'
            // },


            
            {
                id       : 'org',
                title    : 'Organizations',
                translate: 'NAV.ORGANISATION.TITLE',
                type     : 'collapsable',
                icon     : 'account_balance',
                //url      : '/org',
                children : [
                    {
                        id        : 'entity',
                        title     : 'Entities',
                        translate: 'NAV.ENTITY.TITLE',
                        type      : 'item',
                        icon     : 'insert_drive_file',
                        url       : '/org',
                        
                    },
                    // {
                    //     id       : 'users',
                    //     title    : 'Users',
                    //     translate: 'NAV.USERS.TITLE',
                    //     type     : 'item',
                    //     icon     : 'person',
                    //     url       : '/users'
        
                    // },
                   

                ]
            },

            {
                id       : 'purchaseorders',
                title    : 'Purchase Orders',
                translate: 'NAV.PURCHASEORDER.TITLE',
                type     : 'item',
                icon     : 'shopping_cart',
                url       : '/purchaseorders'

            },






            
            {
                id       : 'challans',
                title    : 'Challans',
                translate: 'NAV.CHALLANS.TITLE',
                type     : 'item',
                icon     : 'receipt',
                url      : '/challans'

            },
            // {
            //     id       : 'invoice',
            //     title    : 'Invoie',
            //     translate: 'NAV.INVOICE.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/Invoice'
            // },
            // {
            //     id       : 'invoicePayment',
            //     title    : 'Invoie Payment',
            //     translate: 'NAV.INVOICEPAYMENT.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/InvoicePayment'

            // },
            // {
            //     id       : 'challan',
            //     title    : 'Challan',
            //     translate: 'NAV.CHALLAN.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/Challan'

            // },
          
            {
                id       : 'invoices',
                title    : 'Invoices',
                translate: 'NAV.INVOICES.TITLE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'invoices',
                        title     : 'Invoices',
                        type      : 'item',
                        url       : '/invoices',
                        exactMatch: true
                    },                    
                    // {
                    //     id        : 'invoicespayment',
                    //     title     : 'Invoices Payment',
                    //     type      : 'item',
                    //     url       : '/invoicespayment',
                    //     exactMatch: true
                    // }

                ]

            },
            // {
            //     id       : 'facilityDefinition',
            //     title    : 'Facility Definition',
            //     type     : 'collapsable',
            //     icon    : 'import_contacts',
            //     children : [
            //         {
            //             id        : 'workOrderLimit',
            //             title     : 'Factoring Facility',
            //             type      : 'item',
            //             url       : '/WOLimitFacilityDefinition'
                        
            //         }
            //     ]
            // },
            {
                id       : 'limits',
                title    : 'Limits',
                type     : 'collapsable',
                icon    : 'layers',
                children : [
                    {
                        id        : 'masterLimit',
                        title     : 'Composite Limit',
                        type      : 'item',
                        url       : '/compositeLimit',
                        
                    },
                    {
                        id        : 'WOLimit',
                        title     : 'WO Limit',
                        type      : 'item',
                        url       : '/workOrderLimit',
                        
                    },
                    {
                        id        : 'factorLimit',
                        title     : 'Factor Limit',
                        type      : 'item',
                        url       : '/factoringLimit',
                        
                    },
                   
                    {
                        id        : 'demandLimit',
                        title     : 'Demand Order Limit',
                        type      : 'item',
                        url       : '/distributorFinanceLimit',
                        
                    }
                ]
            },
            
            
            {
                id       : 'frf',
                title    : 'Fund Requisition',
                translate: 'NAV.FRF.TITLE',
                type     : 'collapsable',
                icon     : 'attach_money',
                //url      : '/org',
                children : [
                    {
                        id        : 'frffactoring',
                        title     : 'Factoring',
                        translate: 'NAV.FACTORING.TITLE',
                        type      : 'item',
                        icon     : 'insert_drive_file',
                        url       : '/fundReqFactoring',
                        
                    },
                ]
            }
        ]
    }
];
