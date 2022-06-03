import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { demoData } from "../demoData/demoData";
import { videosPerPage, tilesDisplay, listDisplay  } from "./static";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [videos, setVideos] = useState(
    localStorage.getItem("videos")
      ? JSON.parse(localStorage.getItem("videos"))
      : []
  );
  const [modal, setModal] = useState({
    isActive: false,
    urlModal: "",
  });
  const [favourite, setFavourite] = useState([]);
  const [isFavouriteShown, setIsFavouriteShown] = useState(false);
  const [paginatedVideos, setPaginatedVideos] = useState([]);
  const [paginatedFavourites, setPaginatedFavourites] = useState([]);
  const [page, setPage] = useState(0);
  const [display, setDisplay] = useState(tilesDisplay);
  const [loading, setLoading] = useState(false);

  const toggleDisplay = () => setDisplay(prevDisplay => (prevDisplay.type === "list") ? tilesDisplay : listDisplay);

  const deleteVideo = (id) => {
    setVideos(oldVideos => oldVideos.filter(video => video.id !== id));
  };

  const deleteAllVideos = () => {
    setVideos([]);
    setFavourite([]);
    setPaginatedVideos([]);
  };

  const useDemoData = () => {
    setVideos(demoData);
  };

  const toggleModal = (url = "") => {
    if (modal.isActive) {
      setModal({
        isActive: false,
        url: "",
      });
    } else {
      setModal({
        isActive: true,
        url,
      });
    }
  };

  const addToFavourite = (id) => {
    setVideos(prevVideos => prevVideos.map(video => (video.id === id) ? { ...video, favourite: !video.favourite } : video));
  }

  const sortVideos = (date) => {
    setLoading(true);
    if (date === "newest") {
      const newVideos = videos.sort((a, b) => {
        if (moment(b.date).isBefore(moment(a.date))) {
          return -1;
        } else if (moment(b.date).isAfter(moment(a.date))) {
          return 1;
        } else return 0;
      });
      setVideos([...newVideos]);
    } else if (date === "oldest") {
      const newVideos = videos.sort((a, b) => {
        if (moment(b.date).isBefore(moment(a.date))) {
          return 1;
        } else if (moment(b.date).isAfter(moment(a.date))) {
          return -1;
        } else return 0;
      });
      setVideos([...newVideos]);
    }
    setLoading(false);
  };

  // PAGINATING DATA

  const paginateData = () => {
    if (!videos.length) return [];
    let MainArray = [];
    let subArray = [];
    for (let i = 0; i < videos.length; i++) {
      if ((i + 1) % videosPerPage === 1) {
        subArray = [];
      }
      subArray.push(videos[i]);
      if ((i + 1) % videosPerPage === 0 || i + 1 === videos.length) {
        MainArray.push(subArray);
      }
    }
    setPaginatedVideos([...MainArray]);
  };

  const showFavourites = () => {
    setLoading(true);
    setPage(0);
    setIsFavouriteShown(prevState => !prevState);
    if (!favourite.length) {
      setLoading(false);
      return [];
    }
    let MainArray = [];
    let subArray = [];
    for (let i = 0; i < favourite.length; i++) {
      if ((i + 1) % videosPerPage === 1) {
        subArray = [];
      }
      subArray.push(favourite[i]);
      if ((i + 1) % videosPerPage === 0 || i + 1 === favourite.length) {
        MainArray.push(subArray);
      }
    }

    setPaginatedFavourites([...MainArray]);
    setLoading(false);
  };

  useEffect(() => {
    setFavourite(videos.filter(video => video.favourite === true));
    paginateData(6);
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  return (
    <AppContext.Provider
      value={{
        videos,
        setVideos,
        deleteVideo,
        modal,
        setModal,
        toggleModal,
        addToFavourite,
        deleteAllVideos,
        favourite,
        isFavouriteShown,
        setIsFavouriteShown,
        sortVideos,
        useDemoData,
        paginatedVideos,
        setPaginatedVideos,
        page,
        setPage,
        showFavourites,
        paginatedFavourites,
        display,
        toggleDisplay,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useGlobalContext };
