"use strict";

import m from 'mithril';

import { menu } from "./menu.js";

let layout = {
    view: function(vnode) {
        return [
            m("main.container", vnode.children),
            m(menu)
        ];
    }
};


export { layout };
