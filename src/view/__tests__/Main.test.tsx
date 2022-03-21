import { render, screen, fireEvent } from "@testing-library/react";
import { CartItem } from "../../type";
import Main from "../Main";

const pizza: CartItem = {
  id: 1,
  title: "test name",
  price: 10,
  toppings: [{ id: 1, name: "topping 1" }],
  sizes: [{ id: 1, name: "size 1" }],
  selectedToppings: [1],
  selectedSize: 1,
  count: 1,
};

const Gallery = ({ onClick }: { onClick: (v: number) => void }) => {
  return <button onClick={() => onClick(1)}>Card Add</button>;
};
const ItemDialog = ({
  id,
  onAdd,
  onCancel,
}: {
  id: number | undefined;
  onAdd: (item: CartItem) => void;
  onCancel: () => void;
}) => (
  <>
    <div>{id}</div>
    <button onClick={() => onAdd(pizza)}>Add To Cart</button>
    <button onClick={onCancel}>Cancel</button>
  </>
);
jest.mock("../Gallery", () => Gallery);
jest.mock("../ItemDialog", () => ItemDialog);

describe("Main", () => {
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
    const { asFragment } = render(<Main />);
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(screen.getByText("Card Add"));
    fireEvent.click(screen.getByText("Add To Cart"));
    fireEvent.click(screen.getByText("Cancel"));
  });
});
