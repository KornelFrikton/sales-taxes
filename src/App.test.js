import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Input 1", () => {
  render(<App />);
  const buttonAdd = screen.getByDisplayValue(/Add product to the shoppinglist/i);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 book at 12.49' },
  });
  fireEvent.click(buttonAdd);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 music CD at 14.99' },
  });
  fireEvent.click(buttonAdd);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 chocolate bar at 0.85' },
  });
  fireEvent.click(buttonAdd);

  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 book: 12.49/);
  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 music CD: 16.49/);
  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 chocolate bar: 0.85/);

  expect(screen.getByTestId('total-sales')).toHaveTextContent(/1.50/);
  expect(screen.getByTestId('total-amount')).toHaveTextContent(/29.83/);
});

test("Input 2", () => {
  render(<App />);
  const buttonAdd = screen.getByDisplayValue(/Add product to the shoppinglist/i);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 imported box of chocolates at 10.00' },
  });
  fireEvent.click(buttonAdd);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 imported bottle of perfume at 47.50' },
  });
  fireEvent.click(buttonAdd);

  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 imported box of chocolates: 10.50/);
  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 imported bottle of perfume: 54.65/);

  expect(screen.getByTestId('total-sales')).toHaveTextContent(/7.65/);
  expect(screen.getByTestId('total-amount')).toHaveTextContent(/65.15/);
});

test("Input 3", () => {
  render(<App />);
  const buttonAdd = screen.getByDisplayValue(/Add product to the shoppinglist/i);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 imported bottle of perfume at 27.99' },
  });
  fireEvent.click(buttonAdd);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 bottle of perfume at 18.99' },
  });
  fireEvent.click(buttonAdd);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 packet of headache pills at 9.75' },
  });
  fireEvent.click(buttonAdd);

  fireEvent.input(screen.getByTestId('product-input'), {
    target: { value: '1 box of imported chocolates at 11.25' },
  });
  fireEvent.click(buttonAdd);

  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 imported bottle of perfume: 32.19/);
  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 bottle of perfume: 20.89/);
  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 packet of headache pills: 9.75/);
  expect(screen.getByTestId('shopping-list')).toHaveTextContent(/1 imported box of chocolates: 11.85/);

  expect(screen.getByTestId('total-sales')).toHaveTextContent(/6.70/);
  expect(screen.getByTestId('total-amount')).toHaveTextContent(/74.68/);
});