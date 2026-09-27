scene("game", () => {

makeBackground();

let currentTab = 0;
let isScoring = false;
let canLeaveScoring = false;
let scoreSuccess = false;

let selection = {
    item: null,
    active: false,
    offset: vec2(0),
}

const referencePear = add([
    sprite('pear_base'),
    pos(center().sub(450, 0)),
    scale(0.6),
    anchor('center'),
    z(-3),
])

const thePear = add([
    sprite('pear_base'),
    pos(center().add(80, 0)),
    anchor('center'),
    color(167, 208, 37)
])

// Glass thing
add([
    rect(280, 360),
    pos(referencePear.pos),
    color(WHITE),
    opacity(0.15),
    anchor('center'),
    z(-1),
])

const checkButton = add([
    rect(280, 100),
    pos(referencePear.pos.add(0, 250)),
    color(rgb(30,140,40)),
    anchor('center'),
    area()
])

checkButton.add([
    rect(280, 50),
    pos(0,0),
    color(rgb(20,120,30)),
    anchor('top'),
])

checkButton.add([
    text('CHECK', {align: 'center'}),
    pos(0,0),
    color(WHITE),
    anchor('center')
])

checkButton.onClick(() => {
    if (isScoring) return;

    let guess = buildAccessoryList();
    let target = structuredClone(referenceAccessories);

    console.log('GUESS')
    console.log(guess);
    console.log('TARGET')
    console.log(target);
    console.log('');

    let score = 0; // every part can add from 0.0 to 1.0 depending on how correct it is
    let maxScore = 0; // every part adds 1.0 to this

    // First, compare colors
    maxScore += 1

    let gc = guess[0].color;
    let tc = target[0].color;
    if (gc.r == tc.r && gc.g == tc.g && gc.b == tc.b) {
        score += 1
    }

    // Remove colors from lists
    guess.shift();
    target.shift();

    // Loop through all non-colors
    for (let gPart of guess) {
        let matchingIndices = [];
        maxScore += 1

        // Find all parts with a matching sprite
        for (let [index, tPart] of target.entries()) {
            if (gPart.sprite == tPart.sprite) {
                matchingIndices.push(index);
            }
        }

        // If no matches, continue
        if (matchingIndices.length == 0) { continue }

        // Find the CLOSEST part with a matching sprite
        let smallestDist = 99999;
        let smallestDistIndex = null;
        for (let index of matchingIndices) {
            tPart = target[index];
            let dist = Math.sqrt(
                (gPart.pos.x - tPart.pos.x)**2 
                + (gPart.pos.y - tPart.pos.y)**2
            );
            if (dist < smallestDist) {
                smallestDist = dist;
                smallestDistIndex = index;
            }
        }

        // Get a best match between a Guess and Target part
        let bestMatch = target[smallestDistIndex];
        console.log('-------------')
        console.log(gPart)
        console.log(bestMatch)
        console.log(smallestDist)
        console.log('-------------')

        // a few scores for this one part, which will be averaged for the part's overall score
        let subScores = [];

        // ---- POSITION ACCURACY SCORE ----

        let dist = smallestDist;
        let normDist = mapc(
            dist,
            5, 60, // convert 5-60 to 0-1, where 1 is too far and 0 is perfect
            0, 1,
        );

        subScores.push(1 - normDist); // invert normDist since 0 is perfect

        // ---- SCALE ACCURACY SCORE ----

        // only compare x part of scale for simplicity
        let gScale = gPart.scale.x;
        let tScale = bestMatch.scale.x;

        let rawRatio = gScale / tScale;
        let normRatio; // always less than one (1/3 -> 1/3, but 3 -> 1/3 too)

        if (rawRatio > 1) { normRatio = 1 / rawRatio }
        else { normRatio = rawRatio }

        // Add a small amount for a deadzone around target value (1)
        normRatio = Math.min(1, normRatio+0.05)

        extremeRatio = normRatio ** 4; // ^4 so that worse values are punished more

        subScores.push(extremeRatio)

        // ---- FLIP ACCURACY SCORE ----

        let goodFlipX = (gPart.flipX == bestMatch.flipX);
        let goodFlipY = (gPart.flipY == bestMatch.flipY);

        if (goodFlipX && goodFlipY) {
            // Both match!!
            subScores.push(1);
        } else if (goodFlipX || goodFlipY) {
            // Only one matches
            subScores.push(0.25);
        } else {
            // None match :((
            subScores.push(0);
        }

        // --- Average out subscores ---
        //                 pos: 2x          scale: 2x        flips: 1x
        let weighted_sum = 2*subScores[0] + 2*subScores[1] + subScores[2];
        let avg = weighted_sum / 5;

        score += avg;
        console.log(subScores)

        // -- Final penalties --

        // Reduce score if guess and target don't have the same amount of parts
        let lengthDifference = Math.abs(guess.length - target.length);
        maxScore += lengthDifference;

    }

    console.log(`${score} / ${maxScore}`)
    console.log(score/maxScore * 100)

    let percentage = (score/maxScore * 100);

    // --- UI MAGIC ---

    isScoring = true;
    scoreContinueHint.opacity = 0;
    scoreUI.hidden = false;

    scoreText.text = 'Scoring';
    scoreText.color = rgb(180,180,180);
    scoreDescription.text = '';

    for (let i = 0; i < 3; i++) {
        wait(0.4*i, () => {
            scoreText.text += '.';
        })
    }

    wait(1.6, () => {
        scoreText.text = `${percentage.toFixed(1)}%`;

        if (percentage >= 90) {
            scoreText.color = GREEN;
            scoreDescription.color = rgb(0,180,0);
            scoreDescription.text = 'PEAR-ITY!!';
            scoreSuccess = true;
        } else {
            scoreText.color = RED;
            scoreDescription.color = rgb(180,0,0);
            scoreDescription.text = 'not a pear-ity.';
            scoreSuccess = false;
        }

        canLeaveScoring = true;
        scoreContinueHint.opacity = 1;
    })
})

onClick(() => {
    if (canLeaveScoring) {
        isScoring = false;
        canLeaveScoring = false;
        scoreUI.hidden = true;

        if (scoreSuccess) alert('yay');
        scoreSuccess = false;
    }
})

// ----- Score UI -----

const scoreUI = add([pos(0), opacity(1)]);
scoreUI.hidden = true;

// Fade
scoreUI.add([
    rect(width(), height()),
    pos(center()),
    color(BLACK),
    anchor('center'),
    z(999),
    opacity(0.5)
])


// Banner
scoreUI.add([
    rect(width(), 200),
    pos(center()),
    color(BLACK),
    anchor('center'),
    z(1000),
])

// Score report
const scoreText = scoreUI.add([
    text('', {size: 80, align:'center'}),
    pos(center().sub(0, 30)),
    color(GREEN),
    anchor('center'),
    z(1001),
])

// Score description
const scoreDescription = scoreUI.add([
    text('', {size: 40, align:'center'}),
    pos(center().add(0, 40)),
    color(rgb(0,200,0)),
    anchor('center'),
    z(1001),
])

// Score UI continue hint
const scoreContinueHint = scoreUI.add([
    text('Click to continue', {size: 25, align:'center'}),
    pos(center().add(0, 150)),
    color(rgb(200,200,200)),
    anchor('center'),
    z(1001),
    opacity(0),
])


// ----- Get reference -----

const PRESET_REFERENCES = [
    [{"color":{"r":187,"g":167,"b":33}},{"sprite":"eye1","pos":{"x":109.0783807062877,"y":-14.332472006890612},"scale":{"x":1,"y":1},"flipX":true,"flipY":false},{"sprite":"eye1","pos":{"x":-115.83118001722653,"y":-9.922480620155056},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"mouth2","pos":{"x":-8.888888888888914,"y":24.254952627045668},"scale":{"x":1,"y":1},"flipX":false,"flipY":false}],
]

function getNewReference() {
    
}

let whichReference = 0;
let referenceAccessories = PRESET_REFERENCES[whichReference % PRESET_REFERENCES.length];
useAccessoryList(referenceAccessories)

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
                z(-2),
                "reference"
            ])
        }
    }
}

// let triple_t;
onKeyPress('a', ()=>{ 
    triple_t = buildAccessoryList(); 
    console.log(JSON.stringify(triple_t))
})
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