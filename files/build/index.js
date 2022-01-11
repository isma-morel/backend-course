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
                const file = yield (0, promises_1.readFile)(`./files/${this._name}.txt`);
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield (0, promises_1.readFile)(`./files/${this._name}.txt`);
                const fileParsed = JSON.parse(file.toString());
                this._filesList = fileParsed;
                const fileSearch = (id) => __awaiter(this, void 0, void 0, function* () { return this._filesList.find(({ id: objId }) => objId === id); });
                const fileFound = yield fileSearch(id);
                if (!fileFound) {
                    return console.log("El archivo no existe");
                }
                else {
                    return console.log(fileFound);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield (0, promises_1.readFile)(`./files/${this._name}.txt`, "utf-8");
                const fileParsed = JSON.parse(file.toString());
                this._filesList = fileParsed;
                return console.log(fileParsed);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield (0, promises_1.readFile)(`./files/${this._name}.txt`, "utf-8");
                const fileParsed = JSON.parse(file.toString());
                this._filesList = fileParsed;
                const objStatus = (id) => __awaiter(this, void 0, void 0, function* () { return this._filesList.some(({ id: objId }) => objId === id); });
                const status = yield objStatus(id);
                if (!status)
                    return console.log("No existe el objeto con la id " + id);
                const fileRemover = (id) => __awaiter(this, void 0, void 0, function* () { return this._filesList.filter(({ id: objId }) => id !== objId); });
                const fileRemoved = yield fileRemover(id);
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
content.getById(9);
content.deleteById(1);
content.getAll();
content.deleteAll();
