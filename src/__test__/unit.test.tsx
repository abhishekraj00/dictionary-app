import { render, screen, fireEvent } from "@testing-library/react";
import { dictionaryWordApi } from "../services/api/wordApi";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

describe("App component sanpshot test", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("App component featcher test", () => {
  test("renders light theme by default", () => {
    render(<App />);
    const container = screen.getByTestId("container");
    expect(container).toHaveStyle("background: #fff");
    expect(container).toHaveStyle("color: #333");
  });

  test("switches to dark theme when dark icon is clicked", () => {
    render(<App />);
    const darkIcon = screen.getByTestId("dark-icon");
    fireEvent.click(darkIcon);
    const container = screen.getByTestId("container");
    expect(container).toHaveStyle("background: #333");
    expect(container).toHaveStyle("color: #fff");
  });

  test("should return word data when a valid word is provided", async () => {
    const response = await fetch(`${dictionaryWordApi}hello`);
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("word");
    expect(data[0]).toHaveProperty("meanings");
  });
  test("renders error message when API response fails", async () => {
    const response = await fetch(`${dictionaryWordApi}asdas`);
    await response.json();

    expect(response.ok).toBe(false);
  });

  test("opens and closes the modal when clicking the Show More button", () => {
    render(<App />);
    const showModalButton = screen.getByText("Show More");

    fireEvent.click(showModalButton);
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("modal-close"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("displays an error message when the word is not found", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("oops! Word Not Found 😥"))
    );

    render(<App />);
    const searchInput = screen.getByPlaceholderText("Search a word...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("oops! Word Not Found 😥");
  });
});
