import { readFileSync } from "fs";
import {
  createServer,
  IncomingMessage,
  ServerResponse,
  STATUS_CODES,
} from "http";

/*
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  //Headers
  res.writeHead(200, { "Content-Type": "application/json" });
  //sirve para terminar la petición y enviarle datos al cliente.
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

const connectedServer = server.listen(8000, () => {
  const date: Date = new Date();
  const hours: number = date.getHours();
  console.log("fu");
  const arr1: number[] = [6, 7, 8, 9, 10, 11, 12];
  const arr2: number[] = [13, 14, 15, 16, 17, 18, 19];
  const arr3: number[] = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5];
  console.log(hours);
  const minutes: number = date.getMinutes();
  if (arr1.includes(hours)) console.log("buenos dias");
  if (arr2.includes(hours)) console.log("buenas tardes");
  if (arr3.includes(hours)) console.log("buenas noches");
});
*/

const host = "127.0.0.1";
const port = 8080;

//INDEXAR USANDO STRINGS
// const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
//   obj[key];

const routes = {
  "/": (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.writeHead(200);
    res.write("Hola");
    res.end();
  },
  "/json": (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.writeHead(200);
    const data = {
      name: "isma",
      age: 18,
    };
    res.end(JSON.stringify(data));
  },
  "/html": (req: IncomingMessage, res: ServerResponse) => {
    //FORMA INCORRECTA DE DEVOLVER HTML
    // res.setHeader("Content-Type", "text/html");
    // res.writeHead(200);
    // const data =
    //   "<html><body><h1 style='font-size: 20px, color: black;'>Devolviendo HTML</h1></body></html>";
    // res.end(JSON.stringify(data));

    //FORMA CORRECTA
    const file = readFileSync(`${__dirname}/data.html`);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(file);
  },
  "/csv": (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=amigos.csv");
    res.writeHead(200);
    res.end("codigo, nombre, email \n 123, isma, ismaelmorel84@gmail.com");
  },
};
const sv = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(req.headers);
  console.log(req.headers["user-agent"]);
  console.log(req.method);
  //FORMA INCORRECTA
  // if (req.url in routes) {
  //   return routes[req.url](req, res);
  // }
  if (req.url) {
    if (req.url in routes) {
      const url: string = req.url;
      return routes[url](req, res);
    }
  }
  res.writeHead(404);
  res.end(STATUS_CODES[404]);
});

sv.listen(port, host, () => {
  console.log("Sv on");
});
