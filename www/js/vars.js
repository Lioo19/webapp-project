"use strict";

const authURL = "https://auth.emilfolino.se/";
//Ger just nu vädret i umeå-området
//Kanske är värt att visa mer överskådligt?
const baseSMHI = "http://opendata-download-metfcst.smhi.se/api/category/pmp3g/version"
                + "/2/geotype/point";
// 63.825848, 20.263035
// const baseLED = "https://opendata.umea.se/api/records/1.0/search/?dataset=vandringsleder&q="
// const baseLED = "https://opendata.umea.se/api/records/1.0/search/?dataset=vandringsleder&q=
// + "led&facet=namn&facet=delstracka&facet=klass&facet=langd";
const baseLED = "https://opendata.umea.se/api/records/1.0/search/?dataset=vandringsleder&q=&rows="
                + "100&facet=namn&facet=delstracka&facet=klass&facet=langd&facet=recordid";
const apikey = "00e437c68e34326ba5eda8263b8fe8b0";

export { authURL, baseSMHI, baseLED, apikey };
