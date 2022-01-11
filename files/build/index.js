"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
class Contenedor {
    constructor(name) {
        this._filesList = [];
        this._name = name;
        this._filesList = []; // +1 obj.id === 1  -> obj 2.id === 2
    }
    save(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            // const id: string = randomBytes(4).toString("hex");
            let id = 0;
            try {
                //   console.log(this._filesList.length);
                const file = (0, fs_1.readFileSync)(`./files/${this._name}.txt`);
                const fileParsed = JSON.parse(file.toString());
                this._filesList = fileParsed;
                if (this._filesList.length) {
                    id = this._filesList[this._filesList.length - 1].id + 1;
                    const objWithId = Object.assign(Object.assign({}, obj), { id: id });
                    this._filesList.push(objWithId);
                    const txtContent = JSON.stringify(this._filesList);
                    // console.log(objWithId);
                    yield (0, promises_1.writeFile)(`./files/${this._name}.txt`, txtContent, "utf-8");
                }
                else {
                    id = 1;
                    const objWithId = Object.assign(Object.assign({}, obj), { id: id });
                    this._filesList.push(objWithId);
                    const txtContent = JSON.stringify(this._filesList);
                    yield (0, promises_1.writeFile)(`./files/${this._name}.txt`, txtContent, "utf-8");
                }
            }
            catch (err) {
                console.log(err);
            }
            return id;
        });
    }
    getById(id) {
        const file = (0, fs_1.readFileSync)(`./files/${this._name}.txt`);
        const fileParsed = JSON.parse(file.toString());
        this._filesList = fileParsed;
        const fileFound = this._filesList.find(({ id: objId }) => id === objId);
        //   console.log(fileFound);
        if (!fileFound) {
            return "El archivo no existe";
        }
        else {
            return fileFound;
        }
    }
    getAll() {
        const file = (0, fs_1.readFileSync)(`./files/${this._name}.txt`);
        const fileParsed = JSON.parse(file.toString());
        this._filesList = fileParsed;
        return fileParsed;
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = (0, fs_1.readFileSync)(`./files/${this._name}.txt`);
                const fileParsed = JSON.parse(file.toString());
                this._filesList = fileParsed;
                if (!this._filesList.some(({ id: objId }) => objId === id))
                    return console.log("No existe el objeto con la id " + id);
                const fileRemoved = this._filesList.filter(({ id: objId }) => id !== objId);
                const txtContent = JSON.stringify(fileRemoved);
                yield (0, promises_1.writeFile)(`./files/${this._name}.txt`, txtContent, "utf-8");
                console.log("Borrado exitoso");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emptyList = JSON.stringify([]);
                yield (0, promises_1.writeFile)(`./files/${this._name}.txt`, emptyList, "utf-8");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const content = new Contenedor("file1");
content.save({ title: "xd", price: 12312 });
// content.getById(9);
// content.deleteById(1);
// content.getAll();
// content.deleteAll();
