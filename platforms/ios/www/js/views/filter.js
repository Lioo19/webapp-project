"use strict";

import m from 'mithril';

var filter = {
    filterLinks: [
        {link: "/all", name: "#!/all", text: "Önskad längd:"},
        {link: "/all/filter/1000", name: "#!/all/filter/1000", text: "<1km"},
        {link: "/all/filter/1000-3000", name: "#!/all/filter/1000-3000", text: "1km - 3km"},
        {link: "/all/filter/3000-5000", name: "#!/all/filter/3000-5000", text: "3km - 5km"},
        {link: "/all/filter/5000-7000", name: "#!/all/filter/5000-7000", text: "5km - 7km"},
        {link: "/all/filter/7000-9000", name: "#!/all/filter/7000-9000", text: "7km - 9km"},
        {link: "/all/filter/9000", name: "#!/all/filter/9000", text: ">9km"}
    ],

    view: function () {
        return m("div.filter", [
            m("select.filter-field", {
                onchange: function(event) {
                    m.route.set(event.target.value);
                }
            },  filter.filterLinks.map(function(f) {
                return m("option", { value: f.link }, f.text);
            })),
        ]);
    }
};

export { filter };

//the active link does not yet work, but the rest is fine!
//possible icons: library_books
