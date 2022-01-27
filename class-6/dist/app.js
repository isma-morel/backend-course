"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const app = (0, express_1.default)();
const port = 8080;
let visitas = 0;
app.get("/", (req, res) => {
    const HTMLfile = (0, fs_1.readFileSync)(`${__dirname}/data/data.html`);
    res.setHeader("Content-type", "text/html");
    //   res.writeHead(200);
    res.send(HTMLfile);
});
app.get("/visitas", (req, res) => {
    res.send(`Visitas: ${++visitas}`);
});
app.get("/fyh", (req, res) => {
    const dateNow = new Date();
    const day = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    const seconds = dateNow.getSeconds();
    const minutes = dateNow.getMinutes();
    const hours = dateNow.getHours();
    const data = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    res.send({ fyh: data });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
app.on("error", (err) => console.log("Server Error: " + err));
//# sourceMappingURL=app.js.map