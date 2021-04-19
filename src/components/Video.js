import React from 'react';
import { useGlobalContext } from '../context/context';
import { Container, Row, Col } from 'reactstrap';
import {BiLike, BiDislike, BiStar, BiPlayCircle} from 'react-icons/bi';
import {AiFillDelete, AiFillPropertySafety } from 'react-icons/ai';
import {FaYoutube} from 'react-icons/fa';
import moment from 'moment'

const Video = (props)=>{
    const {deleteVideo, toggleModal, addToFavourite, display} = useGlobalContext()
    const {id, url, date, img, type} = props
    console.log(props)
    return (
        <Col xs={display.details.xs} md={display.details.xs} lg={display.details.lg} className="image-container">
            <Row  className="image-row">
                <Col xs="11" className="image-container-column">
                <Row>
                    <img src={img} alt="" className="img-fluid img-thumbnail" onClick={()=>toggleModal(url)}/>
                </Row>
                <Row className="title-row">
                    <Col className="title" mx="auto">{type === "youtube" ? props.snippet.title : props.name}</Col>
                </Row>
                <Row className="video-info">
                   <Col xs="3"><BiLike size={'1.5rem'}/></Col>
                   <Col xs="3"><BiDislike size={'1.5rem'}/></Col>
                   <Col xs="3"><FaYoutube size={'1.5rem'}/></Col>
                   <Col xs="3"><span>Added:</span></Col>
                </Row>
                <Row className="video-info align-items-center justify-content-stretch">
                    <Col xs="3">{type === "youtube" ? props.statistics.likeCount : 'No data'}</Col>
                    <Col xs="3">{type ===  "youtube" ? props.statistics.dislikeCount : 'No data'}</Col>
                    <Col xs="3">{type === "youtube" ? props.statistics.viewCount : 'No data'}</Col>
                    <Col xs="3">{moment(date).format('DD.MM.YYYY h:mm:ss a')}</Col>
                </Row>
            </Col>
            <Col xs="1" className="sidebar-options">
                <BiStar size={'2rem'} className="sidebar-option" role="button" onClick={()=>addToFavourite(id)}/>
                <BiPlayCircle size={'2rem'} className="sidebar-option" role="button" onClick={()=>toggleModal(url)}/>
                <AiFillDelete size={'2rem'} className="sidebar-option" role="button" onClick={()=>deleteVideo(id)}/>
            </Col>
            </Row>
                          
            
        </Col>
    )
}

export default Video