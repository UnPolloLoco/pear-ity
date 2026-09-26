scene("game", () => {

makeBackground();

add([
    sprite('bean'),
    pos(50,50)
])

const referencePear = add([
    sprite('pear'),
    pos(center().sub(400, 0)),
    scale(300/500),
    anchor('center')
])

const thePear = add([
    sprite('pear'),
    pos(center().add(100, 0)),
    scale(550/500),
    anchor('center')
])

referencePear.add([
    rect(450, 550),
    pos(0,0),
    color(WHITE),
    opacity(0.1),
    anchor('center')
])

thePear.add([
    sprite('thing')
])
referencePear.add([
    sprite('thing')
])

add([
    rect(200, height()),
    pos(width(), 0),
    anchor('topright'),
    color(BLUE)
])

// -- End of scene --
})