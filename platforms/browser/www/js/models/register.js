import m from "mithril";

import { authURL, apikey } from "../vars.js";

var registerModel = {
    url: `${authURL}register`,
    email: "",
    password: "",

    clear: function() {
        registerModel.email = "";
        registerModel.password = "";
    },

    registerUser: function() {
        var userInput = {
            email: registerModel.email,
            password: registerModel.password,
            api_key: apikey
        };

        m.request({
            url: registerModel.url,
            method: "POST",
            body: userInput
        }).then(function(result) {
            if (result.data) {
                m.route.set("/login");
            } else {
                m("p", "Det där gick inte, försök igen!");
            }
        });
    }
};

export default registerModel;
