import { readFileSync } from "fs";
import { Product } from "./models/models";
export class Contenedor {
  _productArr: Product[];
  constructor() {
    this._productArr = JSON.parse(
      readFileSync(`${__dirname}/data/productos.txt`, "utf-8")
    );
  }
  getAll(): Product[] {
    return this._productArr;
  }
  getRandomProduct(): Product | string {
    const max = this._productArr[this._productArr.length - 1].id + 1;
    const idRandom = Math.floor(Math.random() * (max - 1) + 1);
    const randomProduct = this._productArr.find(({ id }) => id === idRandom);
    if (!!randomProduct) {
      return randomProduct;
    }
    return "Error: El producto no existe";
  }
}

