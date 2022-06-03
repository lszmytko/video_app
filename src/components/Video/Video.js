import React from "react";
import { Row, Col } from "reactstrap";
import { BiLike, BiDislike, BiPlayCircle } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import moment from "moment";

import { useGlobalContext } from "../../context/context";

const Video = (props) => {
  const { deleteVideo, toggleModal, addToFavourite, display } =
    useGlobalContext();
  const { id, url, date, img, type, favourite, snippet, name, statistics } = props;
  return (
    <Col
      xs={display.details.xs}
      md={display.details.xs}
      lg={display.details.lg}
      className="image-container"
    >
      <Row className="image-row">
        <Col xs="11" className="image-container-column">
          <Row>
            <img
              src={img}
              alt=""
              className="img-fluid img-thumbnail"
              onClick={() => toggleModal(url)}
            />
          </Row>
          <Row className="title-row">
            <Col className="title" mx="auto">
              {type === "youtube" ? snippet.title : name}
            </Col>
          </Row>
          <Row className="video-info">
            <Col xs="3">
              <BiLike size={"1.5rem"} />
            </Col>
            <Col xs="3">
              <BiDislike size={"1.5rem"} />
            </Col>
            <Col xs="3">
              <FaYoutube size={"1.5rem"} />
            </Col>
            <Col xs="3">
              <span>Added:</span>
            </Col>
          </Row>
          <Row className="video-info align-items-center justify-content-center">
            <Col xs="3" className="video-info-details">
              {type === "youtube"
                ? statistics.likeCount
                : "No data"}
            </Col>
            <Col xs="3" className="video-info-details">
              {type === "youtube"
                ? statistics.dislikeCount
                : "No data"}
            </Col>
            <Col xs="3" className="video-info-details">
              {type === "youtube"
                ? statistics.viewCount
                : "No data"}
            </Col>
            <Col xs="3" className="video-info-details">
              {moment(date).format("DD.MM.YYYY hh:mm:ss")}
            </Col>
          </Row>
        </Col>
        <Col xs="1" className="sidebar-options">
          <BsFillStarFill
            size={"2rem"}
            className="sidebar-option"
            role="button"
            onClick={() => addToFavourite(id)}
            style={favourite && { color: "#007bff" }}
            title={favourite ? "remove favourite" : "Add favourite"}
          />
          <BiPlayCircle
            size={"2rem"}
            className="sidebar-option"
            role="button"
            onClick={() => toggleModal(url)}
            title="Play video"
          />
          <AiFillDelete
            size={"2rem"}
            className="sidebar-option"
            role="button"
            onClick={() => deleteVideo(id)}
            title="Remove video"
          />
        </Col>
      </Row>
    </Col>
  );
};

export default Video;
