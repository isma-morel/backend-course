import express, { response } from "express";
import Superficie, { Forms } from "./superficie";

const app = express();

app.get("/square", (req, res) => {
  if (req.query.lado !== undefined && isNaN(Number(req.query.lado))) {
    const lado = Number(req.query.lado);
    const result: Forms = Superficie.getSquareArea(lado);
    res.json(result);
  }
  res.end("No es un numero");
});
app.get("/rectangle", (req, res) => {});
app.get("/circle", (req, res) => {});

app.listen(8080, () => console.log("Sv on http://localhost:8080"));
