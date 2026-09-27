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
    [{"color":{"r":167,"g":208,"b":37}},{"sprite":"mouth5","pos":{"x":-0.21838034576876453,"y":-38.434940855322964},"scale":{"x":0.6768393620286869,"y":0.6768393620286869},"flipX":false,"flipY":false},{"sprite":"hat1","pos":{"x":65.00454959053684,"y":-172.37488626023656},"scale":{"x":0.533010997597591,"y":0.533010997597591},"flipX":true,"flipY":false},{"sprite":"eye2","pos":{"x":-78.25295723384897,"y":-111.81073703366698},"scale":{"x":0.4535147392290249,"y":0.4535147392290249},"flipX":false,"flipY":false},{"sprite":"eye2","pos":{"x":81.31028207461327,"y":-111.81073703366698},"scale":{"x":0.4535147392290249,"y":0.4535147392290249},"flipX":false,"flipY":false}],
    [{"color":{"r":197,"g":71,"b":48}},{"sprite":"mouth3","pos":{"x":-6.04185623293904,"y":177.03366696997273},"scale":{"x":1,"y":1},"flipX":false,"flipY":false},{"sprite":"eye4","pos":{"x":-141.14649681528658,"y":144.4222020018197},"scale":{"x":0.814447313388721,"y":0.814447313388721},"flipX":false,"flipY":false},{"sprite":"eye4","pos":{"x":123.23930846223845,"y":137.4340309372157},"scale":{"x":0.814447313388721,"y":0.814447313388721},"flipX":false,"flipY":false},{"sprite":"mouth2","pos":{"x":125.56869881710634,"y":41.92902638762507},"scale":{"x":1,"y":1},"flipX":false,"flipY":false},{"sprite":"mouth2","pos":{"x":-149.29936305732497,"y":47.75250227479523},"scale":{"x":1,"y":1},"flipX":false,"flipY":false}],
    [{"color":{"r":187,"g":167,"b":33}},{"sprite":"eye1","pos":{"x":-43.31210191082812,"y":-228.28025477707007},"scale":{"x":0.22905576099569996,"y":0.22905576099569996},"flipX":true,"flipY":false}],
    [{"color":{"r":167,"g":208,"b":37}},{"sprite":"eye3","pos":{"x":-101.54686078252962,"y":47.75250227479529},"scale":{"x":0.5,"y":0.5},"flipX":false,"flipY":false},{"sprite":"eye3","pos":{"x":74.32211101000905,"y":47.75250227479529},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"mouth1","pos":{"x":-11.865332120109201,"y":128.11646951774338},"scale":{"x":1,"y":1},"flipX":false,"flipY":true},{"sprite":"hat1","pos":{"x":-11.865332120109201,"y":-239.9272065514104},"scale":{"x":0.587644624851344,"y":0.587644624851344},"flipX":false,"flipY":false}],
    [{"color":{"r":208,"g":123,"b":37}},{"sprite":"eye5","pos":{"x":-11.865332120109201,"y":88.51683348498636},"scale":{"x":1.203309616845543,"y":1.203309616845543},"flipX":false,"flipY":false},{"sprite":"mouth2","pos":{"x":-8.37124658780715,"y":232.93903548680623},"scale":{"x":1,"y":1},"flipX":false,"flipY":true}],
    [{"color":{"r":187,"g":167,"b":33}},{"sprite":"mouth5","pos":{"x":-3.7124658780709296,"y":116.46951774340306},"scale":{"x":1,"y":1},"flipX":false,"flipY":false},{"sprite":"eye1","pos":{"x":155.8507734303913,"y":85.02274795268426},"scale":{"x":0.5,"y":0.5},"flipX":false,"flipY":false},{"sprite":"eye1","pos":{"x":-156.28753412192907,"y":86.18744313011831},"scale":{"x":0.5,"y":0.5},"flipX":true,"flipY":false},{"sprite":"mouth2","pos":{"x":145.36851683348505,"y":23.293903548680646},"scale":{"x":1,"y":1},"flipX":false,"flipY":false},{"sprite":"mouth3","pos":{"x":-145.8052775250228,"y":32.61146496815286},"scale":{"x":1,"y":1},"flipX":false,"flipY":false},{"sprite":"hat3","pos":{"x":-1.3830755232029333,"y":-200.32757051865335},"scale":{"x":0.8352561272663388,"y":0.8352561272663388},"flipX":false,"flipY":false}],
    [{"color":{"r":88,"g":212,"b":33}},{"sprite":"eye1","pos":{"x":-95.72338489535946,"y":-125.78707916287533},"scale":{"x":0.2784187090887796,"y":0.2784187090887796},"flipX":true,"flipY":false},{"sprite":"eye1","pos":{"x":91.79253867151954,"y":-124.6223839854413},"scale":{"x":0.2784187090887796,"y":0.2784187090887796},"flipX":false,"flipY":false},{"sprite":"mouth1","pos":{"x":-3.7124658780709296,"y":-76.86988171064604},"scale":{"x":1,"y":1},"flipX":false,"flipY":false}]
]