import express from "express";
import { Contenedor } from "./class";

const app = express();
const port = 8080 || process.env.PORT;

const data = new Contenedor();

app.listen(port, () => {
  console.log(`Sv listening on ${port}`);
});

app.on("error", (err) => {
  console.log("Sv Error: " + err);
});

app.get("/", (req, res) => {
  res.send(JSON.stringify({ data: "Servidor on" }));
});
app.get("/productos", (req, res) => {
  res.send(JSON.stringify({ data: data.getAll() }));
});
app.get("/productoRandom", (req, res) => {
  res.send(JSON.stringify({ data: data.getRandomProduct() }));
});

//DEMO https://navy-melon-grip.glitch.me
