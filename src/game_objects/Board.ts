import { Tile } from "./Tile";

export class Board {
  readonly tiles: Tile[] = [];
  totalMoves: number = 0;

  constructor(readonly rows: number, readonly cols: number) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.tiles.push(
          new Tile(
            i * this.cols + j,
            i === this.rows - 1 && j === this.cols - 1
          )
        );
      }
    }
  }

  shuffle() {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
    this.totalMoves = 0;
  }

  moveTile(tile: Tile): boolean {
    const emptyTile = this.tiles.find((t) => t.empty)!;
    const tileIndex = this.tiles.indexOf(tile);
    const emptyTileIndex = this.tiles.indexOf(emptyTile);
    const tileRow = Math.floor(tileIndex / this.cols);
    const tileCol = tileIndex % this.cols;
    const emptyTileRow = Math.floor(emptyTileIndex / this.cols);
    const emptyTileCol = emptyTileIndex % this.cols;

    if (
      (tileRow === emptyTileRow && Math.abs(tileCol - emptyTileCol) === 1) ||
      (tileCol === emptyTileCol && Math.abs(tileRow - emptyTileRow) === 1)
    ) {
      this.tiles[emptyTileIndex] = tile;
      this.tiles[tileIndex] = emptyTile;
      this.totalMoves++;
      return true;
    }
    return false;
  }

  isSolved(): boolean {
    for (let i = 0; i < this.rows * this.cols - 1; i++) {
      if (this.tiles[i].id !== i) return false;
    }
    return true;
  }
}
