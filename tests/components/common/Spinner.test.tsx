import React from "react";
import { render, screen } from "@testing-library/react";

import Spinner from "../../../src/components/common/Spinner";

describe("Spinner", () => {
  it("should render an image", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByAltText("Loading...");
    expect(spinnerElement).toBeInTheDocument();
  });
});
