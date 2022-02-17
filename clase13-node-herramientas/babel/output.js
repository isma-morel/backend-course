"use strict";

var arr = [1, 2, 3, 4];
arr.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return console.log(x);
});
