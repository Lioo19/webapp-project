import m from "mithril";

import { authURL, apikey } from "../vars.js";
import auth from "./auth.js";


var manageAchievements = {
    url: `${authURL}data`,
    check: true,
    listAchieved: [],
    data: {
        artefact: null,
        api_key: apikey
    },
    addTo: function() {
        m.request({
            url: `${manageAchievements.url}?api_key=${manageAchievements.data.api_key}`,
            method: "GET",
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            // console.log(result);
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].artefact === manageAchievements.data.artefact) {
                    console.log(result.data[i].artefact);
                    console.log(manageAchievements.data.artefact);
                    console.log("BREAK");
                    manageAchievements.check = false;
                }
            }
        }).then(function() {
            if (manageAchievements.check) {
                m.request({
                    url: manageAchievements.url,
                    method: "POST",
                    body: manageAchievements.data,
                    headers: {
                        'x-access-token': auth.token
                    }
                });
            }
            manageAchievements.check = true;
        });
    },
    listUserData: [],
    getAllUserData: function() {
        manageAchievements.listUserData = [];
        m.request({
            url: `${manageAchievements.url}?api_key=${manageAchievements.data.api_key}`,
            method: "GET",
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            // console.log(result)
            for (var i = 0; i < result.data.length; i++) {
                var temp = result.data[i].artefact;

                manageAchievements.listUserData.push(temp);
            }
        });
    }
};

export default manageAchievements;
