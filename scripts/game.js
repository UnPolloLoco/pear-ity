scene("game", () => {

makeBackground();

let currentTab = 0;

const referencePear = add([
    sprite('pear'),
    pos(center().sub(450, 0)),
    scale(0.6),
    anchor('center')
])

const thePear = add([
    sprite('pear'),
    pos(center().add(50, 0)),
    scale(550/500),
    anchor('center')
])

referencePear.add([
    rect(450, 550),
    pos(0,0),
    color(WHITE),
    opacity(0.2),
    anchor('center')
])

thePear.add([
    sprite('thing')
])
referencePear.add([
    sprite('thing')
])

// ----- Accessory menu -----

// Main background
add([
    rect(187.5, height()),
    pos(width(), 0),
    anchor('topright'),
    color(BLUE)
])

// Slots
for (let i = 0; i < 4; i++) {
    add([
        rect(167.5, 167.5),
        pos(width()-10, 10 + i*177.5),
        anchor('topright'),
        color(BLACK),
        "accessory_slot",
        { slotID: i },
    ])
}

// Tabs
for (let i = 0; i < ACCESSORIES.length; i++) {
    add([
        rect(60, 90),
        pos(width()-187.5, 10 + i*100),
        anchor('topright'),
        color(RED),
        area(),
        "accessory_tab",
        { tabID: i },
    ])
}

function updateSlots() {
    destroyAll('accessory_icon');
    get('accessory_slot').forEach((s) => {
        let slotData = ACCESSORIES[currentTab].content[s.slotID];

        if (slotData) {
            add([
                sprite(slotData.sprite),
                pos(s.pos),
                anchor('topright'),
                scale(0.2),
                "accessory_icon",
            ])
        }

    })
}

function updateTabs() {
    get('accessory_tab').forEach((t) => {
        if (currentTab == t.tabID) {
            t.color = RED;
        } else {
            t.color = rgb(160,0,0);
        }
    })
}

function updateAccessoryMenu() {
    updateSlots();
    updateTabs();
}

onClick('accessory_tab', (t) => {
    currentTab = t.tabID;
    updateAccessoryMenu();
})

updateAccessoryMenu();

// -- End of scene --
})