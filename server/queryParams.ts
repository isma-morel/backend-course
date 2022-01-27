import {
  createServer,
  IncomingMessage,
  ServerResponse,
  STATUS_CODES,
} from "http";

const host = "127.0.0.1";
const port = 8080;

const routes = {
  "/": (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.writeHead(200);
    res.write("Ok 🤣🤣");
    res.end();
  },
};
const sv = createServer((req: IncomingMessage, res: ServerResponse) => {
  const myUrl: URL = new URL(`http://${host}:${req.url}`);
  console.log(myUrl);
  console.log(myUrl.hostname);
  console.log(myUrl.href);
  console.log(myUrl.protocol);
  console.log(myUrl.pathname);
  console.log(myUrl.searchParams);
  console.log(myUrl.search);
  console.log(myUrl.searchParams.get("nombre")); //trae un solo valor de la llave nombre
  console.log(myUrl.searchParams.getAll("nombre")); //trae todos los valores ed la llave nombre en un array
  console.log(myUrl.searchParams.has("apelido")); //dev boolean, depoendiendo si existe llave apelido o no
  console.log(myUrl.searchParams.entries()); //todas las entradas dentro de un arr para iterar
  console.log(myUrl.searchParams.keys()); //TRae todas las key dentro de un array
  console.log(myUrl.searchParams.values()); //todos los values dentro de un arr
  console.log(myUrl.searchParams.toString()); //todos los query params pasado a string
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
