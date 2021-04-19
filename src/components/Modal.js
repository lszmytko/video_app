import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import YouTube from 'react-youtube';
import { useGlobalContext } from '../context/context';
import ReactPlayer from 'react-player'

const VideoModal = (props) => {
  const {
    buttonLabel,
    className,
  } = props;

  const {
    modal,
    toggleModal
  } = useGlobalContext()

  return (
    <div>
      <Modal isOpen={modal.isActive} toggle={toggleModal} centered={true}>
        <Button color="danger" onClick={toggleModal}>Close</Button>{' '}
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
}

export default VideoModal;