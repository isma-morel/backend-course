interface Book {
  name: string;
  autor: string;
}

class User {
  name: string;
  lastName: string;
  books: Book[];
  pets: string[];
  constructor(name: string, lastName: string, pet: string) {
    this.name = name;
    this.lastName = lastName;
    this.books = [];
    this.pets = [pet];
  }
  getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  addPet(pet: string): void {
    this.pets.push(pet);
  }
  countPets(): number {
    return this.pets.length;
  }
  addBook(name: string, autor: string): void {
    const book: Book = {
      name: name,
      autor: autor,
    };
    this.books.push(book);
  }
  getBookNames(): string[] {
    return this.books.map(({ name }) => name);
  }
}

const user: User = new User("Ismael", "Morel", "gato");

console.log(user.getFullName());
user.addPet("perro");
console.log(user.countPets());

user.addBook("La vida invisible", "Addie Larue");

user.addBook("La vida invisible 2", "Addie Larue");

console.log(user.getBookNames());
