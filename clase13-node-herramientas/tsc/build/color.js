"use strict";
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.prototype.getColor = function () {
        var red = Math.floor(Math.random() * (256 - 0) + 0);
        var green = Math.floor(Math.random() * (256 - 0) + 0);
        var blue = Math.floor(Math.random() * (256 - 0) + 0);
        return "RGB: ".concat(red, ", ").concat(green, ", ").concat(blue);
    };
    return Color;
}());
var color1 = new Color().getColor();
var color2 = new Color().getColor();
var color3 = new Color().getColor();
console.log(color1, color2, color3);
