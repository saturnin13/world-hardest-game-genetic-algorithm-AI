class LevelLoader {

    loadLevel(number) {
        var levelRaw = FileLoader.__readTextFile("./level_configuration/level" + number + ".txt");
        var level = [];
        var lineSize = levelRaw.indexOf("\n") + 1;

        var currentLine = [];
        var i;
        var j = 0;
        for (i = 0; i < levelRaw.length; i++) {
            var currentCharacter = levelRaw[i];
            if(currentCharacter === ' ' || currentCharacter === '|' || currentCharacter === '_' || i % 2 === 1) {
                continue;
            } else if (currentCharacter === '\n') {
                j++;
                if((i + 2) % 2 === 0) {
                    level.push(currentLine);
                }
                currentLine = [];
            } else {
                var tile = new Tile(Number(currentCharacter));
                var right_border = tile.tileType === TileTypes.GOAL ? EntityTypes.GOAL_ENTITY:this.__entityValue(levelRaw[i + 1]);
                var bottom_border = this.__entityValue(levelRaw[i + lineSize]);
                var bottom_right_corner = this.__entityValue(levelRaw[i + lineSize + 1]);
                currentLine.push({ "tile": tile, "right_border": right_border, "bottom_border": bottom_border, "bottom_right_corner": bottom_right_corner})
            }
        }

        return level;
    }

    __entityValue(value) {
        // "NONE": "N", "PLAYER": 'P', "UP_BALL": 'U', "DOWN_BALL": 'D', "LEFT_BALL": 'L', "RIGHT_BALL": 'R
        if(value === "|" || value === "_") {
            return EntityTypes.NONE;
        }

        return value;
    }
}