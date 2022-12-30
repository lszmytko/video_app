import React from "react";
import { Button, Modal } from "reactstrap";
import ReactPlayer from "react-player";

import { useGlobalContext } from "../../context/context";

function VideoModal() {
  const { modal, toggleModal } = useGlobalContext();

  return (
    <div>
      <Modal
        isOpen={modal.isActive}
        toggle={() => toggleModal()}
        centered={true}
        role="modal"
      >
        <Button color="danger" onClick={() => toggleModal()}>
          Close
        </Button>{" "}
        <div className="player-wrapper">
          <ReactPlayer
            url={modal.modalUrl}
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
}

export default VideoModal;
