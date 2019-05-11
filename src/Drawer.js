class Drawer {
    levelDrawer(engine, level) {
        var levelRectangles = [];

        console.log(level);

        var x;
        var y;
        for (y = 0; y < level.length; y++) {
            var rowRectangles = [];
            for (x = 0; x < level[0].length; x++) {
                var currColor = new Phaser.Display.Color(level[y][x].getColor(x, y).R, level[y][x].getColor(x, y).G, level[y][x].getColor(x, y).B);
                levelRectangles.push(engine.add.rectangle(
                    x * Constant.TILE_SIZE + (Constant.TILE_SIZE / 2), y * Constant.TILE_SIZE + (Constant.TILE_SIZE / 2),
                    Constant.TILE_SIZE, Constant.TILE_SIZE, currColor.color));
            }
        }

        return levelRectangles
    }
}