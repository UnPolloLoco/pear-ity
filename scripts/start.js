kaboom({
    letterbox: true,
    width: 1280,
    height: 720,
});

function makeBackground() {
    add([
        rect(width(), height()),
        pos(0,0),
        fixed(),
        color(rgb(30,30,40)),
        z(-999)
    ])
}

loadBean();

loadRoot('https://unpolloloco.github.io/pear-ity/sprites/');

loadSprite('pear', 'pear.png')
loadSprite('thing', 'thing.png')

loadSpriteAtlas('eyes.png', {
	'eye1': { x: 0, y: 0, width: 200, height: 200 },
	'eye2': { x: 200, y: 0, width: 200, height: 200 },
	'eye3': { x: 400, y: 0, width: 200, height: 200 },
	'eye4': { x: 600, y: 0, width: 200, height: 200 },
	'eye5': { x: 800, y: 0, width: 200, height: 200 },
})

loadSpriteAtlas('hats.png', {
	'hat1': { x: 0, y: 0, width: 200, height: 200 },
	'hat2': { x: 200, y: 0, width: 200, height: 200 },
	'hat3': { x: 400, y: 0, width: 200, height: 200 },
})

loadSpriteAtlas('mouths1.png', {
	'mouth1': { x: 0, y: 0, width: 200, height: 100 },
	'mouth2': { x: 200, y: 0, width: 200, height: 100 },
	'mouth3': { x: 400, y: 0, width: 200, height: 100 },
})
loadSpriteAtlas('mouths2.png', {
	'mouth4': { x: 0, y: 0, width: 200, height: 200 },
	'mouth5': { x: 200, y: 0, width: 200, height: 200 },
})

loadSprite('pear_base', 'pear_base.png')
loadSprite('splatter', 'splatter.png')

const ACCESSORIES = [
    {
        category: 'eyes',
        content: [
            {sprite: 'eye1', scale: 0.5, areaScale: 0.9},
            {sprite: 'eye2', scale: 0.5, areaScale: 0.9},
            {sprite: 'eye3', scale: 0.5, areaScale: 0.9},
            {sprite: 'eye4', scale: 0.5, areaScale: 0.9},
            {sprite: 'eye5', scale: 0.5, areaScale: 0.9},
        ]
    },
    {
        category: 'mouths',
        content: [
            {sprite: 'mouth1', areaScale: vec2(0.9, 0.5)},
            {sprite: 'mouth2', areaScale: 0.4},
            {sprite: 'mouth3', areaScale: 0.4},
            {sprite: 'mouth4', areaScale: 0.8},
            {sprite: 'mouth5', areaScale: vec2(0.8, 0.6)},
        ]
    },
    {
        category: 'hats',
        content: [
            {sprite: 'hat1', scale: 0.75, areaScale: vec2(0.95, 0.6)},
            {sprite: 'hat2', scale: 0.5, areaScale: 0.7},
            {sprite: 'hat3', scale: 1.5, areaScale: vec2(0.8, 0.55)},
        ]
    },
    {
        category: 'colors',
        content: [
            {color: rgb(88, 212, 33)},
            {color: rgb(167, 208, 37)},
            {color: rgb(187, 167, 33)},
            {color: rgb(208, 123, 37)},
            {color: rgb(197, 71, 48)},
        ]
    },
]