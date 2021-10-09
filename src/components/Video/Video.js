import React from "react";
import { useGlobalContext } from "../../context/context";
import VideoPres from "./VideoPres";

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const Video = (props) => {
  const { deleteVideo, toggleModal, addToFavourite, display } =
    useGlobalContext();
  const { id, url, date, img, type, favourite, snippet, name, statistics } = props;
  return (
    <VideoPres
      deleteVideo={deleteVideo}
      toggleModal={toggleModal}
      addToFavourite={addToFavourite}
      display={display}
      id={id}
      url={url}
      date={date}
      img={img}
      type={type}
      favourite={favourite}
      snippet={snippet}
      name={name}
      formatNumber={formatNumber}
      statistics={statistics}
    />
  );
};

export default Video;
