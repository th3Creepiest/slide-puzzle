export class Game {
  readonly board: Board
  constructor(rows: number, cols: number) {
    this.board = new Board(rows, cols)
  }
  start() {
    const board = this.board.render()
    const container = document.createElement("div")
    container.id = "slide-puzzle"
    container.appendChild(board)
    document.body.appendChild(container)
  }
}

class Board {
  readonly tiles: Tile[] = []
  constructor(readonly rows: number, readonly cols: number) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.tiles.push(new Tile(i * this.cols + j))
      }
    }
  }
  render(): HTMLDivElement {
    const container = document.createElement("div")
    container.id = "board"
    container.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`
    container.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`
    this.tiles.forEach((tile) => container.appendChild(tile.render()))
    return container
  }
}

class Tile {
  constructor(readonly id: number) {}
  render(): HTMLDivElement {
    const container = document.createElement("div")
    container.id = `tile-${this.id}`
    container.classList.add("tile")
    container.textContent = (this.id + 1).toString()
    return container
  }
}
