import m from "mithril";

import registerModel from "../models/register.js";


var register = {
    oninit: registerModel.clear,
    view: function() {
        return m("main.thirdmain", [
            m("h1", "Skapa Användare"),
            m("p", "Som inloggad användare kan du spara de leder du vandrat på din profil!"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    registerModel.registerUser();
                }
            }, [
                m("label.input-label", "Epost"),
                m("input[type=email][required=required][placeholder=Din Epostadress].input", {
                    oninput: function(event) {
                        registerModel.email = event.target.value;
                    }
                }),
                m("br"),
                m("label.input-label", "Lösenord"),
                m("input[type=password][required=required][placeholder=Ditt Lösenord].input", {
                    oninput: function(event) {
                        registerModel.password = event.target.value;
                    }
                }),
                m("br"),
                m("input[type=submit][value=Skapa användare].button", "Skapa användare")
            ])
        ]);
    }
};


export { register };
