import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import NavComponentPres from "./NavComponentPres";

const NavComponent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    deleteAllVideos,
    isFavouriteShown,
    setIsFavouriteShown,
    sortVideos,
    useDemoData,
    showFavourites,
    toggleDisplay,
    videos,
  } = useGlobalContext();

  useEffect(() => {
    console.log("videos", typeof videos);
  }, []);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <NavComponentPres
      deleteAllVideos={deleteAllVideos}
      isFavouriteShown={isFavouriteShown}
      setIsFavouriteShown={setIsFavouriteShown}
      sortVideos={sortVideos}
      useDemoData={useDemoData}
      showFavourites={showFavourites}
      toggleDisplay={toggleDisplay}
      videos={videos}
      dropdownOpen={dropdownOpen}
      toggle={toggle}
    />
  );
};

export default NavComponent;
