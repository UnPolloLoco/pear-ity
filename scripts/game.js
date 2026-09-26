scene("game", () => {

makeBackground();

let currentTab = 0;

let selection = {
    item: null,
    active: false,
    offset: vec2(0),
}

const referencePear = add([
    sprite('pear_base'),
    pos(center().sub(450, 0)),
    scale(0.6),
    anchor('center')
])

const thePear = add([
    sprite('pear_base'),
    pos(center().add(80, 0)),
    anchor('center'),
    color(167, 208, 37)
])

referencePear.add([
    rect(450, 550),
    pos(0,0),
    color(WHITE),
    opacity(0.2),
    anchor('center')
])

// ----- Accessory menu -----

// Menu background
add([
    rect(180, height()),
    pos(width(), 0),
    anchor('topright'),
    color(rgb(100,100,130))
])

// Slots
for (let i = 0; i < 5; i++) {
    add([
        rect(132, 132),
        pos(width()-38, 10 + i*142),
        anchor('topright'),
        color(rgb(50,50,60)),
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
            let offset = 132/2;
            add([
                sprite(slotData.sprite),
                pos(s.pos.add(-offset, offset)),
                anchor('center'),
                scale(0.4),
                "accessory_icon",
            ])
        }

    })
}

function updateTabs() {
    get('accessory_tab').forEach((t) => {
        if (currentTab == t.tabID) {
            t.color = rgb(100,100,130);
        } else {
            t.color = rgb(50,50,60);
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

// Get item from the accessory menu
onClick('accessory_slot', (s) => {
    let slotData = ACCESSORIES[currentTab].content[s.slotID];

    if (slotData) {
        let item = add([
            sprite(slotData.sprite),
            pos(mousePos()),
            area({scale: (slotData.areaScale ? slotData.areaScale : 1)}),
            anchor('center'),
            scale(slotData.scale ? slotData.scale : 1),
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
        if (selection.item.pos.x < 0) { selection.item.pos.x = 0 }
        if (selection.item.pos.y < 0) { selection.item.pos.y = 0 }
        if (selection.item.pos.x > width()) { selection.item.pos.x = width() }
        if (selection.item.pos.y > height()) { selection.item.pos.y = height() }

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

onKeyPress('up', () => {
    if (selection.item) {
        selection.item.scaleBy(1.05)
        if (0.15 > selection.item.scale.x || selection.item.scale.x > 3) {
            selection.item.scaleBy(1 / 1.05)
        }
    }
})
onKeyPress('down', () => {
    if (selection.item) {
        selection.item.scaleBy(1 / 1.05)
        if (0.15 > selection.item.scale.x || selection.item.scale.x > 3) { 
            selection.item.scaleBy(1.05)
        }
    }
})
onKeyPress('left', () => {
    if (selection.item) {
        selection.item.flipX = !selection.item.flipX
    }
})
onKeyPress('right', () => {
    if (selection.item) {
        selection.item.flipY = !selection.item.flipY
    }
})

const selectionOutline = add([
    rect(0,0, {fill:false}),
    pos(0,0),
    outline(3, rgb(0,255,255)),
    opacity(0),
    z(999)
])

onUpdate(() => {
    let isSomethingSelected = false;

    get('draggable').forEach((d) => {
        if (d.is('selected')) {
            isSomethingSelected = true;
            bbox = d.worldBbox();

            selectionOutline.opacity = 1;
            selectionOutline.pos = bbox.pos;
            selectionOutline.width = bbox.width;
            selectionOutline.height = bbox.height;
        }   
    })

    if (isSomethingSelected == false) {
        selectionOutline.opacity = 0;
    }
})


// -- End of scene --
})