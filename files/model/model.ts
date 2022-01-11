export interface Obj {
  title: string;
  price: number;
}

export interface ObjWithId extends Obj {
  id: number;
}
