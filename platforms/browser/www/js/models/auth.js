import m from "mithril";

//Token finns i vars (behöver update) för utveckling
import { authURL, apikey } from "../vars.js";

var auth = {
    url: `${authURL}login`,
    email: "",
    password: "",
    token: "",

    clear: function() {
        auth.email = "";
        auth.password = "";
    },

    login: function() {
        var payload = {
            email: auth.email,
            password: auth.password,
            api_key: apikey
        };

        m.request({
            url: auth.url,
            method: "POST",
            body: payload
        }).then(function(result) {
            auth.token = result.data.token;
            m.route.set("/achievements");
        });
    },

    logout: function() {
        auth.token = "";
    },
};

export default auth;

//Token finns i vars nu, endast för dev. Ta bort variabeln när prod.
