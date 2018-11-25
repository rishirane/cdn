export class OrgFakeDb {
  public static organisations = [
    {
      "id": "2",
      "entityTypeId": "1",
      "entityTypeName": "Proprietorship",
      "orgName": "MRF",
      "natureofBusiness": "FMCG",
      "address": [
        {
          "id": "1",
          "addressType": "Permanent",
          "addressLine1": "Permanent 1",
          "addressLine2": "Permanent 2",
          "division": "Dhaka",
          "district": "Dhaka",
          "thana": "Dhaka",
          "isMailingAddress": true
        },
        {
          "id": "2",
          "addressType": "Residenial",
          "addressLine1": "Residenial 1",
          "addressLine2": "Residenial 2",
          "division": "Dhaka",
          "district": "Dhaka",
          "thana": "Dhaka",
          "isMailingAddress": false
        }
      ],
      "company": [
        {
          "id": "1",
          "registrationType": "Trade License",
          "regNo": "reg0101",
          "regDate": "2018-10-22T10:01:39.190Z",
          "issuingCountry": "Bangladesh",
          "issuingOffice": "Dhaka",
          "hasValidity": true,
          "expiryDate": "2018-10-22"
        }
      ],
      "contactName": "gokul",
      "designation": "SE",
      "mobile": 123412352,
      "phone": 123242343423,
      "userCount": 0,
      "emailID": "gokulraj@cateina.com",
      "shareholder": [
        {
          "id": "1",
          "shName": "Gokul",
          "role": "Proprietor",
          "perShare": 123,
          "identityDocumentType": "NID",
          "docNo": "DOC0101",
          "issuingCountry": "Bangladesh",
          "hasValidity": true,
          "expiryDate": "2018-10-22"
        }
      ],
      "bank": [
        {
          "id": "3",
          "accountTitle": "MRF",
          "accountNumber": 546745,
          "bankName": "ICICI",
          "bankBranch": "Dhaka"
        }
      ]
    },
    {
      "id": "4",
      "entityTypeId": "5",
      "entityTypeName": "Public-Listed",
      "orgName": "RCF",
      "natureofBusiness": "Banking",
      "address": [
        {
          "id": "1",
          "addressType": "Permanent",
          "addressLine1": "Permanent 1",
          "addressLine2": "Permanent 2",
          "division": "Dhaka",
          "district": "Dhaka",
          "thana": "Dhaka",
          "isMailingAddress": true
        },
        {
          "id": "2",
          "addressType": "Residenial",
          "addressLine1": "Residenial 1",
          "addressLine2": "Residenial 2",
          "division": "Dhaka",
          "district": "Dhaka",
          "thana": "Dhaka",
          "isMailingAddress": false
        }
      ],
      "company": [
        {
          "id": "3",
          "registrationType": "Trade License",
          "regNo": "reg0101",
          "regDate": "2018-10-22T10:01:39.190Z",
          "issuingCountry": "Bangladesh",
          "issuingOffice": "Dhaka",
          "hasValidity": true,
          "expiryDate": "2018-10-22"
        }
      ],
      "contactName": "rishi",
      "designation": "TLead",
      "mobile": 123412352,
      "phone": 123242343423,
      "userCount": 0,
      "emailID": "rishi@kuchnaya.com",
      "shareholder": [
        {
          "shName": "Rishi",
          "role": "Proprietor",
          "perShare": 543,
          "identityDocumentType": "NID",
          "docNo": "DOC0101",
          "issuingCountry": "Bangladesh",
          "hasValidity": true,
          "expiryDate": "2018-10-22"
        }
      ],
      "bank": [
        {
          "id": "4",
          "accountTitle": "MRF",
          "accountNumber": 123456,
          "bankName": "SBI",
          "bankBranch": "Motijhil"
        }
      ]
    },
    
  ];
  public static entities = [
    {
      id: 1,
      entityTypeName: "Proprietorship"
    }, {
      id: 2,
      entityTypeName: "Partnership"
    }, {
      id: 3,
      entityTypeName: "Private Limited"
    }, {
      id: 4,
      entityTypeName: "Public-Unlisted"
    }, {
      id: 5,
      entityTypeName: "Public-Listed"
    }, {
      id: 6,
      entityTypeName: "NGO"
    }
  ]
  public static businessNature = [{
    id: "1",
    nature: "FMCG"
  }, {
    id: "2",
    nature: "Banking"
  }, {
    id: "3",
    nature: "FI"
  }, {
    id: "4",
    nature: "Cement"
  }
  ]

  public static addressType = [
    {
      id: "1",
      type: "Permanent"
    }, {
      id: "2",
      type: "Residential"
    }, {
      id: "3",
      type: "Work"
    }, {
      id: "4",
      type: "Registered"
    }, {
      id: "5",
      type: "Head Office"
    }, {
      id: "6",
      type: "Factory"
    }
  ]

  public static division = [
    {
      id: "1",
      value: "Chittagong"
    }, {
      id: "2",
      value: "Khulna"
    }, {
      id: "3",
      value: "Rajshahi"
    }, {
      id: "4",
      value: "Dhaka"
    }
  ]

  public static registrationType = [
    {
      id: "1",
      type: "Trade License"
    }, {
      id: "2",
      type: "RJSC Registration"
    }, {
      id: "3",
      type: "Central Bank License"
    }, {
      id: "4",
      type: "ERC"
    }, {
      id: "5",
      type: "IRC"
    }, {
      id: "6",
      type: "VAT"
    }
  ]

  public static issuingCountries = [
    {
      id: "1",
      name: "America"
    }, {
      id: "2",
      name: "England"
    }, {
      id: "3",
      name: "Bangladesh"
    }
  ]

  public static issuingOffices = [
    {
      id: "1",
      name: "NewYork"
    }, {
      id: "2",
      name: "London"
    }, {
      id: "3",
      name: "Dhaka"
    }
  ]

  public static roles = [
    {
      id: "1",
      role: "Proprietor"
    }, {
      id: "2",
      role: "Partner"
    }, {
      id: "3",
      role: "Chairman"
    }, {
      id: "4",
      role: "Director"
    }, {
      id: "5",
      role: "Shareholder"
    }, {
      id: "6",
      role: "Nominated"
    }
  ];


  public static bankList = [
    {
      id: "1",
      name: "Yes"
    }, {
      id: "2",
      name: "HDFC"
    }, {
      id: "3",
      name: "ICICI"
    }, {
      id: "4",
      name: "SBI"
    }, {
      id: "5",
      name: "Federal Bank"
    }, {
      id: "6",
      name: "Canara Bank"
    }
  ]

  public static branchList = [
    {
      id: "1",
      name: "Gulshan"
    }, {
      id: "2",
      name: "Motijhil"
    }, {
      id: "3",
      name: "Dhaka"
    }, {
      id: "4",
      name: "Tongi"
    }, {
      id: "5",
      name: "Sadar"
    }
  ]

  public static docType = [
    {
      id: "1",
      type: "NID"
    }, {
      id: "2",
      type: "Passport"
    }, {
      id: "3",
      type: "Driving License"
    }, {
      id: "4",
      type: "Birth registration"
    }, {
      id: "5",
      type: "Smart NID"
    }
  ]

}



