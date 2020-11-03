"use strict";

import m from 'mithril';

var menu = {
    navParts: [
        {link: "#!/", name: "/", icon: "explore", text: "Start"},
        // {link: "#!/all", name: "/all", icon: "local_shipping", text: "Visa Alla"},
        {link: "#!/achievements", name: "/achievements", icon: "person_pin", text: "Profil"},
        // {link: "#!/login", name: "/login", icon: "account_circle", text: "Logga in"},
    ],

    view: function () {
        return m("nav.bottom-nav", [
            menu.navParts.map(function(e) {
                if (m.route.get() === e.name) {
                    return m("a.active",
                        { href: e.link, oncreate: m.route.link },
                        m("i.material-icons", e.icon),
                        m("p.icon-text", e.text),
                    );
                } else {
                    return m("a",
                        { href: e.link, oncreate: m.route.link },
                        m("i.material-icons", e.icon),
                        m("p.icon-text", e.text),
                    );
                }
            })
        ]);
    }
};

export { menu };

//the active link does not yet work, but the rest is fine!
//possible icons: library_books
