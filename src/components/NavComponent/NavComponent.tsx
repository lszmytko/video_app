import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

import { useGlobalContext } from "../../context/context";
import NavDropdown from "./SortingDropdown";

const NavComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    deleteAllVideos,
    isFavouriteShown,
    changeDemoData,
    showFavourites,
    toggleDisplay,
    videos,
  } = useGlobalContext();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Nav pills className="d-flex justify-content-center navigation">
        <NavItem>
          <NavLink href="#" active onClick={changeDemoData}>
            Demo
          </NavLink>
        </NavItem>
        <NavDropdown
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        <NavItem>
          <NavLink
            href="#"
            onClick={toggleDisplay}
            disabled={videos.length ? false : true}
          >
            Toggle display
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            onClick={deleteAllVideos}
            disabled={videos.length ? false : true}
          >
            Delete All
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            onClick={showFavourites}
            disabled={videos.length ? false : true}
          >
            {isFavouriteShown ? "Unfilter favourites" : "Filter favourites"}
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default NavComponent;
