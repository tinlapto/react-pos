import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
} from "@testing-library/react";
import InputNumber from "../InputNumber";

const getByClass = queryByAttribute.bind(null, "class");

describe("InputNumber", () => {
  test("render", () => {
    const onChange = jest.fn();
    const { asFragment } = render(
      <InputNumber value={1} onChange={onChange} />
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(screen.getByLabelText("plus"));
    expect(onChange).toBeCalledWith(2);
    fireEvent.click(screen.getByLabelText("minus"));
    expect(onChange).toBeCalledWith(0);
  });

  test("render max", () => {
    const onChange = jest.fn();
    render(<InputNumber value={1} onChange={onChange} max={1} />);
    fireEvent.click(screen.getByLabelText("plus"));
    expect(onChange).not.toBeCalled();
  });

  test("render min", () => {
    const onChange = jest.fn();
    render(<InputNumber value={1} onChange={onChange} min={1} />);
    fireEvent.click(screen.getByLabelText("minus"));
    expect(onChange).not.toBeCalled();
  });

  test("input number", () => {
    const onChange = jest.fn();
    const { container } = render(
      <InputNumber value={1} onChange={onChange} min={1} />
    );
    fireEvent.change(getByClass(container, "ant-input") as Element, {
      target: { value: 10 },
    });
    expect(onChange).toBeCalledWith(10);
  });

  test("input text", () => {
    const onChange = jest.fn();
    const { container } = render(
      <InputNumber value={1} onChange={onChange} min={1} />
    );
    fireEvent.change(getByClass(container, "ant-input") as Element, {
      target: { value: "abc" },
    });
    expect(onChange).not.toBeCalled();
  });
});
