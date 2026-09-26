scene("menu", () => {

makeBackground();

const playButton = add([
    rect(300, 200),
    pos(center()),
    anchor('center'),
    color(BLUE),
    area(),
])

add([
    text('PLAY', {align: 'center'}),
    pos(center()),
    anchor('center'),
])

playButton.onClick(() => { go('game') })

// -- End of scene --
})
go('menu');