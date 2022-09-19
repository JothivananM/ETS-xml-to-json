$(document).ready(function () {
    let xmlDoc;
    showFoodMenu();
    loadDoc();
});

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
      }
    };
    xhttp.open("GET", "input.xml", true);
    xhttp.send();
  }

  function myFunction(xml) {

    xmlDoc = xml.responseXML;
    console.log("XML DOCUMENT", xmlDoc);

    // let x2js = new X2JS();
    // let xmlToJs = x2js.xml2json(xmlDoc);
    // console.log("JSOBJECT", xmlToJs);


    var settings = {
        "url": "https://my354771.sapbydesign.com/sap/bc/srt/scs/sap/managecustomerrequirementin",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "text/xml",
          "Authorization": "Basic X1NVQlVSQkFOOldlbGNvbWUx",
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:glob=\"http://sap.com/xi/SAPGlobal20/Global\">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <glob:CustReqBundleMaintainRequest_sync>\r\n         <CustomerRequirement ActionCode=\"01\">\r\n            <ShipFromSiteID>MHMUMADH-T0201</ShipFromSiteID>\r\n            <ShipToSiteID>MHMUMADH-T0401</ShipToSiteID>\r\n            <ShipToLocationID>MHMUMADH-T0401</ShipToLocationID>\r\n            <ExternalRquestItem ActionCode=\"01\">\r\n               <ItemID>10</ItemID>\r\n               <ProductKey>\r\n                  <ProductTypeCode>1</ProductTypeCode>\r\n                  <ProductIdentifierTypeCode>1</ProductIdentifierTypeCode>\r\n                  <ProductID>10000003</ProductID>\r\n               </ProductKey>\r\n               <RequestedQuantity unitCode=\"EA\">3</RequestedQuantity>\r\n               <RequestedLocalDateTime timeZoneCode=\"UTC\">2012-08-01T00:00:00Z</RequestedLocalDateTime>\r\n               <Description languageCode=\"EN\">Cotton Packet</Description>\r\n            </ExternalRquestItem>\r\n            <ExternalRquestItem ActionCode=\"01\">\r\n               <ItemID>20</ItemID>\r\n               <ProductKey>\r\n                  <ProductTypeCode>1</ProductTypeCode>\r\n                  <ProductIdentifierTypeCode>1</ProductIdentifierTypeCode>\r\n                  <ProductID>10000003</ProductID>\r\n               </ProductKey>\r\n               <RequestedQuantity unitCode=\"EA\">3</RequestedQuantity>\r\n               <RequestedLocalDateTime timeZoneCode=\"UTC\">2012-08-01T00:00:00Z</RequestedLocalDateTime>\r\n               <Description languageCode=\"EN\">Cotton Packet</Description>\r\n            </ExternalRquestItem>\r\n         </CustomerRequirement>\r\n      </glob:CustReqBundleMaintainRequest_sync>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>",
      };
      
      $.ajax(settings).done(function (response) {
        console.log("FINAL RESPONSE",response);
      });


  }

const generateTable = (records) => {

    // console.log("RECORDS",records.updated);

  $('#myTable').DataTable({

    stateSave: true,
    "responsive": true,
    "pageLength": 10,
    "bDestroy": true,
    dom: 'Bfrtip',
    data:records,
    
    columns:[
        
       
            {data:'id'},
        // render: function(data, type, row) {
        //     if (data) {
        //         return '<span>Admin</span>'
        //     } else {
        //         return '<span>Employee</span>'
        //     }
        // }
   
        {data:'content.properties.CategoryID'}
        // {data:'feed.entry[0].content.properties.CategoryID'},
        // {data:'feed.entry[0].content.properties.ProductID'},
        // {data:'feed.entry[0].content.properties.ProductName'},
        // {data:'feed.entry[0].content.properties.SupplierID'},
        // {data:'feed.entry[0].updated'}
    
    ]


    });
    
}



function showFoodMenu() {

    // var SoppUserName = "SCMUSER";
    // var SoapPassword = "India@1234";
    // var auth2 = "Basic " + new Buffer.from(SoppUserName + ":" + SoapPassword).toString("base64");

    // console.log("AUTH",auth2);
    $.ajax({
        url : "https://services.odata.org/v3/northwind/northwind.svc/Products",
        dataType : "xml",
        // url: "https://my354771.sapbydesign.com/sap/byd/odata/cust/v1/productmaster/MaterialCollection",
        // method: "GET",
        // dataType: "xml",
        // headers: {
        //     Authorization: "Basic U0NNVVNFUjpJbmRpYUAxMjM0",
        //     Cookie: "MYSAPSSO2=AjQxMDMBABhLAEEAMgBNADEANwAwAEMASgBZADkAIAACAAY0ADgAMQADABBMAEUAUAAgACAAIAAgACAABAAYMgAwADIAMgAwADkAMQA2ADAAOQAxADYABQAEAAAACAYAAlgACQACRQD%2fAPwwgfkGCSqGSIb3DQEHAqCB6zCB6AIBATELMAkGBSsOAwIaBQAwCwYJKoZIhvcNAQcBMYHIMIHFAgEBMBowDjEMMAoGA1UEAxMDTEVQAggKIBUBJhImITAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIwOTE2MDkxNjQyWjAjBgkqhkiG9w0BCQQxFgQUKQjyIV0FsNXlmOh5Ifx2DoFLAwowCQYHKoZIzjgEAwQvMC0CFQCvzdEm9n7DDokfgAkY6a1E78p%2fyQIUMfZRc7XjX4doiVdIfpLsUk1jC%214%3d; SAP_SESSIONID_LEP_481=RWHnpBO74hPWS2fE5veOiUdJc6M1oBHtnlj6Fj4HFWc%3d; sap-usercontext=sap-client=481"
        // },

        success : function(successData) {
       
            let x2js = new X2JS();
            
            // XML to js Object 
            let jsObject = x2js.xml2json( successData );
            // console.log("XML to js object",jsObject);

            // console.log("js Object to JSON", JSON.stringify(jsonObj));

            // Object to XML
            let newXML  =x2js.json2xml (jsObject);
            // console.log("js object to XML",newXML);

            generateTable(jsObject.feed.entry);          

        },
        error : function(error) {
            console.log("ERROR",error);
        }
    });



//    $.ajax({

//     url: "https://my354771.sapbydesign.com/sap/byd/odata/cust/v1/stocktransferrequest/RequestedItemCollection",
//     method: "GET",
//     crossDomain: true,
//     type: "xml",
//     contentType: 'application/xml',
    
  
//     headers: {  
//         "Authorization": "Basic U0NNVVNFUjpJbmRpYUAxMjM0",
//         'Access-Control-Allow-Origin': '*' 
//     },
 
//     success: function(successData) {
//         console.log("SOAP API", successData);
//     },

//     error: function(error) {
//         console.log("ERROR", error);
//     }

//    })
}

