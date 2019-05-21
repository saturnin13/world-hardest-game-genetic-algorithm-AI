var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 550,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: Game
};

var game = new Phaser.Game(config);
