"use strict";

import m from "mithril";

import viewAll from "../models/viewAll.js";
import manageAchievements from "../models/manageachievements.js";
// import position from "../models/position.js";


var addto = {
    oninit: function(vnode) {
        manageAchievements.data.artefact = `${vnode.attrs.id}`;
        manageAchievements.addTo();
    },
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            setTimeout(function() {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
    view: function(vnode) {
        // console.log(vnode.attrs);
        return m("main.thirdmain.contain.slide-in.details-" + vnode.attrs.id, [
            m("h2", "Bra jobbat!"),
            m("p", "Du har klarat av sträckan "
            + viewAll.currentLED.delstracka +
            " som är en del av "
            + viewAll.currentLED.namn),
            m("br"),
            m("p", "Du hittar alla dina avklarade leder under din Profil."),
            m("br"),
            m("a.buttonwithspace", { href: "#!/all", oncreate: m.route.link }, "Tillbaka")
        ]);
    }
};


export { addto };
