import React, { SetStateAction } from "react";

export interface VideoInterface {
  id: number;
  date?: Date;
  favourite?: boolean;
  img?: string;
  snippet?: { title: string };
  name?: string;
  statistics?: {
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  url?: string | undefined;
  type?: string;
}

export interface ContextInterface {
  videos: Array<VideoInterface>;
  setVideos: React.Dispatch<SetStateAction<VideoInterface[]>>;
  modal: {
    isActive: boolean;
    modalUrl: string;
  };
  toggleModal: (url?: string) => void;
  addToFavourite: (id: number) => void;
  deleteAllVideos: () => void;
  deleteVideo: (id: number) => void;
  favourite: VideoInterface[];
  isFavouriteShown: boolean;
  setIsFavouriteShown: React.Dispatch<React.SetStateAction<boolean>>;
  sortVideos: (date: "newest" | "oldest") => void;
  changeDemoData: () => void;
  paginatedVideos: Array<VideoInterface[]>;
  setPaginatedVideos: React.Dispatch<React.SetStateAction<VideoInterface[][]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  showFavourites: () => never[] | undefined;
  setModal: React.Dispatch<
    React.SetStateAction<{
      isActive: boolean;
      modalUrl: string;
    }>
  >;
  paginatedFavourites: VideoInterface[];
  display: {
    type: string;
    details: {
      xs: number;
      lg?: number;
    };
    displayClass: string;
  };
  toggleDisplay: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// id, url, date, img, type, favourite, snippet, name, statistics;
