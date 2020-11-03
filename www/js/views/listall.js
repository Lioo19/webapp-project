import m from "mithril";

import viewAll from "../models/viewall.js";
import auth from "../models/auth.js";
import manageAchievements from "../models/manageachievements.js";


var componentForEachPart = {
    view: function(vnode) {
        return [
            m("a.list-item", {
                href: "#!/all/" + vnode.attrs.singleLED.id, oncreate: m.route.link
            }, [
                m("h5", vnode.attrs.singleLED.name ),
                m("p.length", "Längd: " + vnode.attrs.singleLED.langd + " m"),
                m("br"),
                m("p.part", "Del: " + vnode.attrs.singleLED.part),
            ]
            )];
    }
};

var componentForAchieved = {
    view: function(vnode) {
        return [
            m("a.list-item list-item-ach", {
                href: "#!/all/" + vnode.attrs.singleLED.id, oncreate: m.route.link
            }, [
                m("i.material-icons list-icon", "check"),
                m("h5", vnode.attrs.singleLED.name ),
                m("p.length", "Längd: " + vnode.attrs.singleLED.langd + " m"),
                m("br"),
                m("p", "Del: " + vnode.attrs.singleLED.part),
            ]
            )];
    }
};

var listAll = {
    oninit: viewAll.getAllLED,
    view: function() {
        if (viewAll.listAllLED.length != 0) {
            // console.log(m.route.get());
            switch (m.route.get()) {
                case "/all":
                    return m("main.secondmain", [
                        m("div.filter-icon",
                            m("a", {
                                href: "#!/all/filter/",
                                oncreate: m.route.link
                            },
                            m("i.material-icons", "filter_alt"))
                        ),
                        m("h1.listallH1", "Alla leder"),
                        m("div.leder", viewAll.listAllLED.map(function (singleLED) {
                            if (auth.token) {
                                if (manageAchievements.listUserData.includes(singleLED.id)) {
                                    return [
                                        m(componentForAchieved, { singleLED: singleLED })
                                    ];
                                } else {
                                    return [
                                        m(componentForEachPart, { singleLED: singleLED })
                                    ];
                                }
                            } else {
                                return [
                                    m(componentForEachPart, { singleLED: singleLED })
                                ];
                            }
                        }))
                    ]);
                    // break;
                case "/all/filter/":
                    return m("main.secondmain", [
                        m("div.filter-icon",
                            m("a", {
                                href: "#!/all",
                                oncreate: m.route.link
                            },
                            m("i.material-icons", "filter_alt"))
                        ),
                        m("h1.listallH1", "Alla leder"),
                        m("div.leder", viewAll.listAllLED.map(function (singleLED) {
                            return [
                                m(componentForEachPart, { singleLED: singleLED })
                            ];
                        }))
                    ]);
                    // break;
            }
        } else {
            return [
                m("main.secondmain"),
                m("h1.listallH1", "Alla Leder"),
                m("p", "Just nu finns det inga tillgängliga leder!")
            ];
        }
    }
};


export { listAll };
