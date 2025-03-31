import { Board } from "./Board";

export class Game {
  readonly container: HTMLDivElement;
  readonly board: Board;
  readonly shuffleButton: HTMLButtonElement;

  constructor(rows: number, cols: number) {
    this.board = new Board(rows, cols);
    this.container = document.createElement("div");
    this.container.id = "slide-puzzle";
    this.shuffleButton = document.createElement("button");
    this.shuffleButton.id = "shuffle-button";
    this.shuffleButton.innerText = "Shuffle";
    this.shuffleButton.onclick = () => this.board.shuffle();
    this.container.appendChild(this.board.render());
    this.container.appendChild(this.shuffleButton);
    document.body.appendChild(this.container);
  }
}
