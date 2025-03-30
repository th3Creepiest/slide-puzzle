import { Tile } from "./Tile"

export class Board {
  readonly tiles: Tile[] = []

  constructor(readonly rows: number, readonly cols: number) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.tiles.push(new Tile(i * this.cols + j, i === this.rows - 1 && j === this.cols - 1))
      }
    }
  }

  render(): HTMLDivElement {
    const container = document.createElement("div")
    container.id = "board"
    container.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`
    container.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`
    this.tiles.forEach((tile) => {
      const tileElement = tile.render()
      tileElement.addEventListener("click", () => this.moveTile(tile))
      container.appendChild(tileElement)
    })
    return container
  }

  moveTile(tile: Tile) {
    const emptyTile = this.tiles.find((t) => t.empty)!
    const tileIndex = this.tiles.indexOf(tile)
    const emptyTileIndex = this.tiles.indexOf(emptyTile)
    const tileRow = Math.floor(tileIndex / this.cols)
    const tileCol = tileIndex % this.cols
    const emptyTileRow = Math.floor(emptyTileIndex / this.cols)
    const emptyTileCol = emptyTileIndex % this.cols

    if (
      (tileRow === emptyTileRow && Math.abs(tileCol - emptyTileCol) === 1) ||
      (tileCol === emptyTileCol && Math.abs(tileRow - emptyTileRow) === 1)
    ) {
      this.tiles[emptyTileIndex] = tile
      this.tiles[tileIndex] = emptyTile
      this.updateTilePosition(tile)
      this.updateTilePosition(emptyTile)
    }
  }

  updateTilePosition(tile: Tile) {
    const tileElement = document.getElementById(`tile-${tile.id}`)!
    const index = this.tiles.indexOf(tile)
    const row = Math.floor(index / this.cols)
    const col = index % this.cols
    tileElement.style.gridRowStart = `${row + 1}`
    tileElement.style.gridColumnStart = `${col + 1}`
  }
}
