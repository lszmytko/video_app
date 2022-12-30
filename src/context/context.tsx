import React, { useContext, useState, useEffect, ReactNode } from "react";
import moment from "moment";
import { demoData } from "../demoData/demoData";
import { videosPerPage, tilesDisplay, listDisplay } from "./static";
import { ContextInterface, VideoInterface } from "./types";

export const AppContext = React.createContext<ContextInterface | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<VideoInterface[]>(
    localStorage.getItem("videos")
      ? JSON.parse(localStorage.getItem("videos")!)
      : []
  );
  const [modal, setModal] = useState({
    isActive: false,
    modalUrl: "",
  });
  const [favourites, setFavourites] = useState<VideoInterface[]>([]);
  const [isFavouriteShown, setIsFavouriteShown] = useState(false);
  const [paginatedVideos, setPaginatedVideos] = useState<VideoInterface[][]>(
    []
  );
  const [paginatedFavourites, setPaginatedFavourites] = useState<
    VideoInterface[]
  >([]);
  const [page, setPage] = useState(0);
  const [display, setDisplay] = useState<
    typeof tilesDisplay | typeof listDisplay
  >(tilesDisplay);
  const [loading, setLoading] = useState(false);

  const toggleDisplay = () =>
    setDisplay((prevDisplay) =>
      prevDisplay.type === "list" ? tilesDisplay : listDisplay
    );

  const deleteVideo = (id: number) => {
    setVideos((oldVideos) => oldVideos.filter((video) => video.id !== id));
  };

  const deleteAllVideos = () => {
    setVideos([]);
    setFavourites([]);
    setPaginatedVideos([]);
  };

  const changeDemoData = () => {
    setVideos(demoData);
  };

  const toggleModal = (url = "") => {
    modal.isActive
      ? setModal({
          isActive: false,
          modalUrl: "",
        })
      : setModal({
          isActive: true,
          modalUrl: url,
        });
  };

  const addToFavourite = (id: number) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, favourite: !video.favourite } : video
      )
    );
  };

  const sortVideos = (date: "newest" | "oldest") => {
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
    const tempArray: Array<VideoInterface[]> = [];
    const pagesCount = Math.ceil(videos.length / videosPerPage);

    for (let i = 0; i < pagesCount; i++) {
      tempArray.push([
        ...videos.slice(i * videosPerPage, i * videosPerPage + videosPerPage),
      ]);
    }
    setPaginatedVideos(tempArray);
  };

  const showFavourites = () => {
    setLoading(true);
    setPage(0);
    setIsFavouriteShown((prevState) => !prevState);
    if (!favourites.length) {
      setLoading(false);
      return [];
    }
    const MainArray: VideoInterface[] = [];
    let subArray: VideoInterface[] = [];
    for (let i = 0; i < favourites.length; i++) {
      if ((i + 1) % videosPerPage === 1) {
        subArray = [];
      }
      subArray.push(favourites[i]);
      if ((i + 1) % videosPerPage === 0 || i + 1 === favourites.length) {
        MainArray.push(...subArray);
      }
    }

    setPaginatedFavourites([...MainArray]);
    setLoading(false);
  };

  useEffect(() => {
    setFavourites(videos.filter((video) => video.favourite === true));
    paginateData();
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  const contextValue: ContextInterface = {
    videos,
    setVideos,
    deleteVideo,
    modal,
    setModal,
    toggleModal,
    addToFavourite,
    deleteAllVideos,
    favourite: favourites,
    isFavouriteShown,
    setIsFavouriteShown,
    sortVideos,
    changeDemoData,
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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext) as ContextInterface;
};

export { AppContextProvider, useGlobalContext };
