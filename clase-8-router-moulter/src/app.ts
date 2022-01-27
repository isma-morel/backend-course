import express from "express";
import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";

//HasOwnProperty for Typescript
function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

interface Persona {
  nombre: string;
  apellido: string;
  edad: number;
}

interface Mascota {
  nombre: string;
  raza: string;
  edad: number;
}

const app = express();
const mascotas = Router();
const personas = Router();
const port = 8080;

//ENCODED & JSON SIEMPRE PRIMERO
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mascotas", mascotas);
app.use("/personas", personas);

//Para manipular archivos estaticos se usa una funcion middleware:
//app.use(prefijo virtual, express.static(path))
//El path virtual, es decir la ruta es virtual, donde el
//path de acceso no existe
//realmente en el sistema de archivos
//Por lo tanto no se puede acceder a este mediante HTTP methods

//en el path iria el nombre del directorio donde se almacenarian
//todos los archivos estaticos example: css, js, html, png, etc.

//No es necesario poner public en la url

app.use("/static", express.static(__dirname + "/public"));

//Si tienes mas de un directorio de archivos se puede declarar otro
//middleware, por lo tanto es posible usar varios directorios
//example: app.use(express.static("public"))
//Si en los directorios hay files con el mismo nombre, el middleware
//traera al primero q hayamos llamado

const data = JSON.parse(readFileSync(`${__dirname}/data/data.json`, "utf-8"));

const petsArr: Mascota[] = data.mascotas;
const peopleArr: Persona[] = data.personas;

//ENDPOINTS

mascotas.get("/", (req, res) => {
  console.log(petsArr);
  return res.json({ dataPets: petsArr });
});
mascotas.post("/", (req, res) => {
  console.log(req.body);
  if (typeof req.body === "object") {
    const newPet = req.body;
    newPet.edad = parseInt(newPet.edad);
    petsArr.push(newPet);
    const data = {
      mascotas: petsArr,
      personas: peopleArr,
    };
    writeFileSync(`${__dirname}/data/data.json`, JSON.stringify(data));
    return res.json({ agregado: newPet, pos: petsArr.indexOf(newPet) + 1 });
  }
  return res.json({ error: "Invalid data" });
});
personas.get("/", (req, res) => {
  console.log(peopleArr);
  return res.json({ dataPeople: peopleArr });
});
personas.post("/", (req, res) => {
  console.log(req.body);
  if (typeof req.body === "object") {
    const newPerson = req.body;
    newPerson.edad = parseInt(newPerson.edad);
    peopleArr.push(newPerson);
    const data = {
      mascotas: petsArr,
      personas: peopleArr,
    };
    writeFileSync(`${__dirname}/data/data.json`, JSON.stringify(data));
    return res.json({
      agregado: newPerson,
      pos: peopleArr.indexOf(newPerson) + 1,
    });
  }
  return res.json({ error: "Invalid data" });
});

app.listen(port, () => {
  console.log(`Sv on http://localhost:` + port);
});
