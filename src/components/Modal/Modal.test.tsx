import React from "react";
import { render, screen, userEvent } from "@testing-library/react";

import { useGlobalContext, AppContextProvider } from "../../context/context";
import Modal from "./Modal";

jest.mock("../../context/context.tsx", () => {
  const originalModule = jest.requireActual("../../context/context.tsx");
  return {
    __esModule: true,
    ...originalModule,
    useGlobalContext: jest.fn(() => ({
      toggleModal: jest.fn(),
      modal: {
        isActive: true,
        modalUrl: "url",
      },
    })),
  };
});

console.log(useGlobalContext);

test("should close on closing button press", () => {
  render(<Modal />);
  const closingButton = screen.getByRole("button");

  userEvent.click(closingButton);

  const modal = screen.getByRole("modal");
  expect(modal).not.toBeInTheDocument();
});
