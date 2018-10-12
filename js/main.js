/*
 * Variables to store API data
 */

const nagyvallalatiAPI = {
    url: "https://obudai-api.azurewebsites.net/api/",
    CsCs_APIKEY: "F98143CD-1DAF-4D4A-A929-E6588AD72C8B",
    headerTokenType: "X-Access-Token"
};

const nagyvallalatiAPI_EndpointResources = {
    exchange: nagyvallalatiAPI.url + "exchange/",
    account: nagyvallalatiAPI.url + "account/",
    purchase: nagyvallalatiAPI.url + "account/purchase/",
    reset: nagyvallalatiAPI.url + "account/reset/"
};

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
    var currencyValue = Number.parseFloat(currency.currentRate).toFixed(2);
    document.getElementById("currency_name").innerHTML = currency.symbol;
    document.getElementById("currency_value").innerHTML = currencyValue;
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
}