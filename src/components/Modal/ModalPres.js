import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";

const ModalPres = ({modal, toggleModal}) => {
  return (
    <div>
      <Modal isOpen={modal.isActive} toggle={toggleModal} centered={true}>
        <Button color="danger" onClick={toggleModal}>
          Close
        </Button>{" "}
        <div className="player-wrapper">
          <ReactPlayer
            url={modal.url}
            className="react-player"
            playing
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalPres;
