class LevelLoader {
    loadLevel1() {
        return this.__loadLevel(1);
    }

    __loadLevel(number) {
        var levelRaw = FileLoader.__readTextFile("./level_configuration/level" + number + ".txt");
        var level = [];

        var currentLine = [];
        var i;
        var j = 0;
        for (i = 0; i < levelRaw.length; i++) {
            var currentCharacter = levelRaw[i];
            if(currentCharacter === ' ') {
                continue;
            } else if (currentCharacter === '\n') {
                j++;
                level.push(currentLine);
                currentLine = [];
            } else {
                currentLine.push(new Tile(Number(currentCharacter)))
            }
        }

        return level;
    }
}