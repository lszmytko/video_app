import { render, screen, userEvent } from "@testing-library/react";
import React from "react";
import { AppContext, AppContextProvider } from "../../context/context";
import Modal from './Modal';

const setup = () => {
    const contextValue = { modal: {
        isActive: true,
        toggleModal: jest.fn(),
    }}
    render(
        <AppContext.Provider value={contextValue}></AppContext.Provider>
    )
}

test("should close on closing button press", ()=>{
    setup();
    const closingButton = screen.getByText("Close");
    console.log(closingButton);
    userEvent.click(closingButton);
    const modal = screen.getAllByRole("modal")
    expect(modal).toBeInTheDocument();
})