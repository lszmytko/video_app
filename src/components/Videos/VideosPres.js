import React from "react";
import { Video, VideoModal } from "../components";
import { Container, Row, Col } from "reactstrap";

const VideosPres = ({
  favourite,
  isFavouriteShown,
  page,
  paginatedVideos,
  loading,
}) => {
  if (loading) return <div className="loader"></div>;
  return (
    <Container className="video-container">
      <Row xs="justify-content-center" className="video-row">
        {isFavouriteShown
          ? favourite.map((item, index) => {
              return <Video {...item} key={index} />;
            })
          : paginatedVideos[page].map((item, index) => {
              return <Video {...item} key={index} />;
            })}
      </Row>
      <VideoModal />
    </Container>
  );
};

export default VideosPres;
