scene("menu", () => {

makeBackground();

add([
    text('PEAR-ITY', {size: 180, align:'center'}),
    color(rgb(200,255,220)),
    pos(center().sub(0,150)),
    anchor('center')
])

add([
    text('Objective: Obtain a pear parity.', {size: 25, align:'center'}),
    color(rgb(74, 158, 105)),
    pos(center().sub(0,60)),
    anchor('center')
])

add([
    rect(400, 150),
    pos(center().add(0, 120)),
    anchor('center'),
    color(rgb(6, 55, 9)),
    area(),
])

const playButton = add([
    rect(400, 150),
    pos(center().add(0, 100)),
    anchor('center'),
    color(rgb(10,90,15)),
    area(),
])

add([
    text('PLAY', {align: 'center', size: 50}),
    pos(center().add(0,100)),
    anchor('center'),
])

playButton.onClick(() => { 
    go('game') 
})

for (let i = 0; i < 20; i++) {
    let n = randi(0,5)
    add([
        sprite('pear_base'),
        color(ACCESSORIES[3].content[n].color),
        pos(140 * i, height()),
        scale(0.3),
        anchor('bot'),
        opacity(0.15)
    ])
}

// -- End of scene --
})
go('menu');