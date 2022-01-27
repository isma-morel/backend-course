import express from "express";
import { readFileSync, writeFileSync } from "fs";

const app = express();

const port = 8080 || process.env.PORT;

//Con esto decimos que estamos recibiendo un JSON y que lo va a codificar como JSON
//Indicamos que middlewares vamos a usar
//Middleware: funcionalidad que se utiliza para la trasnformacion de datos cuando entran
//o salen del servidor
//Middleware: EN MEDIO DE
app.use(express.json());

//decodificacion que estoy usando
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Sv on ${port}`);
});

//QUERY Y URL PARAMS
// app.get("/", (req, res) => {
//   console.log(req.query);
//   if (req.query.name) {
//     return res.send("Your name is " + req.query.name);
//   }
//   return res.send("You dont have name");
// });
// app.get("/:id", (req, res) => {
//   console.log(req.params);
//   if (req.params.id) {
//     return res.send("Your name is " + req.params.id);
//   }
//   return res.send("Sv on");
// });

//DESAFIO

// const frase = "Hola mundo como estan";

// app.get("/api/frase", (req, res) => {
//   return res.json({ frase: frase });
// });
// app.get("/api/letras/:num", (req, res) => {
//   const index: number = parseInt(req.params.num);
//   const phraseTrimmed = frase.split(" ").join("");
//   if (!isNaN(index) && index !== 0 && index <= phraseTrimmed.length) {
//     console.log(phraseTrimmed);
//     return res.send("The letter found is: " + phraseTrimmed[index - 1]);
//   }
//   return res.json({ response: "Invalid URL Param" });
// });
// app.get("/api/palabras/:num", (req, res) => {
//   const arrPhrase = frase.split(" ");
//   const index: number = parseInt(req.params.num);
//   if (!isNaN(index) && index !== 0 && index <= arrPhrase.length) {
//     console.log(arrPhrase);
//     return res.send("The word found is: " + arrPhrase[index - 1]);
//   }
//   return res.json({ response: "Invalid URL Param" });
// });

//CLASE
// app.post("/", (req, res) => {
//   console.log(req.body);
//   return res.json({ response: "Received" });
// });

//DESAFIO 2

let frase = JSON.parse(
  readFileSync(`${__dirname}/data/frase.json`, "utf-8")
).frase;
let arrFrase: string[] = frase.split(" ");

app.get("/api/frase", (req, res) => {
  console.log(frase);
  return res.json({ frase: frase });
});

app.get("/api/palabras/:num", (req, res) => {
  const index: number = parseInt(req.params.num);
  if (!isNaN(index) && index !== 0 && index <= arrFrase.length) {
    console.log(arrFrase);
    return res.json({ buscada: arrFrase[index - 1] });
  }
  return res.json({ response: "Invalid URL Param" });
});
app.post("/api/palabras", (req, res) => {
  if (req.body.palabra && req.body.palabra !== "" && req.body.palabra !== " ") {
    arrFrase.push(req.body.palabra);
    const data = arrFrase.join(" ");
    console.log(data);
    frase = data;
    writeFileSync(
      `${__dirname}/data/frase.json`,
      JSON.stringify({ frase: data })
    );
    return res.json({ agragada: req.body.palabra, pos: arrFrase.length + 1 });
  }
  return res.json({ response: "Invalid data" });
});

app.put("/api/palabras/:pos", (req, res) => {
  const index: number = parseInt(req.params.pos);
  if (!isNaN(index) && index !== 0 && index <= arrFrase.length) {
    if (
      req.body.palabra &&
      req.body.palabra !== "" &&
      req.body.palabra !== " "
    ) {
      const previousWord = arrFrase[index - 1];
      arrFrase[index - 1] = req.body.palabra;

      const data = arrFrase.join(" ");
      writeFileSync(
        `${__dirname}/data/frase.json`,
        JSON.stringify({ frase: data })
      );

      return res.json({
        actualizada: arrFrase[index - 1],
        anterior: previousWord,
      });
    }
    return res.json({
      response: "Invalid data",
    });
  }
  return res.json({
    response: "Invalid URL Params",
  });
});

app.delete("/api/palabras/:pos", (req, res) => {
  const arrIndex: number = parseInt(req.params.pos);
  if (!isNaN(arrIndex) && arrIndex !== 0 && arrIndex <= arrFrase.length) {
    console.log(arrFrase);
    const previousWord = arrFrase[arrIndex - 1];
    arrFrase = arrFrase.filter((_, index) => index !== arrIndex - 1);
    console.log(arrFrase);
    const data = arrFrase.join(" ");
    writeFileSync(
      `${__dirname}/data/frase.json`,
      JSON.stringify({ frase: data })
    );
    return res.json({ borrada: previousWord });
  }
  return res.json({ response: "Invalid URL Param" });
});

app.on("error", (err) => {
  console.log("Sv Error: " + err);
});
