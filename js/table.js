const HistoryTableHeaders = document.getElementById("HistoryTableHeader").getElementsByTagName("th");
const HistoryTableBody = document.getElementById("HistoryTableBody");

function GetHistory() {
    var resource = nagyvallalatiAPI_EndpointResources.history;
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', resource, true);
    httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
    httpRequest.send();
}

var resource = nagyvallalatiAPI_EndpointResources.history;
var httpRequest = new XMLHttpRequest();

httpRequest.addEventListener("load", historyListener);
httpRequest.open('GET', resource, true);
httpRequest.setRequestHeader(nagyvallalatiAPI.headerTokenType, nagyvallalatiAPI.CsCs_APIKEY);
httpRequest.send();

function historyListener() {
    var historyJSON = JSON.parse(this.responseText);
    var latesttime = document.getElementById("latestTime")

    for (i = historyJSON.length - 1; i > 0; i--) {
        if (historyJSON[i].type == "Reset") { continue; }
        if (Date.parse(historyJSON[i].createdAt) == latesttime.innerText) { break; }

        var newrow = document.createElement("tr");
        for (j = 0; j < HistoryTableHeaders.length; j++) {
            var tdnode = document.createElement("td");

            switch (HistoryTableHeaders[j].id) {
                case "createdAt":
                    tdnode.innerText = historyJSON[i][HistoryTableHeaders[j].id];
                    break;
                case "exchangeRate":
                    currentrate = historyJSON[i].exchangeRates["btc"];
                    tdnode.innerText = currentrate * historyJSON[i].amount;
                    break;
                default:
                    tdnode.innerText = historyJSON[i][HistoryTableHeaders[j].id];
            }
            newrow.appendChild(tdnode);
        }
        HistoryTableBody.appendChild(newrow);
    }
    latesttime.innertext = Date.parse(historyJSON[historyJSON.length - 1].createdAt);
    console.log(Date.parse(historyJSON[historyJSON.length - 1].createdAt));
}