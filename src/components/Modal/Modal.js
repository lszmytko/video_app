import React, { useState } from "react";
import { useGlobalContext } from "../../context/context";
import ModalPres from "./ModalPres";

const VideoModal = ({ buttonLabel, className }) => {
  const { modal, toggleModal } = useGlobalContext();

  return <ModalPres modal={modal} toggleModal={toggleModal} />;
};

export default VideoModal;
