import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";

describe("Card", () => {
  test("render", () => {
    const onClick = jest.fn();
    const { asFragment } = render(
      <Card title={"test card"} photo={"test_url"} onClick={onClick} />
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(screen.getByText("Choose"));
    expect(onClick).toBeCalled();
  });
});
