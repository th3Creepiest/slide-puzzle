export class Tile {
  constructor(readonly id: number, readonly empty: boolean) {}

  toString() {
    return `Tile(${this.id})`;
  }
}
