import { Board } from "./Board";
import { Tile } from "./Tile";

export class Game {
  readonly container: HTMLDivElement;
  readonly board: Board;
  readonly shuffleButton: HTMLButtonElement;
  readonly movesLabel: HTMLDivElement;

  constructor(rows: number, cols: number) {
    this.board = new Board(rows, cols);
    this.container = document.createElement("div");
    this.container.id = "slide-puzzle";

    // Create board
    const boardElement = document.createElement("div");
    boardElement.id = "board";
    boardElement.style.gridTemplateColumns = `repeat(${this.board.cols}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${this.board.rows}, 1fr)`;
    this.board.tiles.forEach((tile) => {
      const tileElement = this.renderTile(tile);
      tileElement.addEventListener("click", () => {
        if (this.board.moveTile(tile)) {
          this.update();
          this.updateMovesLabel();
          if (this.board.isSolved()) alert("You won!");
        }
      });
      boardElement.appendChild(tileElement);
    });

    // Create shuffle button
    this.shuffleButton = document.createElement("button");
    this.shuffleButton.id = "shuffle-button";
    this.shuffleButton.innerText = "Shuffle";
    this.shuffleButton.onclick = () => {
      this.board.shuffle();
      this.update();
      this.updateMovesLabel();
    };

    // Create moves counter label
    this.movesLabel = document.createElement("div");
    this.movesLabel.id = "moves-label";
    this.updateMovesLabel();

    // Append elements to container
    this.container.appendChild(boardElement);
    this.container.appendChild(this.shuffleButton);
    this.container.appendChild(this.movesLabel);
    document.body.appendChild(this.container);
  }

  renderTile(tile: Tile): HTMLDivElement {
    const container = document.createElement("div");
    container.id = `tile-${tile.id}`;
    container.classList.add("tile");
    if (!tile.empty) container.textContent = (tile.id + 1).toString();
    return container;
  }

  update() {
    const boardElement = this.container.querySelector("#board");
    if (!boardElement) return;

    // Update each tile's position in the grid
    this.board.tiles.forEach((tile, index) => {
      const row = Math.floor(index / this.board.cols);
      const col = index % this.board.cols;
      const tileElement = boardElement.querySelector(
        `#tile-${tile.id}`
      ) as HTMLDivElement;

      if (tileElement) {
        // Update tile position
        tileElement.style.gridRow = `${row + 1}`;
        tileElement.style.gridColumn = `${col + 1}`;

        // Update tile appearance
        if (tile.empty) {
          tileElement.textContent = "";
          tileElement.classList.add("empty");
        } else {
          tileElement.textContent = (tile.id + 1).toString();
          tileElement.classList.remove("empty");
        }
      }
    });
  }

  updateMovesLabel() {
    this.movesLabel.innerText = `Moves: ${this.board.totalMoves}`;
  }
}
