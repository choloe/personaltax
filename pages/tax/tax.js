Page({
    data: {
        wage: 0,
        beginMoney: 0,
        social: 0,
        tax: 0,
        criticalAarray: [0, 1500, 4500, 9000, 35000, 55000, 80000],
        taxRatesArray: [0, 0.03, 0.10, 0.20, 0.25, 0.30, 0.35, 0.45],
        taxArray: []
    },
    onLoad: function (e) {
        var tax = this.getTax(e.wage - e.social, e.beginMoney);
        this.setData({
            beginMoney: e.beginMoney,
            wage: e.wage,
            social: e.social,
            tax: tax
        });
    },
    getTax: function (salary, beginMoney) {
        var criticalAarray = this.data.criticalAarray;
        var taxRatesArray = this.data.taxRatesArray;
        var taxs = 0;
        var needTax = salary - beginMoney;
        var taxArray = [];
        if (needTax > 0) {
            for (var i = 1; i < criticalAarray.length; i++) {
                var tax = 0;
                if (needTax >= criticalAarray[i]) {
                    tax = (criticalAarray[i] - criticalAarray[i - 1]) * taxRatesArray[i];
                    taxs += tax;
                    taxArray.push(tax);
                    if (i == criticalAarray.length - 1) {
                        tax = (needTax - criticalAarray[i]) * taxRatesArray[i + 1];
                        taxs += tax;
                        taxArray.push(tax);
                    }
                } else {
                    tax = (needTax - criticalAarray[i - 1]) * taxRatesArray[i];
                    taxs += tax;
                    taxArray.push(tax);
                    console.log(criticalAarray[i]);
                    console.log(taxRatesArray[i]);
                    break;
                }
            }
        }
        this.setData({
            taxArray: taxArray
        });
        return taxs;
    }
})