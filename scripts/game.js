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

function buildAccessoryList(tag = 'draggable') {
    let accessories = get(tag, { recursive: true });
    let list = [];

    // Add color component first
    list.push({color: thePear.color})

    // Add the rest
    for (let i = 0; i < accessories.length; i++) {
        let a = accessories[i];
        let inputPos;

        if (tag == 'draggable') { inputPos = a.pos.sub(thePear.pos) }
        if (tag == 'reference') { inputPos = a.pos }

        list.push({
            sprite:  a.sprite,
            pos:     inputPos, // make pos relative to pear
            scale:   a.scale,
            flipX:   a.flipX,
            flipY:   a.flipY,
        })
    }

    list = structuredClone(list);
    return list;
}

function useAccessoryList(list) {
    get("reference", { recursive: true }).forEach((ref) => destroy(ref)); // destroyAll doesnt work >:(((

    for (let i = 0; i < list.length; i++) {
        let part = list[i];

        if (part.color) {
            // Color part
            referencePear.color = part.color;
        } else {
            // All other parts
            referencePear.add([
                sprite(part.sprite, {
                    flipX: part.flipX, 
                    flipY: part.flipY
                }),
                pos(part.pos.x, part.pos.y),
                scale(part.scale.x, part.scale.y),
                anchor('center'),
                "reference"
            ])
        }
    }
}

// let triple_t;
// onKeyPress('a', ()=>{ triple_t = buildAccessoryList() })
// onKeyPress('b', ()=>{useAccessoryList(triple_t)})

// onKeyPress('c', ()=>{
//     console.log('REFERENCE:')
//     console.log(buildAccessoryList('reference'));

//     console.log(' ')
//     console.log('NORMAL:')
//     console.log(buildAccessoryList())
// })

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
    // Rect
    add([
        rect(60, 90),
        pos(width()-180, 10 + i*100),
        anchor('topright'),
        color(RED),
        area(),
        "accessory_tab",
        { tabID: i },
    ])

    // Label
    add([
        text(ACCESSORIES[i].category, {align: 'center', size: 20, width: 90}),
        pos(width()-180-15, 10 + i*100),
        anchor('botright'),
        color(WHITE),
        rotate(-90)
    ])
}

function updateSlots() {
    destroyAll('accessory_icon');
    get('accessory_slot').forEach((s) => {
        let slotData = ACCESSORIES[currentTab].content[s.slotID];
        let category = ACCESSORIES[currentTab].category;

        if (slotData) {
            let offset = 132/2;
            let spriteInput = (category == 'colors') ? 'splatter' : slotData.sprite;
            let scaleInput = (category == 'colors') ? 1 : 0.4;

            let icon = add([
                sprite(spriteInput),
                pos(s.pos.add(-offset, offset)),
                anchor('center'),
                scale(scaleInput),
                "accessory_icon",
            ])
        
            if (category == 'colors') {
                icon.use(color(slotData.color))
            }
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
    let category = ACCESSORIES[currentTab].category;

    if (slotData) {
        if (category == 'colors') {
            // Set color
            thePear.color = slotData.color;

        } else {

            // Normal draggable item

            let scaleInput = slotData.scale ? slotData.scale : 1

            let item = add([
                sprite(slotData.sprite),
                pos(mousePos()),
                area({scale: (slotData.areaScale ? slotData.areaScale : 1)}),
                anchor('center'),
                scale(scaleInput),
                "draggable",
                "selected",
                { defaultScale: vec2(scaleInput) }
            ])
        
            // copied code
            if (selection.item) { selection.item.untag('selected') }
            item.tag('selected');
        
            selection.item = item;
            selection.active = true;
            selection.offset = item.pos.sub(mousePos())
        }
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
            // Deletion range (copied code)
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

onKeyPress('space', () => {
    if (selection.item) {
        selection.item.scale = selection.item.defaultScale;
        selection.item.flipX = false;
        selection.item.flipY = false;
    }
})

onKeyPress('backspace', () => {
    if (selection.item) {
        // copied code
        destroy(selection.item)
        selection.item = null;
        selection.active = false;
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

            if (selection.item.pos.x > width() - 200) {
                // In deletion range (copied code)
                selectionOutline.outline.color = RED;
            } else {
                // normal
                selectionOutline.outline.color = rgb(0,255,255);
            }
        }   
    })

    if (isSomethingSelected == false) {
        selectionOutline.opacity = 0;
    }
})


// -- End of scene --
})