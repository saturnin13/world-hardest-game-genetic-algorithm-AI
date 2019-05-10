var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: Game.preload,
        create: Game.create,
        update: Game.update
    }
};

var game = new Phaser.Game(config);

function preload() {

}

function create() {

}

function update() {

}