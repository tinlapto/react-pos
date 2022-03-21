import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../CartItem";
import { CartItem as TypeCartItem } from "../../type";

const item: TypeCartItem = {
  id: 1,
  title: "test item",
  toppings: [{ id: 1, name: "topping 1" }],
  sizes: [{ id: 1, name: "size 1" }],
  selectedToppings: [1],
  selectedSize: 1,
  count: 1,
  price: 10,
};

describe("CartItem", () => {
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
  test("render", () => {
    const onRemove = jest.fn();
    const { asFragment } = render(
      <CartItem item={item} onRemove={onRemove} />,
      { container: document.body }
    );
    expect(asFragment()).toMatchSnapshot();

    //  Click X icon
    fireEvent.click(screen.getByRole("img"));

    //  Click confirm remove
    fireEvent.click(screen.getByText("Remove"));
    expect(onRemove).toBeCalled();
  });
});
