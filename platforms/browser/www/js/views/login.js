import m from "mithril";

import auth from "../models/auth.js";

var login = {
    oninit: auth.clear,
    view: function() {
        return m("main.thirdmain", [
            m("h1", "Logga in"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    auth.login();
                }
            }, [
                m("label.input-label", "Epost"),
                m("input[type=email][required=required].input", {
                    oninput: function(event) {
                        auth.email = event.target.value;
                    }
                }),
                m("br"),
                m("label.input-label", "Lösenord"),
                m("input[type=password][required=required].input", {
                    oninput: function(event) {
                        auth.password = event.target.value;
                    }
                }),
                m("br"),
                m("input[type=submit][value=Logga in].button", "Logga in")
            ]),
            m("a.tinybutton", {
                href: "#!/register",
                oncreate: m.route.link
            }, "Skapa Ny Användare"),
        ]);
    }
};


export { login };
