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

    for (i = historyJSON.length - 1; i > 0; i--) {

        if (historyJSON[i].type == "Reset") {
            continue;
        }

        var newrow = document.createElement("tr");

        for (j = 0; j < HistoryTableHeaders.length; j++) {

            var tdnode = document.createElement("td");

            switch (HistoryTableHeaders[j].id) {
                case "createdAt":
                    var datestring = historyJSON[i][HistoryTableHeaders[j].id]
                    tdnode.innerText = String(datestring).replace("T", " ").substring(0, 19);
                    break;
                case "exchangeRate":
                    // ennyiért vettem meg vagy adtam el az adott pillanatban:
                    currentrate = historyJSON[i].exchangeRates[(historyJSON[i].symbol).toLowerCase()];
                    tdnode.innerText = Number(currentrate * historyJSON[i].amount).toFixed(2) + " $";
                    break;
                case "type":
                    if (historyJSON[i].type == "Purchase") {
                        tdnode.innerText = "Vásárlás";
                    } else if (historyJSON[i].type == "Sell") {
                        tdnode.innerText = "Eladás";
                    } else {
                        tdnode.innerText = "Reset";
                    }
                    break;
                default:
                    tdnode.innerText = historyJSON[i][HistoryTableHeaders[j].id];
            }

            newrow.appendChild(tdnode);
        }

        HistoryTableBody.appendChild(newrow);
    }
}