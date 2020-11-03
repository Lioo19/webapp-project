import m from "mithril";

import { baseSMHI } from "../vars.js";

//This entire module is not very pretty, but it works.
var getWeekday = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag"
];

var smhiModel  = {
    baseurl: baseSMHI,
    listBaseSMHI: [],
    getBaseSMHI: function () {
        smhiModel.listBaseSMHI = [];
        m.request({
            url: `${smhiModel.baseurl}/lon/20.263035/lat/63.825848/data.json`,
            method: "GET"
        }).then(function(result) {
            console.log(result);
            var today = new Date();

            var date = today.getDate().toString();

            if (date < 10) {
                date = "0" + date;
            }

            var day = today.getDay();

            var weekday = getWeekday[day];

            for (var i = 0; i < result.timeSeries.length; i++) {
                if (result.timeSeries[i].validTime.slice(11, 13) === "12") {
                    var temp1 = {
                        temperature: result.timeSeries[i].parameters[1].values[0],
                        date: result.timeSeries[i].validTime.slice(0, 16),
                        windSpeed: result.timeSeries[i].parameters[4].values[0],
                        pMin: result.timeSeries[i].parameters[12].values[0],
                        pMax: result.timeSeries[i].parameters[13].values[0],
                        symbol: result.timeSeries[i].parameters[18].values[0]
                    };

                    smhiModel.listBaseSMHI.push(temp1);
                }
            }
            var test = false;

            for (var j = 0; j < smhiModel.listBaseSMHI.length; j++) {
                //Checks if the current date is in the array
                console.log(smhiModel.listBaseSMHI[j].date);
                if (smhiModel.listBaseSMHI[j].date.slice(8, 10) === date) {
                    test = true;
                }
            }
            //if it isn't, add first entry in API to first spot in array.
            if (test === false) {
                var temp6 = {
                    temperature: result.timeSeries[0].parameters[1].values[0],
                    date: result.timeSeries[0].validTime.slice(0, 16),
                    windSpeed: result.timeSeries[0].parameters[4].values[0],
                    pMin: result.timeSeries[0].parameters[12].values[0],
                    pMax: result.timeSeries[0].parameters[13].values[0],
                    symbol: result.timeSeries[0].parameters[18].values[0],
                    day: weekday
                };

                smhiModel.listBaseSMHI.unshift(temp6);
            }
            for (var k = 1; k < 6; k++) {
                weekday = getWeekday[day+k];
                smhiModel.listBaseSMHI[k].day = weekday;
            }
            console.log(smhiModel.listBaseSMHI);
        });
    },
    listSingleSMHI: [],
    getSingleSMHI: function(lon, lat) {
        smhiModel.listSingleSMHI = [];
        m.request({
            url: `${smhiModel.baseurl}/lon/${lon}/lat/${lat}/data.json`,
            method: "GET"
        }).then(function(result) {
            var temp2 = {
                temperature: result.timeSeries[0].parameters[1].values[0],
                windSpeed: result.timeSeries[0].parameters[4].values[0],
                preMedian: result.timeSeries[0].parameters[17].values[0],
                symbol: result.timeSeries[0].parameters[18].values[0]
            };

            smhiModel.listSingleSMHI.push(temp2);
        });
    }
};

export default smhiModel;
