var options = {
    chart: {
        height: "100%",
        width: "100%",
        type: "area",
        animations: {
            initialAnimation: {
                enabled: false
            }
        }
    },
    title: {
        text: "CsCs-CryptoTrader chart",
        align: "center"
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: "smooth",
        width: 3
    },
    series: [{
        name: "BTC",
        data: [
            [1544515200000, 8799.15],
            [1544518800000, 8800.20],
            [1544522400000, 8801.12],
            [1544526000000, 8800.34],
            [1544529600000, 8802.14],
            [1544533200000, 8801.09]
        ]
    }],
    xaxis: {
        type: 'datetime'
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();