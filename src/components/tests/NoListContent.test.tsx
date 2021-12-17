import { render, screen } from "@testing-library/react";
import NoListContent from "../NoListContent";
import { pages } from "../../utils/config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

describe("NoListContent renders the correct message, and a redirect button", () => {
  const message = "Content you are looking for is not found.";
  const link = pages.popular;
  const btnText = "See popular movies";

  // RENDERING NO LIST CONTENT COMPONENT.
  render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NoListContent
              message={message}
              link={link}
              linkBtnText={btnText}
            />
          }
        />
      </Routes>
    </Router>
  );

  it("renders redirect button", () => {
    const btnElement = screen.getByText(btnText);
    expect(btnElement).toBeInTheDocument();
  });
});
