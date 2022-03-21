import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../Cart";
import { CartItem as TypeCartItem } from "../../type";

const items: TypeCartItem[] = [
  {
    id: 1,
    title: "test item",
    toppings: [{ id: 1, name: "topping 1" }],
    sizes: [{ id: 1, name: "size 1" }],
    selectedToppings: [1],
    selectedSize: 1,
    count: 1,
    price: 10,
  },
  {
    id: 2,
    title: "test item",
    toppings: [{ id: 1, name: "topping 1" }],
    sizes: [{ id: 1, name: "size 1" }],
    selectedToppings: [1],
    selectedSize: 1,
    count: 1,
    price: 10,
  },
];

describe("Cart", () => {
  beforeAll(() => {
    // @ts-ignore
    delete window.matchMedia;
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });
  test("render remove one", () => {
    const onSetItems = jest.fn();
    const { asFragment } = render(
      <Cart items={items} setItems={onSetItems} />,
      { container: document.body }
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(screen.getAllByRole("img")[0]);
    fireEvent.click(screen.getByText("Remove"));
    expect(onSetItems).toBeCalledWith(items.slice(1));
  });

  test("render remove all", () => {
    const onSetItems = jest.fn();
    const { asFragment } = render(
      <Cart items={items} setItems={onSetItems} />,
      { container: document.body }
    );
    expect(asFragment()).toMatchSnapshot();
    const imgs = screen.getAllByRole("img");
    fireEvent.click(imgs[imgs.length - 1]);
    fireEvent.click(screen.getByText("Remove"));
    expect(onSetItems).toBeCalledWith([]);
  });
});
