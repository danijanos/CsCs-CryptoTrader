/*
 * Variables to store API data
 */
document.addEventListener('DOMContentLoaded', function() {
    initFunctions();
}, false);

function initFunctions(){
    populateDropdowns();
    
}
function populateDropdowns() {
    var resource = nagyvallalatiAPI_EndpointResources.account;
    var httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener("load", reqListener);
    
    httpRequest.open("GET", resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.send();

    httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
                
        var currencies = JSON.parse(httpRequest.responseText);
         
         var keys = Object.keys(currencies);
         
        var sellDd = document.getElementById('sellDropdown');
        var purchaseDd = document.getElementById('purchaseDropdown');
         for (var i = 1; i < keys.length; i++) {
             if(keys[i] !== "usd"){
                sellDd.innerHTML = sellDd.innerHTML +
                '<option value="' + keys[i] + '">' + keys[i] + '</option>';
                purchaseDd.innerHTML = purchaseDd.innerHTML +
                '<option value="' + keys[i] + '">' + keys[i] + '</option>';
             }
                
          }
      }
    };
}
var nagyvallalatiAPI = {
    url: "https://obudai-api.azurewebsites.net/api/",
    CsCs_APIKEY: "F98143CD-1DAF-4D4A-A929-E6588AD72C8B",
    headerTokenType: "X-Access-Token",
    headerContentType: "Content-Type",
    myContentType: "application/json"
};

var nagyvallalatiAPI_EndpointResources = {
    exchange: nagyvallalatiAPI.url + "exchange/",
    account: nagyvallalatiAPI.url + "account/",
    purchase: nagyvallalatiAPI.url + "account/purchase/",
    sell: nagyvallalatiAPI.url + "account/sell/",
    reset: nagyvallalatiAPI.url + "account/reset/"
};
//Sell
function SendSellRequest() {
    document.getElementById("sellButton").disabled = true; 
    document.getElementById("purchaseButton").disabled = true; 
    var selectList = document.getElementById('sellDropdown');
    var currency = selectList.options[selectList.selectedIndex].value.toUpperCase();
    var amount = document.getElementById('sellAmount').value;
    var resource = nagyvallalatiAPI_EndpointResources.sell;

    var data = JSON.stringify({"Symbol":currency,"Amount":amount});

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                //Frissíteni az egyenleget!
                console.log('Sell: ' + amount + ' ' + currency);
            }
            else if(this.status === 400){
                var responseMsg = JSON.parse(httpRequest.responseText);
                alert(responseMsg.Message);
            }
            document.getElementById("sellButton").disabled = false; 
            document.getElementById("purchaseButton").disabled = false; 
        }
        };
    httpRequest.open("POST", resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerContentType, nagyvallalatiAPI.myContentType);
    httpRequest.send(data);
}
//Purchase
function SendPurchaseRequest() {
    document.getElementById("sellButton").disabled = true; 
    document.getElementById("purchaseButton").disabled = true; 
    var selectList = document.getElementById('sellDropdown');
    var currency = selectList.options[selectList.selectedIndex].value.toUpperCase();
    var amount = document.getElementById('purchaseAmount').value;
    var resource = nagyvallalatiAPI_EndpointResources.purchase;

    var data = JSON.stringify({"Symbol":currency,"Amount":amount});

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                //Frissíteni az egyenleget!
                console.log('Purchase: ' + amount + ' ' + currency);
            }
            else if(this.status === 400){
                var responseMsg = JSON.parse(httpRequest.responseText);
                alert(responseMsg.Message);
            }
            document.getElementById("sellButton").disabled = false; 
            document.getElementById("purchaseButton").disabled = false; 
        }
        };
    httpRequest.open("POST", resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerContentType, nagyvallalatiAPI.myContentType);
    httpRequest.send(data);
}

function GetCurrency() {
    var currency = document.getElementById('currency_type').value;
    var resource = nagyvallalatiAPI_EndpointResources.exchange + currency;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", resource, true);
    oReq.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    oReq.send();
}

function reqListener() {
    var currency = JSON.parse(this.responseText);
    // if error?
    console.log(this.responseText);
    document.getElementById("currency_name").innerHTML = currency.symbol;
    document.getElementById("currency_value").innerHTML = currency.currentRate;
}

function getBalance() {
    var httpRequest;
    var resource = nagyvallalatiAPI_EndpointResources.account;
    document.getElementById("getBalanceButton").addEventListener('click', makeRequest);

    function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', resource, true);
        httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
        httpRequest.send();
    }

    function alertContents() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var balanceData = JSON.parse(httpRequest.responseText);
                    document.getElementById("balanceAmount").innerText = balanceData.usd + " $";
                } else {
                    alert('There was a problem with the request.');
                }
            }
        }
        catch (e) {
            alert('Caught Exception: ' + e.description);
        }
    }

    


    //Sell functions
    

    
}