import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { match, MatchResult } from "path-to-regexp";
import { Item } from "./type";

const mock = new MockAdapter(axios);

export const generatePizza = (number: number): Item => ({
  id: number,
  title: `Pizza ${number}`,
  price: number * 10,
  photo: `https://picsum.photos/seed/${number}/200/200`,
});

export const generatePizzas = (
  startNumber: number,
  endNumber: number
): Item[] => {
  let count = startNumber;
  const pizzas = [];
  while (count <= endNumber) {
    pizzas.push(generatePizza(count));
    count++;
  }
  return pizzas;
};

mock.onGet("/items").reply(200, { items: generatePizzas(1, 10) });

const generateToppingList = (number: number) => {
  let count = 1;
  const list = [];
  while (count <= number) {
    list.push({
      id: count,
      name: `Pizza Topping ${count}`,
    });
    count++;
  }
  return list;
};

const generateSizeList = (number: number) => {
  let count = 1;
  const list = [];
  while (count <= number) {
    list.push({
      id: count,
      name: `Pizza Size ${count}`,
    });
    count++;
  }
  return list;
};

type GetItemPath = {
  id: number;
};

mock.onGet(/\/item\/\d+/).reply(async (config: any) => {
  const { id } = (match("/item/:id")(config.url) as MatchResult<GetItemPath>)
    .params;

  await new Promise((r) => setTimeout(r, 1000));

  return [
    200,
    {
      item: {
        id,
        title: `Pizza ${id}`,
        photo: `https://picsum.photos/seed/${id}/200/200`,
        price: id * 10,
        toppings: generateToppingList(id),
        sizes: generateSizeList(id),
      },
    },
  ];
});
