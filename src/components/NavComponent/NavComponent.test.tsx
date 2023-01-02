import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavComponent from "./NavComponent";

const mockedToggleDisplay = jest.fn();

jest.mock("../../context/context", () => ({
  useGlobalContext: () => ({
    deleteAllVideos: jest.fn(),
    isFavouriteShown: true,
    changeDemoData: jest.fn(),
    showFavourites: jest.fn(),
    toggleDisplay: mockedToggleDisplay,
    videos: ["some video"],
  }),
}));

const setup = () => {
  render(<NavComponent />);
};

describe("<NavComponent />", () => {
  test("should change display when clicked on toggle display", () => {
    setup();
    screen.debug();
    const toggleButton = screen.getByRole("link", { name: /toggle display/i });
    fireEvent.click(toggleButton);
    expect(mockedToggleDisplay).toBeCalledTimes(1);
  });

  test("should display link with 'unfilter favourites' text if isFavouriteShown is true", () => {
    setup();
    const filterLink = screen.getByRole("link", {
      name: /unfilter favourites/i,
    });
    expect(filterLink).toBeInTheDocument();
  });
});
