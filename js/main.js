/*
 * Variables to store API data
 */

const nagyvallalatiAPI = {
    url: "https://obudai-api.azurewebsites.net/api/",
    CsCs_APIKEY: "F98143CD-1DAF-4D4A-A929-E6588AD72C8B",
    headerTokenType: "X-Access-Token",
    headerContentType: "Content-Type",
    myContentType: "application/json"
};

const nagyvallalatiAPI_EndpointResources = {
    exchange: nagyvallalatiAPI.url + "exchange/",
    account: nagyvallalatiAPI.url + "account/",
    purchase: nagyvallalatiAPI.url + "account/purchase/",
    sell: nagyvallalatiAPI.url + "account/sell/",
    reset: nagyvallalatiAPI.url + "account/reset/",
    history: nagyvallalatiAPI.url + "account/history/"
};

const btc = {
    name: "Bitcoin",
    mark: "BTC",
    symbol: "Ƀ"
}

const eth = {
    name: "Ethereum",
    mark: "ETH",
    symbol: "Ξ"
}

const xrp = {
    name: "Ripple",
    mark: "XRP",
    symbol: "X"
}

const cryptoCurrencies = {
    bitcoin: btc,
    ethereum: eth,
    ripple: xrp
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        initFunctions();
    }, false);
} else {  // `DOMContentLoaded` already fired
    initFunctions();
}

function initFunctions() {
    getBalance();
    populateSelects();
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
                    document.getElementById("balanceAmount").textContent = "Készpénz : " + Number.parseFloat(balanceData.usd).toFixed(2) + " $";
                    document.getElementById("btc").textContent = cryptoCurrencies.bitcoin.name + " : " + Number.parseFloat(balanceData.btc).toFixed(2) + " " + cryptoCurrencies.bitcoin.symbol;
                    document.getElementById("eth").textContent = cryptoCurrencies.ethereum.name + " : " + Number.parseFloat(balanceData.eth).toFixed(2) + " " + cryptoCurrencies.ethereum.symbol;
                    document.getElementById("xrp").textContent = cryptoCurrencies.ripple.name + " : " + Number.parseFloat(balanceData.xrp).toFixed(2) + " " + cryptoCurrencies.ripple.symbol;
                } else {
                    alert('There was a problem with the request.');
                }
            }
        } catch (e) {
            alert('Caught Exception: ' + e.description);
        }
    }
}

function populateSelects() {
    var resource = nagyvallalatiAPI_EndpointResources.account;
    var httpRequest = new XMLHttpRequest();

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
                if (keys[i] !== "usd") {
                    purchaseDd.innerHTML += '<option value="' + keys[i] + '">' + keys[i] + '</option>';
                    sellDd.innerHTML += '<option value="' + keys[i] + '">' + keys[i] + '</option>';
                }
            }
        }
    };
}

//Vásárás:

function SendPurchaseRequest() {
    document.getElementById("sellButton").disabled = true;
    document.getElementById("purchaseButton").disabled = true;

    var selectList = document.getElementById('purchaseDropdown');
    var currency = selectList.options[selectList.selectedIndex].value.toUpperCase();
    var amount = document.getElementById('purchaseAmount').value;
    if (isNaN(amount)){
        alert("A beirt osszeg nem egy szam!");
    }
    var resource = nagyvallalatiAPI_EndpointResources.purchase;

    var data = JSON.stringify({ "Symbol": currency, "Amount": amount });

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                getBalance();
                GetHistory();
            }
            else if (this.status === 400) {
                var responseMsg = JSON.parse(httpRequest.responseText);
                alert(responseMsg.Message);
            }
            document.getElementById("sellButton").disabled = false;
            document.getElementById("purchaseButton").disabled = false;
            document.getElementById('purchaseAmount').value = "";
        }
    };
    httpRequest.open("POST", resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerContentType, nagyvallalatiAPI.myContentType);
    httpRequest.send(data);
}

//Eladás:

function SendSellRequest() {
    document.getElementById("sellButton").disabled = true;
    document.getElementById("purchaseButton").disabled = true;

    var selectList = document.getElementById('sellDropdown');
    var currency = selectList.options[selectList.selectedIndex].value.toUpperCase();
    var amount = document.getElementById('sellAmount').value;
    if (isNaN(amount)){
        alert("A beirt osszeg nem egy szam!");
    }
    var resource = nagyvallalatiAPI_EndpointResources.sell;

    var data = JSON.stringify({ "Symbol": currency, "Amount": amount });

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                getBalance();
            }
            else if (this.status === 400) {
                var responseMsg = JSON.parse(httpRequest.responseText);
                alert(responseMsg.Message);
            }
            document.getElementById("sellButton").disabled = false;
            document.getElementById("purchaseButton").disabled = false;
            document.getElementById('sellAmount').value = "";
        }
    };
    httpRequest.open("POST", resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerContentType, nagyvallalatiAPI.myContentType);
    httpRequest.send(data);
}

// Reset:

function sendReset() {
    var resource = nagyvallalatiAPI_EndpointResources.reset;
    var httpRequest;
    document.getElementById("resetButton").addEventListener('click', makeReset);

    function makeReset() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('POST', resource, true);
        httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
        httpRequest.setRequestHeader(nagyvallalatiAPI.headerContentType, nagyvallalatiAPI.myContentType);
        httpRequest.send();
    }

    function alertContents() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    getBalance();
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