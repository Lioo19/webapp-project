import m from "mithril";

import auth from "../models/auth.js";

var logout = {
    oninit: function() {
        auth.clear,
        auth.logout;
    },
    view: function() {
        return m("main.thirdmain", [
            m("h1", "Utloggad"),
            m("p", "Du har nu blivit utloggad"),
            m("a.tinybutton", {
                href: "#!/login",
                oncreate: m.route.link
            }, "Logga in igen"),
        ]);
    }
};


export { logout };
