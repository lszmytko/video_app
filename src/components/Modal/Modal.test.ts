import { render, screen, userEvent } from "@testing-library/react";
import React from "react";
import { useGlobalContext, AppContextProvider } from "../../context/context";
import Modal from "./Modal";

jest.mock("../../context/context.js", () => {
	return {
		useGlobalContext: jest.fn(),
	};
});

const mockedUseGlobalContext = jest.mock(useGlobalContext);

mockedUseGlobalContext.mockReturnValue(
	{
		isActive: true,
		url: "http://www.onet.pl"
	}
);

test("should close on closing button press", ()=>{
	render(<Modal />);
	const closingButton = screen.getByRole("button");

	userEvent.click(closingButton);

	const modal = screen.getByRole("modal");
	expect(modal).not.toBeInTheDocument();
    
});