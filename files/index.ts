import { readFileSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import { Obj, ObjWithId } from "./model/model";

class Contenedor {
  _name: string;
  _filesList: ObjWithId[] = [];
  constructor(name: string) {
    this._name = name;
    this._filesList = []; // +1 obj.id === 1  -> obj 2.id === 2
  }
  async save(obj: Obj) {
    // const id: string = randomBytes(4).toString("hex");

    let id: number = 0;
    try {
      //   console.log(this._filesList.length);
      const file = await readFile(`./files/${this._name}.txt`);
      const fileParsed = JSON.parse(file.toString());
      this._filesList = fileParsed;
      if (this._filesList.length) {
        id = this._filesList[this._filesList.length - 1].id + 1;
        const objWithId: ObjWithId = {
          ...obj,
          id: id,
        };
        this._filesList.push(objWithId);
        const txtContent = JSON.stringify(this._filesList);
        // console.log(objWithId);
        await writeFile(`./files/${this._name}.txt`, txtContent, "utf-8");
      } else {
        id = 1;
        const objWithId: ObjWithId = {
          ...obj,
          id: id,
        };
        this._filesList.push(objWithId);
        const txtContent = JSON.stringify(this._filesList);
        await writeFile(`./files/${this._name}.txt`, txtContent, "utf-8");
      }
    } catch (err) {
      console.log(err);
    }
    return id;
  }
  async getById(id: number) {
    try {
      const file = await readFile(`./files/${this._name}.txt`);
      const fileParsed = JSON.parse(file.toString());
      this._filesList = fileParsed;
      const fileSearch = async (id: number) =>
        this._filesList.find(({ id: objId }) => objId === id);
      const fileFound = await fileSearch(id);
      if (!fileFound) {
        return console.log("El archivo no existe");
      } else {
        return console.log(fileFound);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      const file = await readFile(`./files/${this._name}.txt`, "utf-8");
      const fileParsed = JSON.parse(file.toString());
      this._filesList = fileParsed;
      return console.log(fileParsed);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const file = await readFile(`./files/${this._name}.txt`, "utf-8");
      const fileParsed = JSON.parse(file.toString());
      this._filesList = fileParsed;
      const objStatus = async (id: number) =>
        this._filesList.some(({ id: objId }) => objId === id);
      const status = await objStatus(id);
      if (!status) return console.log("No existe el objeto con la id " + id);
      const fileRemover = async (id: number) =>
        this._filesList.filter(({ id: objId }) => id !== objId);
      const fileRemoved = await fileRemover(id);
      const txtContent = JSON.stringify(fileRemoved);
      await writeFile(`./files/${this._name}.txt`, txtContent, "utf-8");
      console.log("Borrado exitoso");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      const emptyList = JSON.stringify([]);
      await writeFile(`./files/${this._name}.txt`, emptyList, "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
}

const content: Contenedor = new Contenedor("file1");
content.save({ title: "xd", price: 12312 });
content.getById(9);
content.deleteById(1);
content.getAll();
content.deleteAll();
