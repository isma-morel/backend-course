export interface Forms {
  perimetro: number;
  area: number;
}

export default class Superficie {
  static getSquareArea(l: number): Forms {
    const squareDetails: Forms = {
      perimetro: 4 * l,
      area: l ** 2,
    };
    return squareDetails;
  }
  static getRectangleArea(b: number, h: number): Forms {
    return {
      perimetro: 2 * b + 2 * h,
      area: b * h,
    };
  }
  static getCircleArea(r: number, h: number): Forms {
    return {
      perimetro: 2 * Math.PI * r,
      area: r ** 2 * Math.PI,
    };
  }
}
