import React, { useState } from "react";
import moment from "moment";

import { useGlobalContext } from "../../context/context";
import { youTubeGetID, vimeoGetID } from "../../utils";

interface Mistake {
  happened: boolean;
  message: string | null;
}

export const useAddVideo = () => {
  const [inputValue, setInputValue] = useState("");
  const { setVideos, setLoading, videos } = useGlobalContext();
  const [mistake, setMistake] = useState<Mistake>({
    happened: false,
    message: null,
  });

  const findVideoData = async (url: string) => {
    const youtubeID = youTubeGetID(url);
    const vimeoID = vimeoGetID(url);
    const youtubeEndpoint = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${youtubeID}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;

    const vimeoEndPoint = `https://api.vimeo.com/videos/${vimeoID}?access_token=${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`;

    const finalID = youtubeID ? youtubeID : vimeoID;
    const finalEndPoint = youtubeID ? youtubeEndpoint : vimeoEndPoint;

    try {
      setLoading(true);
      console.log("przeszlo");
      setMistake({
        happened: false,
        message: null,
      });
      setInputValue("");
      const response = await fetch(finalEndPoint);
      let data = await response.json();
      if (youtubeID) {
        data = data.items[0];
      }
      data.img = youtubeID
        ? data.snippet.thumbnails.medium["url"]
        : data.pictures.sizes[4].link;
      data.favourite = false;
      data.date = moment();
      data.url = url;
      data.type = youtubeID ? "youtube" : "vimeo";
      data.id = finalID;
      console.log(data);
      if (videos.findIndex((video) => video.id === data.id) >= 0) {
        setMistake({
          happened: true,
          message: "Video already added",
        });
      } else {
        setVideos((prevVideos) => [...prevVideos, data]);
      }
      setLoading(false);
    } catch (error) {
      setMistake({
        happened: true,
        message: "Wrong address",
      });
      setLoading(false);
    }
    console.log(videos);
  };

  return {
    mistake,
    inputValue,
    setInputValue,
    findVideoData,
  };
};
