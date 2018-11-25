export class ChallansFakeDb
{
    public static challans = [
      {
        "id":1,
        "supplier": "supplier 1",
        "challanDate": "2018-10-18T13:55:32.531Z",
        "challanNumber": 25,
        "manufacturerId": 3,
        "manufacturer": "Boeing",
        "manufacturersAddress": "India",
        "poid": 4,
        "poNumber" : "IPDC52639",
        "poDate": "2018-10-25T13:55:32.531Z",
        "deliveryAddress": "Rajshahi",
        "finalChallan": "Yes",
        "product": [
          {
            "id":1,
            "product": "Check 1",
            "qty": 20,
            "unitId":1, 
            "unitName": "kgs"
          }
        ],
        "preparedBy": "preparedBy 1",
        "designation": "SE",
        "deliveryStatus": "Final",
        "dlyDate": "2018-10-25T13:55:32.531Z",
        "fileName": "string",
        "filePaths": "string"
      },{
        "id":2,
        "supplier": "supplier 2",
        "challanDate": "2018-10-19T13:55:32.531Z",
        "challanNumber": 35,
        "manufacturerId": 4,
        "manufacturer": "Pokhara PTE",
        "manufacturersAddress": "Nepal",
        "poid":5 , 
        "poNumber":"IPDC41638",
        "poDate": "2018-10-19T13:55:32.531Z",
        "deliveryAddress": "Brazil",
        "finalChallan": "No",
        "product": [
          {
            "id":2,
            "product": "Check 2",
            "qty": 52,
            "unitId":2,
            "unitName": "litres"
          }
        ],
        "preparedBy": "preparedBy 2",
        "designation": "TechLead",
        "deliveryStatus": "Intermediate",
        "dlyDate": "2018-10-23T13:55:32.531Z",
        "fileName": "string",
        "filePaths": "string"
      }
    ];
}
