class Color {
  getColor() {
    const red = Math.floor(Math.random() * (256 - 0) + 0);
    const green = Math.floor(Math.random() * (256 - 0) + 0);
    const blue = Math.floor(Math.random() * (256 - 0) + 0);
    return `RGB: ${red}, ${green}, ${blue}`;
  }
}

const color1 = new Color().getColor();
const color2 = new Color().getColor();
const color3 = new Color().getColor();

console.log(color1, color2, color3);
