class Color {
  getColor(): string {
    const red: number = Math.floor(Math.random() * (256 - 0) + 0);
    const green: number = Math.floor(Math.random() * (256 - 0) + 0);
    const blue: number = Math.floor(Math.random() * (256 - 0) + 0);
    return `RGB: ${red}, ${green}, ${blue}`;
  }
}

const color1: string = new Color().getColor();
const color2: string = new Color().getColor();
const color3: string = new Color().getColor();

console.log(color1, color2, color3);
