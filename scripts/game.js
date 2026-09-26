scene("game", () => {

makeBackground();

let currentTab = 0;

let selection = {
    item: null,
    active: false,
    offset: vec2(0),
}

const referencePear = add([
    sprite('pear'),
    pos(center().sub(450, 0)),
    scale(0.6),
    anchor('center')
])

const thePear = add([
    sprite('pear'),
    pos(center().add(80, 0)),
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
    sprite('thing'),
    scale(0.5),
])
referencePear.add([
    sprite('thing'),
    scale(0.5),
])

// ----- Accessory menu -----

// Main background
add([
    rect(180, height()),
    pos(width(), 0),
    anchor('topright'),
    color(BLUE)
])

// Slots
for (let i = 0; i < 5; i++) {
    add([
        rect(132, 132),
        pos(width()-38, 10 + i*142),
        anchor('topright'),
        color(BLACK),
        area(),
        "accessory_slot",
        { slotID: i },
    ])
}

// Tabs
for (let i = 0; i < ACCESSORIES.length; i++) {
    add([
        rect(60, 90),
        pos(width()-180, 10 + i*100),
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

onClick('accessory_slot', (s) => {
    let slotData = ACCESSORIES[currentTab].content[s.slotID];

    if (slotData) {
        let item = add([
            sprite(slotData.sprite),
            pos(mousePos()),
            area(),
            anchor('center'),
            "draggable",
            "selected"
        ])
    
        // copied code
        if (selection.item) { selection.item.untag('selected') }
        item.tag('selected');
    
        selection.item = item;
        selection.active = true;
        selection.offset = item.pos.sub(mousePos())
    }

})



onMouseDown(() => {
    if (selection.active == true) {
        // Something already selected
        selection.item.pos = mousePos().add(selection.offset);

        // Check if out of bounds & move back in
        if (selection.item.pos.x < 0) { selection.item.pos.x = 0; debug.log('a') }
        if (selection.item.pos.y < 0) { selection.item.pos.y = 0; debug.log('b') }
        if (selection.item.pos.x > width()) { selection.item.pos.x = width(); debug.log('c') }
        if (selection.item.pos.y > height()) { selection.item.pos.y = height(); debug.log('d') }

    } else {
        // Nothing selected yet
        let draggableItems = get('draggable');

        for (let i = 0; i < draggableItems.length; i++) {
            let item = draggableItems[i];

            if (item.isHovering()) {
                // Successful selection
                // copied code
                if (selection.item) { selection.item.untag('selected') }
                item.tag('selected');

                selection.item = item;
                selection.active = true;
                selection.offset = item.pos.sub(mousePos())

                break
            }
        }

        // If you click outside of an object, deselect
        if (!selection.active) {
            // copied code
            if (selection.item) { selection.item.untag('selected') }
            selection.item = null;
        }
    }
})

onUpdate(() => {
    get('draggable').forEach((d) => {
        if (d.is('selected')) {
            d.use(color(BLACK))
        } else {
            d.unuse('color')
        }  
    })
})

onMouseRelease(() => {
    if (selection.active) {
        if (selection.item.pos.x > width() - 200) {
            // Deletion range
            destroy(selection.item)
            selection.item = null;
        }

        selection.active = false;
    }
})



// -- End of scene --
})