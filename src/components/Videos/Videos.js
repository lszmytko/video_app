import React from "react";
import { useGlobalContext } from "../../context/context";

import VideosPres from "./VideosPres";

const Videos = () => {
  const { favourite, isFavouriteShown, page, paginatedVideos, loading } =
    useGlobalContext();
  return (
    <VideosPres
      favourite={favourite}
      isFavouriteShown={isFavouriteShown}
      page={page}
      paginatedVideos={paginatedVideos}
      loading={loading}
    />
  );
};

export default Videos;
