async function loadingSpinner(delay, fade, disableui){
    if(delay>0){await sleep(delay);}
    if(fade){document.body.className += ' fade-out';}

    var spinner = document.createElement("div");
    spinner.setAttribute("id","spinner");
    spinner.classList = "loader centered";
    document.body.appendChild(spinner);


    if(!loadingenabled){
        var spinner = document.getElementById("spinner");
        document.body.removeChild(spinner);
    }
    else{

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}