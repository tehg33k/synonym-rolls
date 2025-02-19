import { render } from "@testing-library/react";
import { describe } from "vitest";
import App from "../App";

describe("<App />", () => {
  test("should render the app", () => {
    render(<App />);
    expect(document.querySelector("h2")).toHaveTextContent(
      "Mmm, synonym rolls. Just like grammar used to make."
    );
  });
});
