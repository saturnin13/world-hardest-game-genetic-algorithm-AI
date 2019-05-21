class Game extends Phaser.Scene {

    static __levelDrawer;

    preload() {
        this.load.image('horizontal_bar', 'assets/horizontal_bar.png');
        this.load.image('vertical_bar', 'assets/vertical_bar.png');
        this.load.image('blue_ball', 'assets/blue_ball.png');
        this.load.image('player_square', 'assets/player_square.png');
        this.load.image('empty_goal_square', 'assets/empty_goal_square.png');
    }

    create(data) {
        var currentLevel = data.level ? data.level: 1;
        console.log("Current level is " + currentLevel);

        var levelLoader = new LevelLoader();
        var level = levelLoader.loadLevel(currentLevel);

        Game.__levelDrawer = new LevelDrawer(this, level, currentLevel);
        Game.__levelDrawer.draw();
    }

    update() {
        Game.__levelDrawer.setPlayerControl(this);
    }
}
