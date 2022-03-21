import { render, screen, fireEvent } from "@testing-library/react";
import { ItemDetail } from "../../type";
import ItemDialog from "../ItemDialog";

const pizza: ItemDetail = {
  id: 1,
  title: "test name",
  price: 10,
  photo: "test photo",
  toppings: [{ id: 1, name: "topping 1" }],
  sizes: [{ id: 1, name: "size 1" }],
};

let mockIsLoading = false;
jest.mock("../../api", () => ({
  useGetItem: () => ({
    data: pizza,
    refetch: () => {},
    isLoading: mockIsLoading,
  }),
}));

describe("ItemDialog", () => {
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

  test("render add", () => {
    const onAdd = jest.fn();
    const onCancel = jest.fn();
    const { asFragment } = render(
      <ItemDialog id={1} onAdd={onAdd} onCancel={onCancel} />,
      { container: document.body }
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("topping 1"));

    fireEvent.click(screen.getByText("size 1"));

    fireEvent.click(screen.getByText("Add To Cart"));

    expect(onAdd).toBeCalledWith({
      ...pizza,
      selectedToppings: [1],
      selectedSize: 1,
      count: 1,
    });
  });

  test("render cancel", () => {
    const onAdd = jest.fn();
    const onCancel = jest.fn();
    render(<ItemDialog id={1} onAdd={onAdd} onCancel={onCancel} />, {
      container: document.body,
    });

    // fireEvent.click(screen.getByText("Cancel"));
    fireEvent.click(screen.getByLabelText("close"));

    expect(onCancel).toBeCalled();
  });

  test("render loading", () => {
    const onAdd = jest.fn();
    const onCancel = jest.fn();
    mockIsLoading = true;
    const { asFragment } = render(
      <ItemDialog id={1} onAdd={onAdd} onCancel={onCancel} />,
      {
        container: document.body,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
