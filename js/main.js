const url = "https://obudai-api.azurewebsites.net/api/exchange/";
const CsCs_APIKEY = "F98143CD-1DAF-4D4A-A929-E6588AD72C8B";

function GetCurrency(){
  var currency = document.getElementById('currency_type').value;
  var resource = url + currency;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", resource, true);
  oReq.setRequestHeader("X-Access-Token", CsCs_APIKEY)
  oReq.send();
}

function reqListener() {
  var currency = JSON.parse(this.responseText);
  // if error?
  document.getElementById("currency_name").innerHTML = currency.symbol;
  document.getElementById("currency_value").innerHTML = currency.currentRate;
}