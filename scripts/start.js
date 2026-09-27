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

const PRESET_REFERENCES = [
    [{"color":{"r":187,"g":167,"b":33}},{"sprite":"eye1","pos":{"x":109.0783807062877,"y":-14.332472006890612},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"eye1","pos":{"x":-115.83118001722653,"y":-9.922480620155056},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"mouth2","pos":{"x":-8.888888888888914,"y":24.254952627045668},"scale":{"x":1,"y":1},"flipX":false,"flipY":false}],
    [{"color":{"r":88,"g":212,"b":33}},{"sprite":"hat3","pos":{"x":-1.3830755232029333,"y":-147.9162875341219},"scale":{"x":1.5,"y":1.5},"flipX":false,"flipY":false},{"sprite":"eye5","pos":{"x":-117.85259326660605,"y":75.70518653321199},"scale":{"x":0.6381407812500002,"y":0.6381407812500002},"flipX":false,"flipY":false},{"sprite":"eye5","pos":{"x":116.25113739763435,"y":78.0345768880801},"scale":{"x":0.6381407812500002,"y":0.6381407812500002},"flipX":false,"flipY":false},{"sprite":"mouth1","pos":{"x":-6.04185623293904,"y":152.57506824385803},"scale":{"x":1,"y":1},"flipX":false,"flipY":false}],
    [{"color":{"r":208,"g":123,"b":37}},{"sprite":"eye2","pos":{"x":-87.57051865332119,"y":-1.164695177434055},"scale":{"x":0.5,"y":0.5},"flipX":false,"flipY":false},{"sprite":"eye2","pos":{"x":-117.85259326660594,"y":103.6578707916288},"scale":{"x":0.5,"y":0.5},"flipX":false,"flipY":false},{"sprite":"eye2","pos":{"x":85.96906278434938,"y":1.164695177434055},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"eye2","pos":{"x":113.92174704276613,"y":105.98726114649679},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"mouth4","pos":{"x":-4.877161055504985,"y":161.89262966333035},"scale":{"x":1,"y":1},"flipX":false,"flipY":false},{"sprite":"hat2","pos":{"x":63.839854413102785,"y":-181.69244767970883},"scale":{"x":0.5,"y":0.5},"flipX":false,"flipY":false},{"sprite":"hat2","pos":{"x":-70.10009099181082,"y":-180.5277525022748},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false}],
]