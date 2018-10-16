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
    reset: nagyvallalatiAPI.url + "account/reset/",
    history: nagyvallalatiAPI.url + "account/history/"
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        initFunctions();
    }, false);
} else {  // `DOMContentLoaded` already fired
    initFunctions();
}

function initFunctions() {
    getBalance()
    populateDropdowns();
}

function getBalance() {

    var httpRequest;
    var resource = nagyvallalatiAPI_EndpointResources.account;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = balance;

    httpRequest.open('GET', resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.send();

    function balance() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var balanceData = JSON.parse(httpRequest.responseText);
                    document.getElementById("balanceAmount").textContent += Number.parseFloat(balanceData.usd).toFixed(2) + " $";
                    document.getElementById("btc").textContent += Number.parseFloat(balanceData.btc).toFixed(2) + " ₿";
                    document.getElementById("eth").textContent += Number.parseFloat(balanceData.eth).toFixed(2) + " Ξ";
                    document.getElementById("xrp").textContent += Number.parseFloat(balanceData.xrp).toFixed(2) + " X";
                } else {
                    alert('There was a problem with the request.');
                }
            }
        } catch (e) {
            alert('Caught Exception: ' + e.description);
        }
    }
}