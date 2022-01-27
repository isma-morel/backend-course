"use strict";
class User {
    constructor(name, lastName, pet) {
        this.name = name;
        this.lastName = lastName;
        this.books = [];
        this.pets = [pet];
    }
    getFullName() {
        return `${this.name} ${this.lastName}`;
    }
    addPet(pet) {
        this.pets.push(pet);
    }
    countPets() {
        return this.pets.length;
    }
    addBook(name, autor) {
        const book = {
            name: name,
            autor: autor,
        };
        this.books.push(book);
    }
    getBookNames() {
        return this.books.map(({ name }) => name);
    }
}
const user = new User("Ismael", "Morel", "gato");
console.log(user.getFullName());
user.addPet("perro");
console.log(user.countPets());
user.addBook("La vida invisible", "Addie Larue");
user.addBook("La vida invisible 2", "Addie Larue");
console.log(user.getBookNames());
