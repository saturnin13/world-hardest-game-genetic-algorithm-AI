class Tile {
    constructor(tileType) {
        this.tileType = tileType;
    }

    getColor(x, y) {
        switch(this.tileType) {
            case TileTypes.FLOOR:
                return (x + y) % 2 === 0 ? {R: 247, G: 247, B: 255}: {R: 230, G: 230, B: 255};
                break;
            case TileTypes.GOAL:
                return {R: 181, G: 254, B: 180};
                break;
            case TileTypes.SAFE:
                return {R: 181, G: 254, B: 180};
                break;
            case TileTypes.WALL:
                return {R: 180, G: 181, B: 254};
                break;
            default:
        }
    }
}