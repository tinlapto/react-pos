import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
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
    render(<App />);
    const linkElement = screen.getByText(/Checkout/i);
    expect(linkElement).toBeInTheDocument();
  });
});
