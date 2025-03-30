import { Board } from "./Board"

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
