import m from "mithril";

// import auth from "../models/auth.js";
import manageAchievements from "../models/manageachievements.js";
import viewAll from "../models/viewAll.js";

function createList() {
    achievements.listOfAchieved = [];
    for (var i = 0; i < viewAll.listAllLED.length; i++) {
        // console.log(viewAll.listAllLED[i].id);
        var check =
        manageAchievements.listUserData.includes(
            viewAll.listAllLED[i].id
        );

        if (check) {
            // console.log(viewAll.listAllLED[i]);
            achievements.listOfAchieved.push(viewAll.listAllLED[i]);
        }
    }
    // console.log(achievements.listOfAchieved);
}

var achievements = {
    oninit: function() {
        viewAll.listAllLED = [];
        manageAchievements.listUserData = [];
        manageAchievements.getAllUserData();
        viewAll.getAllLED();
        // console.log("this is listuserdata");
        // console.log(manageAchievements.listUserData);
    },
    listOfAchieved: [],
    view: function() {
        return m("main.fourthmain", [
            m("div.achieve1", [
                m("br"),
                m("i.material-icons ach", "check_circle"),
                m("div.ach2", [
                    manageAchievements.listUserData.length != 0 ? m("h3.ach",
                        manageAchievements.listUserData.length) : m("h3.ach", "0"),
                    m("h3.ach", " / "),
                    viewAll.listAllLED.length != 0 ? m("h3.ach",
                        viewAll.listAllLED.length) : m("h3.ach", "0")
                ])
            ]),
            m("div.achieve2", [
                m("h3", "Du har klarat:"),
                viewAll.listAllLED.length != 0 ? createList() : null,
                m("div.lederach", achievements.listOfAchieved.map(function (singleLED) {
                    return [
                        m("a.list-item list-item-ach", {
                            href: "#!/achievements/" + singleLED.id, oncreate: m.route.link
                        }, [
                            m("i.material-icons list-icon", "check"),
                            m("h5", singleLED.name ),
                            m("p.length", "Längd: " + singleLED.langd + " m"),
                            m("br"),
                            m("p", "Del: " + singleLED.part),
                        ]
                        )];
                }))

            ])
        ]);
    }
};


export { achievements };
