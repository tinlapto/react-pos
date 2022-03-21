export type Item = {
  id: number;
  title: string;
  photo: string;
  price: number;
};

export type Topping = {
  id: number;
  name: string;
};

export type Size = {
  id: number;
  name: string;
};

export type ItemDetail = Item & {
  toppings: Topping[];
  sizes: Size[];
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  toppings: Topping[];
  sizes: Size[];
  selectedToppings: number[];
  selectedSize: number;
  count: number;
};
