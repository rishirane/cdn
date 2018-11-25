export class PurchaseOrderFakeDB {


    public static products = [
        {
            "id": 1,
            "podetails": [
                {
                    "id": 1,
                    "product": "Product 1",
                    "description": "This is product 1",
                    "unit": "kgs",
                    "qty": 25,
                    "unitPrice": 3,
                    "totalPrice": 6,
                    "taxCode": 1,   
                    "poDate" : "2018-10-18T13:22:31.653Z",
                    "deliveryAddress" : "Dhaka"
                }
            ]
        },
        {
            "id": 2,
            "podetails": [
                {
                    "id": 2,
                    "product": "Product 2",
                    "description": "This is product 2",
                    "unit": "litres",
                    "qty": 30,
                    "unitPrice": 4,
                    "totalPrice": 12,
                    "taxCode": 2,
                    "poDate" : "2018-10-19T13:22:31.653Z",
                    "deliveryAddress" : "Chittagong"
                }
            ]
        },{
            "id": 4,
            "podetails": [
                {
                    "id": 4,
                    "product": "Product 2",
                    "description": "This is product 2",
                    "unit": "litres",
                    "qty": 30,
                    "unitPrice": 4,
                    "totalPrice": 12,
                    "taxCode": 2,
                    "poDate" : "2018-10-25T13:22:31.653Z",
                    "deliveryAddress" : "Rajshahi"
                }
            ]
        },{
            "id": 6,
            "podetails": [
                {
                    "id": 6,
                    "product": "Product 2",
                    "description": "This is product 2",
                    "unit": "litres",
                    "qty": 30,
                    "unitPrice": 4,
                    "totalPrice": 12,
                    "taxCode": 2,
                    "poDate" : "2018-10-21T13:22:31.653Z",
                    "deliveryAddress" : "New York"
                }
            ]
        }
    ]
    public static purchaseorders = [
        {
            "manufacturerName": "manufacturerName 1",
            "supplierId": "2",
            "supplierName": "MRF",
            "supplierAddrsId": "someId1",
            "supplierAddrs": "addrs1",
            "product": PurchaseOrderFakeDB.products,
            "id": "2",
            "amtInWords": "amtInWords",
            "netPayable": 30.00,
            "advPaymnt": 0.00,
            "grndTotal": 30.00,
            "delivryAddrsId": "someId2",
            "delivryAddrs": "addrs2",
            "issueDate": "2018-10-18T13:22:31.653Z",
            "poNumberId": 1,
            "poNumber": "IPDC1542",
            "createDate": "2000-01-23T04:56:07.000+00:00",
            "billingAddrsId": "someId1",
            "billingAddrs": "addrs1",
            "status": "Approved",
            "challanId": 1,
            "challanNumber": 9,
            "challanDate": "2018-12-30T13:22:31.653Z"
        },
        {
            "manufacturerName": "manufacturerName 2",
            "supplierName": "TATA",
            "supplierAddrsId":"supplierAddrsId",
            "supplierAddrs": "Japan",
            "product": PurchaseOrderFakeDB.products,
            "id": "3",
            "orderId": 1,
            "amtInWords": "amtInWords",
            "netPayable": 23.00,
            "advPaymnt": 7.00,
            "grndTotal": 30.00,
            "delivryAddrsId":"delivryAddrsId",
            "delivryAddrs": "delivryAddrs",
            "issueDate": "2018-05-20T13:22:31.653Z",
            "poNumberId": 2,
            "poNumber": "IPDC1543",
            "createDate": "2000-01-23T04:56:07.000+00:00",
            "billingAddrsId":"billingAddrsId",
            "billingAddrs": "billingAddrs",
            "status": "Rejected",
            "challanId": 2,
            "challanNumber": 25,
            "challanDate": "2018-05-25T13:22:31.653Z"
        }
    ]

    public static purchaseordersbymanufacturer = [
        {

            "id": "1",
            "po": [
                {
                    "id": "1",
                    "issueDate": "2018-10-18T13:22:31.653Z",
                    "poNumberId": "1",
                    "poNumber": "87962",
                },
                {
                    "id": "2",
                    "issueDate": "2018-05-20T13:22:31.653Z",
                    "poNumberId": "2",
                    "poNumber": "63253",
                },]
        },
        {

            "id": "2",
            "po": [
                {
                    "id": "1",
                    "issueDate": "2018-07-18T13:22:31.653Z",
                    "poNumberId": "1",
                    "poNumber": "25369",
                },
                {
                    "id": "4",
                    "issueDate": "2018-06-20T13:22:31.653Z",
                    "poNumberId": "4",
                    "poNumber": "3",
                },]
        },
        {

            "id": "3",
            "po": [
                {
                    "id": "5",
                    "issueDate": "2018-09-18T13:22:31.653Z",
                    "poNumberId": "4",
                    "poNumber": "IPDC52639",
                },
                {
                    "id": "6",
                    "issueDate": "2018-07-20T13:22:31.653Z",
                    "poNumberId": "6",
                    "poNumber": "IPDC78426",
                },
            ]
        },
        {

            "id": "4",
            "po": [
                {
                    "id": "8",
                    "issueDate": "2018-01-20T13:22:31.653Z",
                    "poNumberId": "5",
                    "poNumber": "IPDC41638",
                },]
        },
        {

            "id": "5",
            "po": [
                {
                    "id": "8",
                    "issueDate": "2018-01-20T13:22:31.653Z",
                    "poNumberId": "8",
                    "poNumber": "6",
                },]
        }

    ];


    public static challanbymanufacturer = [

        {

            "id": "1",
            "challan": [
                {
                    "id": "1",
                    "challanDate": "2018-10-18T13:22:31.653Z",
                    "challanId": "1",
                    "challanNumber": "35",
                },
                {
                    "id": "2",
                    "challanDate": "2018-07-20T13:22:31.653Z",
                    "challanId": "2",
                    "challanNumber": "25",
                },]
        },
        {

            "id": "2",
            "challan": [
                {
                    "id": "2",
                    "challanDate": "2018-05-20T13:22:31.653Z",
                    "challanId": "2",
                    "challanNumber": "25",
                },]
        },
        {

            "id": "3",
            "challan": [
                {
                    "id": "4",
                    "challanDate": "2018-03-20T13:22:31.653Z",
                    "challanId": "3",
                    "challanNumber": "35",
                },]
        },
        {

            "id": "4",
            "challan": [
                {
                    "id": "5",
                    "challanDate": "2018-03-23T13:22:31.653Z",
                    "challanId": "5",
                    "challanNumber": "4",
                },]
        },
        {

            "id": "5",
            "challan": [
                {
                    "id": "5",
                    "challanDate": "2018-03-31T13:22:31.653Z",
                    "challanId": "5",
                    "challanNumber": "4",
                },]
        },
        {

            "id": "6",
            "challan": [
                {
                    "id": "6",
                    "challanDate": "2018-03-12T13:22:31.653Z",
                    "challanId": "6",
                    "challanNumber": "5",
                },]
        },
        {

            "id": "7",
            "challan": [
                {
                    "id": "7",
                    "challanDate": "2018-02-20T13:22:31.653Z",
                    "challanId": "7",
                    "challanNumber": "6",
                },]
        },
        {

            "id": "8",
            "challan": [
                {
                    "id": "8",
                    "challanDate": "2018-01-20T13:22:31.653Z",
                    "challanId": "8",
                    "challanNumber": "7",
                },]
        }


    ]



    public static status = [
        {
            "name": "Approved"
        },
        {
            "name": "Rejected"

        }
    ]



}




