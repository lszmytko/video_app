import React from "react";
import { useGlobalContext } from "../../context/context";
import { Video, VideoModal } from "../components";
import { Container, Row } from "reactstrap";

const Videos = () => {
	const { favourite, isFavouriteShown, page, paginatedVideos, loading } =
    useGlobalContext();

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

export default Videos;
