export class Tile {
  constructor(readonly id: number, readonly empty: boolean) {}

  toString() {
    return `Tile(${this.id})`
  }

  render(): HTMLDivElement {
    const container = document.createElement("div")
    container.id = `tile-${this.id}`
    container.classList.add("tile")
    if (!this.empty) container.textContent = (this.id + 1).toString()
    return container
  }
}
