"use strict";

import m from "mithril";

import viewAll from "../models/viewAll.js";
import smhiModel from "../models/smhimodel.js";
import position from "../models/position.js";
import auth from "../models/auth.js";
import manageAchievements from "../models/manageachievements.js";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import { OpenStreetMapProvider } from "leaflet-geosearch";

/* eslint-disable no-unused-vars */

var map;
var geosearch;


function showMap() {
    map = L.map("map").setView([63.825848, 20.263035], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);

    geosearch = new OpenStreetMapProvider();
}

function renderMarker() {
    // console.log(viewAll.currentCoordinates[0]);
    // console.log(viewAll.currentCoordinates[1]);
    L.marker([viewAll.currentCoordinates[0], viewAll.currentCoordinates[1]]).addTo(map);
    //sets the view for current location
    map.setView([viewAll.currentCoordinates[0], viewAll.currentCoordinates[1]], 12);
}

var locationMarker = L.icon({
    iconUrl: 'location.png',

    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});

function showPosition() {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [position.currentPosition.latitude, position.currentPosition.longitude],
            {icon: locationMarker}
        ).addTo(map).bindPopup("Din plats");
    }
}

function getSMHI() {
    if (viewAll.currentCoordinates[0] && viewAll.currentCoordinates[1]) {
        smhiModel.getSingleSMHI(viewAll.currentCoordinates[1], viewAll.currentCoordinates[0]);
    } else {
        smhiModel.getSingleSMHI(20.263035, 63.825848);
    }
}

var smhiComponent = {
    view: function() {
        return [
            m("p.detailheader", "Vädret just nu: "),
            m("p.detail", "Temperatur: " +
            smhiModel.listSingleSMHI[0].temperature + "°C, Vind: " +
            smhiModel.listSingleSMHI[0].windSpeed + "m/s, Regn: " +
            smhiModel.listSingleSMHI[0].preMedian + "ml")
        ];
    }
};

var comp = {
    view: function(vnode) {
        return [
            m("main.contain.slide-in.details-" + vnode.attrs.id, [
                m("div#map.map", ""),
                m("div. detaildiv", [
                    m("p.detailheader", "Namn: "),
                    m("p.detail", viewAll.currentLED.delstracka),
                    m("p.detailheader", "Del av: "),
                    m("p.detail", viewAll.currentLED.namn),
                    m("p.detailheader", "Kommun: " ),
                    m("p.detail", viewAll.currentLED.kommun),
                    m("p.detailheader", "Längd: " ),
                    m("p.detail", viewAll.currentLED.langd + "m"),
                    // m("p.detail", "Koordinater till start: " + viewAll.currentCoordinates),
                    smhiModel.listSingleSMHI.length != 0 ? m(smhiComponent) : null,
                    auth.token.length != 0 &&
                    manageAchievements.listUserData.includes(vnode.attrs.id)
                        ? m("a.buttonach done", {
                            href: "#!/all/addto/" +  vnode.attrs.id,
                            oncreate: m.route.link
                        },
                        [
                            "Avklarad",
                            m("i.material-icons button-icon", "check")
                        ])
                        : m("a.buttonach not", {
                            href: "#!/all/addto/" +  vnode.attrs.id,
                            oncreate: m.route.link
                        },
                        "Markera som avklarad"),
                    m.route.get().slice(0, 4) === "/all"
                        ? m("a.detailbutton", {
                            href: "#!/all",
                            oncreate: m.route.link
                        }, "Tillbaka")
                        : m("a.detailbutton", {
                            href: "#!/achievements",
                            oncreate: m.route.link
                        }, "Tillbaka")
                ])
            ])
        ];
    }
};

var singlePoint = {
    oninit: function(vnode) {
        position.getPosition();
        viewAll.getSingleLED(vnode.attrs.id);
        getSMHI();
    },
    oncreate: function() {
        showMap();
    },
    onremove: function() {
        viewAll.currentCoordinates = [];
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
        if (viewAll.currentCoordinates.length > 1 && map) {
            renderMarker();
            // getCoordinates();
        }
        showPosition();
        return [
            m(comp, { id: vnode.attrs.id })
        ];
    }
};


export { singlePoint };
