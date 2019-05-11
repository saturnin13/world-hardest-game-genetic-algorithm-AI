var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 500,
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