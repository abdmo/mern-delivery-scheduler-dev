import { render, screen } from "@testing-library/react";
import { Hook } from "mocha";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Delivery Scheduler/i);
  expect(linkElement).toBeInTheDocument();
});
