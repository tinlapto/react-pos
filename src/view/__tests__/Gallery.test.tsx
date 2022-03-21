import { render, screen, fireEvent } from "@testing-library/react";
import Gallery from "../Gallery";
import { Item } from "../../type";

const pizzas: Item[] = [
  { id: 1, title: "test name", price: 10, photo: "test photo" },
];

jest.mock("../../api", () => ({
  useGetItems: () => ({
    data: pizzas,
  }),
}));

describe("Gallery", () => {
  test("render", () => {
    const onClick = jest.fn();
    const { asFragment } = render(<Gallery onClick={onClick} />);
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(screen.getByText("Choose"));
    expect(onClick).toBeCalled();
  });
});
