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
        color(rgb(40,40,50))
    ])
}

loadBean();

loadRoot('https://unpolloloco.github.io/pear-ity/sprites/');

loadSprite('pear', 'pear.png')
loadSprite('thing', 'thing.png')

const ACCESSORIES = [
    {
        category: 'eyes',
        content: [
            {sprite: 'thing'},
            {sprite: 'pear'},
        ]
    },
    {
        category: 'hats',
        content: [
            {sprite: 'pear'},
            {sprite: 'thing'},
            {sprite: 'thing'},
        ]
    },
]