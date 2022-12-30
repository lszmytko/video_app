import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { useGlobalContext } from "../../../context/context";

const SortingDropdown = ({
  dropdownOpen,
  toggleDropdown,
}: {
  dropdownOpen: boolean;
  toggleDropdown: () => void;
}) => {
  const { sortVideos, videos } = useGlobalContext();
  return (
    <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
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
  );
};

export default SortingDropdown;
