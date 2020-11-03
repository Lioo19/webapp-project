import m from "mithril";

import { baseLED } from "../vars.js";

var viewAll  = {
    baseurl: baseLED,
    listAllLED: [],
    getAllLED: function () {
        m.request({
            url: `${viewAll.baseurl}`,
            method: "GET"
        }).then(function(result) {
            for (var i = 0; i < result.records.length; i++) {
                var temp = {
                    name: result.records[i].fields.namn,
                    part: result.records[i].fields.delstracka,
                    langd: result.records[i].fields.langd,
                    id: result.records[i].recordid
                };

                viewAll.listAllLED.push(temp);
            }
        });
    },
    currentLED: {},
    currentCoordinates: [],
    currentCoordinatesArray: [],
    getSingleLED: function(ledId) {
        m.request({
            url: `${viewAll.baseurl}&refine.recordid=${ledId}`,
            method: "GET"
        }).then(function(result) {
            viewAll.currentLED = result.records[0].fields;
            viewAll.currentCoordinatesArray = result.records[0].fields.geo_shape.coordinates;
            viewAll.currentCoordinates = result.records[0].fields.geo_point_2d;
        });
    },
    currentFilter: [],
    num1: "",
    num2: "",
    filterLED: function (inp) {
        viewAll.num1 = "";
        viewAll.num2 = "";
        m.request({
            url: `${viewAll.baseurl}`,
            method: "GET"
        }).then(function(result) {
            if (inp === "1000") {
                viewAll.currentFilter = result.records.filter(function(led) {
                    return led.fields.langd <= inp;
                });
            } else if (inp === "9000") {
                viewAll.currentFilter = result.records.filter(function(led) {
                    return led.fields.langd >= inp;
                });
            } else {
                viewAll.num1 = inp.slice(0, 4);
                viewAll.num2 = inp.slice(5, 9);
                viewAll.currentFilter = result.records.filter(function(led) {
                    if (led.fields.langd >= viewAll.num1 && led.fields.langd <= viewAll.num2) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        });
    }
};

export default viewAll;
