// Variables
var SpinnerOn = false;

var activeHttpRequestCounter = {
    CountInternal: 0,
    countListener: function (val) { },
    set count(val) {
        this.CountInternal = val;
        this.countListener(val);
    },
    get count() {
        return this.CountInternal;
    },
    registerListener: function (listener) {
        this.countListener = listener;
    }
}

activeHttpRequestCounter.registerListener(function (val) {
    onCounterValueChange();
});

// Handle Http requests (!!!EDITED PROTOTYPE!!!)

var open = window.XMLHttpRequest.prototype.open,
    send = window.XMLHttpRequest.prototype.send;

function openReplacement(method, url, async, user, password) {
    this._url = url;
    return open.apply(this, arguments);
}

function sendReplacement(data) {

    if (this.onload){
        this._onload = this.onload;
    }
    if (this.onerror){
        this._onerror = this.onerror;
    }
    activeHttpRequestCounter.count++;
    this.onload = onLoadReplacement;
    this.onerror = onErrorReplacement;
    return send.apply(this, arguments);
}

function onLoadReplacement() {
    activeHttpRequestCounter.count--;
    if (this._onload) {
        return this._onload.apply(this, arguments);
    }
}

function onErrorReplacement() {
    loadingSpinnerOff();
    if (this._onerror) {
        return this._onerror.apply(this, arguments);
    }
}

window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;

// Handle Spinner based on counter

function onCounterValueChange() {
    if (activeHttpRequestCounter.count == 0) { loadingSpinnerOff(); }
    else { loadingSpinnerOn(0,true,true); }
}

// Spinner Functions
async function loadingSpinnerOn(delay, fade, disablebody) {
    if (SpinnerOn) { return; }
    
    var spinner = document.createElement("div");
    spinner.setAttribute("id", "spinner");
    spinner.classList = "loader centered";

    if (fade) { document.body.classList.add('fade-out'); }
    if (disablebody) { document.body.classList.add('disabled'); }
    if (delay > 0) { await sleep(delay); }

    document.body.appendChild(spinner);
    SpinnerOn = true;
}

async function loadingSpinnerOff() {
    SpinnerOn = false;
    document.body.classList.remove('fade-out');
    document.body.classList.remove('disabled');
    var spinner = document.getElementById("spinner");    
    if(spinner!=null){spinner.remove();}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}