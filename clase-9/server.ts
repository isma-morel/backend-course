import express, { Router } from "express";

const app = express();
const port = 8080;
const api = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api", api);
app.listen(port, () => console.log("sv listening on http://localhost:" + port));
