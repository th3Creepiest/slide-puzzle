import { Board } from "./Board";
import { Tile } from "./Tile";

export class Game {
  readonly container: HTMLDivElement;
  readonly board: Board;
  readonly shuffleButton: HTMLButtonElement;
  readonly movesLabel: HTMLDivElement;
  private boardElement: HTMLDivElement;

  constructor(rows: number, cols: number) {
    this.container = document.createElement("div");
    this.container.id = "slide-puzzle";
    this.board = new Board(rows, cols);
    this.boardElement = this.createBoardElement();
    this.shuffleButton = this.createShuffleButton();
    this.movesLabel = this.createMovesLabel();
    this.appendElementsToContainer();
  }

  private createBoardElement(): HTMLDivElement {
    const boardElement = document.createElement("div");
    boardElement.id = "board";
    boardElement.style.gridTemplateColumns = `repeat(${this.board.cols}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${this.board.rows}, 1fr)`;

    this.board.tiles.forEach((tile) => {
      const tileElement = this.renderTile(tile);
      this.addTileClickHandler(tileElement, tile);
      boardElement.appendChild(tileElement);
    });

    return boardElement;
  }

  private addTileClickHandler(tileElement: HTMLDivElement, tile: Tile): void {
    tileElement.addEventListener("click", () => {
      if (this.board.moveTile(tile)) {
        this.update();
        this.updateMovesLabel();
        this.checkWinCondition();
      }
    });
  }

  private createShuffleButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = "shuffle-button";
    button.innerText = "Shuffle";
    button.onclick = () => this.handleShuffle();
    return button;
  }

  private handleShuffle(): void {
    this.board.shuffle();
    this.update();
    this.updateMovesLabel();
  }

  private createMovesLabel(): HTMLDivElement {
    const label = document.createElement("div");
    label.id = "moves-label";
    label.innerText = "Moves: 0";
    return label;
  }

  private appendElementsToContainer(): void {
    this.container.appendChild(this.boardElement);
    this.container.appendChild(this.shuffleButton);
    this.container.appendChild(this.movesLabel);
    document.body.appendChild(this.container);
  }

  private renderTile(tile: Tile): HTMLDivElement {
    const container = document.createElement("div");
    container.id = `tile-${tile.id}`;
    container.classList.add("tile");
    if (!tile.empty) container.textContent = (tile.id + 1).toString();
    return container;
  }

  private update(): void {
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

  private updateMovesLabel(): void {
    this.movesLabel.innerText = `Moves: ${this.board.totalMoves}`;
  }

  private checkWinCondition(): void {
    if (this.board.isSolved()) alert("You won!");
  }
}
