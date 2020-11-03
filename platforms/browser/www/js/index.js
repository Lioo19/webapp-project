
"use strict";

import m from "mithril";

import { layout } from "./views/layout.js";
import { login } from "./views/login.js";
import { register } from "./views/register.js";
import { frontpage } from "./views/frontpage.js";
import { listAll } from "./views/listall.js";
import { filter } from "./views/filter.js";
import { addto } from "./views/addto.js";
import { achievements } from "./views/achievements.js";
import { singlePoint } from "./views/singlepoint.js";
import { listFilter } from "./views/listfilter.js";
import auth from "./models/auth.js";
// import manageAchievements from "./models/manageachievements.js";

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        m.route(document.body, "/", {
            "/": {
                render: function() {
                    return m(layout, m(frontpage));
                }
            },
            "/login": {
                render: function() {
                    return m(layout, m(login));
                }
            },
            "/register": {
                render: function() {
                    return m(layout, m(register));
                }
            },
            "/all": {
                render: function() {
                    return m(layout, m(listAll));
                }
            },
            "/all/filter": {
                render: function() {
                    // console.log(vnode.attrs);
                    //for filtering the results
                    return m(layout, m(filter), m(listAll));
                }
            },
            "/all/filter/:filter": {
                render: function(vnode) {
                    // console.log(vnode.attrs);
                    //for filtering the results
                    return m(layout, m(listFilter, vnode.attrs));
                }
            },
            "/all/:id": {
                render: function(vnode) {
                    // console.log(vnode.attrs);
                    return m(layout, m(singlePoint, vnode.attrs));
                }
            },
            "/achievements": {
                render: function() {
                    if (auth.token) {
                        return m(layout, m(achievements));
                    }
                    return m.route.set("login");
                }
            },
            "/achievements/:id": {
                render: function(vnode) {
                    // console.log(vnode.attrs);
                    return m(layout, m(singlePoint, vnode.attrs));
                }
            },
            "/all/addto/:id": {
                render: function(vnode) {
                    if (auth.token) {
                        return m(layout, m(addto, vnode.attrs));
                    }
                    return m.route.set("login");
                }
            }
        });
    }
};

app.initialize();
