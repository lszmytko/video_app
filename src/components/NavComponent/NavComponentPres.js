import React from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";

const NavComponentPres = ({
  deleteAllVideos,
  isFavouriteShown,
  sortVideos,
  useDemoData,
  showFavourites,
  toggleDisplay,
  videos,
  dropdownOpen,
  toggle,
}) => {
  return (
    <div>
      <Nav pills className="d-flex justify-content-center navigation">
        <NavItem>
          <NavLink href="#" active onClick={useDemoData}>
            Demo
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret disabled={videos.length ? false : true}>
            Sort
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => sortVideos("newest")}>
              Sort newest
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => sortVideos("oldest")}>
              Sort oldest
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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

export default NavComponentPres;
