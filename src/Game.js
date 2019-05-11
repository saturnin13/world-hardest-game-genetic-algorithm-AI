class Game {

    static preload() {
        this.load.image('sky', 'assets/sky.png');
    }

    static create() {
        // var currColor = new Phaser.Display.Color(220, 220, 220);
        // var rect = (this.add.rectangle(330, 0, 1050, 500, currColor.color));
        //
        var levelLoader = new LevelLoader();
        var level1 = levelLoader.loadLevel1();

        var drawer = new Drawer();
        drawer.levelDrawer(this, level1);
    }

    static update() {

    }
}
