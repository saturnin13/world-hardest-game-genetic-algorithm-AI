class LevelDrawer {

    constructor(engine, level, currentLevelNumber) {
        this.level = level;
        this.engine = engine;
        this.levelRectangles;
        this.edgesGraphics;
        this.barStaticGroup = this.engine.physics.add.staticGroup();
        this.ballGroup = this.engine.physics.add.group();
        this.player;
        this.cursors = this.engine.input.keyboard.createCursorKeys();
        this.initialPlayerPosition;
        this.goalStaticGroup = this.engine.physics.add.staticGroup();
        this.currentLevelNumber = currentLevelNumber;
    }

    draw() {
        var levelRectangles = [];

        var x;
        var y;
        for (y = 0; y < this.level.length; y++) {
            var rowRectangles = [];
            for (x = 0; x < this.level[0].length; x++) {
                var currColor = new Phaser.Display.Color(this.level[y][x].tile.getColor(x, y).R, this.level[y][x].tile.getColor(x, y).G, this.level[y][x].tile.getColor(x, y).B);
                levelRectangles.push(this.engine.add.rectangle(
                    x * Constant.TILE_SIZE + (Constant.TILE_SIZE / 2), y * Constant.TILE_SIZE + (Constant.TILE_SIZE / 2),
                    Constant.TILE_SIZE, Constant.TILE_SIZE, currColor.color));
            }
        }

        this.levelRectangles = levelRectangles;

        this.__drawEdges();

        this.__drawEntities();

        this.__setCollision();
    }

    __drawEdges() {
        console.log("Drawing edges");

        var x;
        var y;
        for (y = 1; y < this.level.length - 1; y++) {
            for (x = 1; x < this.level[0].length - 1; x++) {
                if (this.level[y][x].tile.getTileType() === TileTypes.WALL) {
                    var actual_x = x * Constant.TILE_SIZE;
                    var actual_y = y * Constant.TILE_SIZE;
                    if(!(this.level[y + 1][x].tile.getTileType() === TileTypes.WALL)) {
                        this.__drawLine(actual_x - 1, actual_y + Constant.TILE_SIZE, actual_x + Constant.TILE_SIZE + 1, actual_y + Constant.TILE_SIZE, true);
                    }
                    if(!(this.level[y][x + 1].tile.getTileType() === TileTypes.WALL)) {
                        this.__drawLine(actual_x + Constant.TILE_SIZE, actual_y - 1, actual_x + Constant.TILE_SIZE, actual_y + Constant.TILE_SIZE + 1, false);
                    }
                    if(!(this.level[y - 1][x].tile.getTileType() === TileTypes.WALL)) {
                        this.__drawLine(actual_x - 1, actual_y, actual_x + Constant.TILE_SIZE + 1, actual_y, true);
                    }
                    if(!(this.level[y][x - 1].tile.getTileType() === TileTypes.WALL)) {
                        this.__drawLine(actual_x, actual_y - 1, actual_x, actual_y + Constant.TILE_SIZE + 1, false);
                    }
                }
            }
        }
    }

    __drawLine(x1, y1, x2, y2, isHorizontal) {
        if(isHorizontal) {
            this.barStaticGroup.create((x1 + x2) / 2, (y1 + y2) / 2, 'horizontal_bar').setScale(1, 0.5).refreshBody();
        } else {
            this.barStaticGroup.create((x1 + x2) / 2, (y1 + y2) / 2, 'vertical_bar').setScale(0.5, 1).refreshBody();
        }
    }

    __drawEntities() {
        console.log("Drawing enemy entities");

        var x;
        var y;
        for (y = 1; y < this.level.length - 1; y++) {
            for (x = 1; x < this.level[0].length - 1; x++) {
                this.__drawEntity(x * Constant.TILE_SIZE + Constant.TILE_SIZE, y * Constant.TILE_SIZE + Constant.TILE_SIZE / 2, this.level[y][x].right_border);
                this.__drawEntity(x * Constant.TILE_SIZE + Constant.TILE_SIZE / 2, y * Constant.TILE_SIZE + Constant.TILE_SIZE, this.level[y][x].bottom_border);
                this.__drawEntity(x * Constant.TILE_SIZE + Constant.TILE_SIZE, y * Constant.TILE_SIZE + Constant.TILE_SIZE, this.level[y][x].bottom_right_corner);
            }
        }
    }

    __drawEntity(x, y, entity){
        if(entity === EntityTypes.NONE) {
            return;
        }

        switch(entity) {
            case EntityTypes.GOAL_ENTITY:
                // TODO: refactor the LevelLoader and the way the levels are drawn. Under, x and y mofier to undo the fact that
                //  it is the right border due to how it is configured in the LevelLoader,
                this.goalStaticGroup.create(x - Constant.TILE_SIZE / 2, y , 'empty_goal_square');
                break;
            case EntityTypes.PLAYER:
                this.initialPlayerPosition = {"x": x, "y": y};
                this.player = this.engine.physics.add.image(x, y, 'player_square').setScale(0.5);
                break;
            case EntityTypes.UP_BALL:
                this.ballGroup.create(x, y, 'blue_ball').setVelocity(0, -Constant.BALL_SPEED).setBounce(1, 1).setScale(0.5);
                break;
            case EntityTypes.DOWN_BALL:
                this.ballGroup.create(x, y, 'blue_ball').setVelocity(0, Constant.BALL_SPEED).setBounce(1, 1).setScale(0.5);
                break;
            case EntityTypes.LEFT_BALL:
                this.ballGroup.create(x, y, 'blue_ball').setVelocity(-Constant.BALL_SPEED, 0).setBounce(1, 1).setScale(0.5);
                break;
            case EntityTypes.RIGHT_BALL:
                this.ballGroup.create(x, y, 'blue_ball').setVelocity(Constant.BALL_SPEED, 0).setBounce(1, 1).setScale(0.5);
                break;
            default:
        }
    }

    setPlayerControl() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.player.setVelocityX(-Constant.PLAYER_SPEED);
        }
        if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.player.setVelocityX(Constant.PLAYER_SPEED);
        }
        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.player.setVelocityY(-Constant.PLAYER_SPEED);
        }
        if (this.cursors.down.isDown && !this.cursors.up.isDown) {
            this.player.setVelocityY(Constant.PLAYER_SPEED);
        }
    }

    __setCollision() {
        console.log("Setting collisions");
        this.engine.physics.add.collider(this.ballGroup, this.barStaticGroup);
        this.engine.physics.add.collider(this.player, this.barStaticGroup);

        this.engine.physics.add.overlap(this.player, this.ballGroup, this.__returnPlayerToStart, null, this);
        this.engine.physics.add.overlap(this.player, this.goalStaticGroup, this.__endLevel, null, this);
    }

    __returnPlayerToStart(player, ballGroup) {
        player.setPosition(this.initialPlayerPosition.x, this.initialPlayerPosition.y)
    }

    __endLevel(player, goalStaticGroup) {
        this.engine.scene.restart({ level: this.currentLevelNumber + 1 });
    }
}
