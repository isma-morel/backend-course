import express from "express";
import { readFileSync } from "fs";

const app = express();

const port = 8080;

let visitas = 0;

app.get("/", (req, res) => {
  const HTMLfile = readFileSync(`${__dirname}/data/data.html`);
  res.setHeader("Content-type", "text/html");
  //   res.writeHead(200);
  res.send(HTMLfile);
});
app.get("/visitas", (req, res) => {
  res.send(`Visitas: ${++visitas}`);
});
app.get("/fyh", (req, res) => {
  const dateNow: Date = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();
  const seconds = dateNow.getSeconds();
  const minutes = dateNow.getMinutes();
  const hours = dateNow.getHours();
  const data: string = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  res.send({ fyh: data });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

app.on("error", (err) => console.log("Server Error: " + err));

//DEMO: https://elite-verbena-cousin.glitch.me
