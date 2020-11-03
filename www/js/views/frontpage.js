import m from "mithril";

import smhiModel from "../models/smhimodel.js";


var weatherSymbol = {
    view: function(vnode) {
        switch (vnode.attrs.symbol) {
            case 1:
                return m("i.wi wi-day-sunny");
            case 2:
            case 3:
                return m("i.wi wi-day-sunny-overcast");
            case 4:
                return m("i.wi wi-day-cloudy");
            case 5:
            case 6:
                return m("i.wi wi-cloudy");
            case 7:
                return m("i.wi wi-fog");
            case 8:
            case 9:
            case 10:
                return m("i.wi wi-showers");
            case 11:
            case 21:
                return m("i.wi wi-thunderstorm");
            case 12:
            case 13:
            case 14:
            case 22:
            case 23:
            case 24:
                return m("i.wi wi-sleet");
            case 15:
            case 16:
            case 17:
            case 25:
            case 26:
            case 27:
                return m("i.wi wi-snow");
            case 18:
            case 19:
            case 20:
                return m("i.wi wi-rain");
        }
    }
};

var frontpage = {
    oninit: smhiModel.getBaseSMHI,

    filterLinks: [
        {link: "#!/all/filter/1000", name: "#!/all/filter/1000", text: "<1km"},
        {link: "#!/all/filter/1000-3000", name: "#!/all/filter/1000-3000", text: "1km - 3km"},
        {link: "#!/all/filter/3000-5000", name: "#!/all/filter/3000-5000", text: "3km - 5km"},
        {link: "#!/all/filter/5000-7000", name: "#!/all/filter/5000-7000", text: "5km - 7km"},
        {link: "#!/all/filter/7000-9000", name: "#!/all/filter/7000-9000", text: "7km - 9km"},
        {link: "#!/all/filter/9000", name: "#!/all/filter/9000", text: ">9km"}
    ],
    weatherWeek: [],
    view: function() {
        if (smhiModel.listBaseSMHI.length != 0) {
            // console.log(smhiModel.listBaseSMHI);
            frontpage.weatherWeek = [];
            for (var i = 1; i < 6; i++) {
                var temp =
                    m("div.each-weather", [
                        m("p.detail-front", smhiModel.listBaseSMHI[i].day),
                        smhiModel.listBaseSMHI[i].symbol != 0 ? m(weatherSymbol, {
                            symbol: smhiModel.listBaseSMHI[i].symbol}) : null
                    // ,
                    // m("p.detail-front", smhiModel.listBaseSMHI[i].temperature + "°C")
                    ]);

                frontpage.weatherWeek.push(temp);
            }
            return m("main.firstcontain", [
                m("div.weather", [
                    //här vill vi visa symboler!
                    m("div.weather-today", [
                        m("h3.today", "IDAG"),
                        smhiModel.listBaseSMHI[0].symbol != 0 ? m(weatherSymbol, {
                            symbol: smhiModel.listBaseSMHI[0].symbol }) : null,
                        m("p.detail-front", smhiModel.listBaseSMHI[0].temperature + "°C"),
                        // m("p.detail-front", smhiModel.listBaseSMHI[0].windSpeed + "m/s")
                    ]),
                    // m("p.detail-front", "Regn? " +
                    //smhiModel.listBaseSMHI[0].pMin + "-" +
                    //smhiModel.listBaseSMHI[0].pMax)
                    m("div.weather-week", frontpage.weatherWeek)
                ]),
                // m("h1", "UtLED"),
                m("div.main", [
                    m("h3.frontpage", "Hur långt vill du vandra?"),
                    m("div.divfront", [
                        frontpage.filterLinks.map(function(e) {
                            return m("a.frontpage-buttons",
                                { href: e.link, oncreate: m.route.link },
                                m("p.frontpage", e.text),
                            );
                        }),
                        m("a.frontpage-buttons-last",
                            { href: "#!/all", oncreate: m.route.link },
                            m("p.frontpage", "VISA ALLA"),
                        )
                    ])
                ])
            ]);
        } else {
            return m("main.firstcontain", [
                m("div.weather", [
                    //här vill vi visa symboler!
                    m("p.detail-front", "Kan inte visa väder-data")
                ]),
                // m("h1", "UtLED"),
                m("div.main", [
                    m("h3.frontpage", "Hur långt vill du vandra?"),
                    frontpage.filterLinks.map(function(e) {
                        return m("a",
                            { href: e.link, oncreate: m.route.link },
                            m("p.icon-text", e.text),
                        );
                    })
                ])
            ]);
        }
    }
};


export { frontpage };
