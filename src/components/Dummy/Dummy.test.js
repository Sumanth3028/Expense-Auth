import { render, screen } from "@testing-library/react";
import Dummy from "./Dummy";

describe("Dummy Component", () => {
  test("renders expense form",  () => {
    render(<Dummy />);
    const list =  screen.getByText("Expense Form");
    expect(list).toBeInTheDocument()
  });
});