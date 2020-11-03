import m from "mithril";

import viewAll from "../models/viewall.js";
import auth from "../models/auth.js";
import manageAchievements from "../models/manageachievements.js";

var componentForEachPart = {
    view: function(vnode) {
        return [
            m("a.list-item", {
                href: "#!/all/" + vnode.attrs.singleLED.recordid, oncreate: m.route.link
            }, [
                m("h5", vnode.attrs.singleLED.fields.namn ),
                m("p.length", "Längd: " + vnode.attrs.singleLED.fields.langd + " m"),
                m("br"),
                m("p.part", "Del: " + vnode.attrs.singleLED.fields.delstracka),
            ]
            )];
    }
};

var componentForAchieved = {
    view: function(vnode) {
        return [
            m("a.list-item list-item-ach", {
                href: "#!/all/" + vnode.attrs.singleLED.recordid, oncreate: m.route.link
            }, [
                m("i.material-icons list-icon", "check"),
                m("h5", vnode.attrs.singleLED.fields.namn ),
                m("p.length", "Längd: " + vnode.attrs.singleLED.fields.langd + " m"),
                m("br"),
                m("p", "Del: " + vnode.attrs.singleLED.fields.delstracka),
            ]
            )];
    }
};

var listFilter = {
    oninit: function(vnode) {
        viewAll.currentFilter = [];
        viewAll.filterLED(vnode.attrs.filter);
    },
    onremove: function() {
        viewAll.currentFilter = [];
    },
    view: function() {
        if (viewAll.currentFilter.length != 0) {
            return m("main.secondmain", [
                m("a.button", {
                    href: "#!/all", oncreate: m.route.link
                }, "Tillbaka"),
                m("h1.listallH1", "Filtrerade leder"),
                m("div.leder", viewAll.currentFilter.map(function (singleLED) {
                    if (auth.token) {
                        if (manageAchievements.listUserData.includes(singleLED.recordid)) {
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
        } else {
            return [
                m("main.secondmain"),
                m("h1", "Alla Leder"),
                m("p", "Inga leder matchade dina kriterier, vänligen filtrera om.")
            ];
        }
    }
};


export { listFilter };
