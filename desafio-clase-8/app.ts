import express, { Router, Request, NextFunction, Response } from "express";
import { readFileSync, writeFileSync } from "fs";

//Interfaces

interface Product {
  title: string;
  price: number;
  src: string;
}

interface ProductWithId extends Product {
  id: number;
}

const app = express();

const port = 8080;

const productos = Router();

//middlewares

const data: ProductWithId[] = JSON.parse(
  readFileSync(__dirname + "/src/data/productos.json", "utf-8")
);

const functions = {
  POST: (req: Request, res: Response, next: NextFunction) => {
    const { price, title, src } = req.body;
    if (
      parseInt(price) > 0 &&
      price !== " " &&
      title &&
      title !== " " &&
      src &&
      src !== " "
    ) {
      req.body.price = parseInt(price);
      const newId = data[data.length - 1].id + 1;
      req.body.id = newId;
      return next();
    }
    return res.end("Completa los campos por favor");
  },
  GETANDDELETE: (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id) && data.some(({ id: idProduct }) => idProduct === id)) {
      return next();
    }
    res.end(
      isNaN(id)
        ? "El id ingresado no es un numero"
        : "El id ingresado no se encuentra en la lista de productos"
    );
  },
  PUT: (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id) && data.some(({ id: idProduct }) => idProduct === id)) {
      const { price, title, src } = req.body;
      if (
        parseInt(price) > 0 &&
        price !== " " &&
        title &&
        title !== " " &&
        src &&
        src !== " "
      ) {
        req.body.price = parseInt(price);
        const newId = parseInt(req.params.id);
        req.body.id = newId;
        return next();
      }
      return res.end("Todos los campos deben estar completos");
    }
    return res.end(
      isNaN(id)
        ? "El id ingresado no es un numero"
        : "El id ingresado no se encuentra en la lista de productos"
    );
  },
};

const validacion = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET" || req.method === "DELETE") {
    return functions["GETANDDELETE"](req, res, next);
  } else if (req.method === "POST") {
    return functions[req.method](req, res, next);
  } else if (req.method === "PUT") {
    return functions[req.method](req, res, next);
  }
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productos);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

productos.get("/", (req, res) => {
  res.send({ productos: data });
});

productos.get("/:id", validacion, (req, res) => {
  const id = parseInt(req.params.id);
  const objFound = data.find(({ id: productId }) => productId === id);
  res.send({
    producto: objFound,
  });
});

productos.post("/", validacion, (req, res) => {
  const newProduct: ProductWithId = req.body;
  data.push(newProduct);
  writeFileSync(__dirname + "/src/data/productos.json", JSON.stringify(data));
  res.send({ producto: newProduct, id: newProduct.id });
});

productos.put("/:id", validacion, (req, res) => {
  const paramId = parseInt(req.params.id);
  const dataModified: ProductWithId[] = data.filter(({ id }) => id !== paramId);
  const productModified = req.body;
  const previousObj = data.find(({ id }) => id === paramId);
  dataModified.push(productModified);
  dataModified.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log(dataModified);
  writeFileSync(
    __dirname + "/src/data/productos.json",
    JSON.stringify(dataModified)
  );
  res.send({
    previousObj: previousObj,
    newObj: productModified,
    id: parseInt(req.params.id),
  });
});

productos.delete("/:id", validacion, (req, res) => {
  const newData = data.filter(({ id }) => id !== parseInt(req.params.id));
  const previousObj = data.find(({ id }) => id === parseInt(req.params.id));
  writeFileSync(
    __dirname + "/src/data/productos.json",
    JSON.stringify(newData)
  );
  res.send({ productoBorrado: previousObj, productosActualizados: newData });
});

app.listen(port, () => console.log("Sv listening in http://localhost:" + port));

app.on("error", (err) => console.log(err));
