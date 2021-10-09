import React from 'react';
import {useGlobalContext} from '../../context/context';
import PaginationComponentPres from './PaginationComponentPres';



const PaginationComponent = () => {
  const {paginatedVideos, setPage, page, paginatedFavourites, isFavouriteShown} = useGlobalContext()

  const videosToShow = function(){
    if(isFavouriteShown){
      return paginatedFavourites
    } else return paginatedVideos
  }()

  if(videosToShow.length < 2) return null

  return (
    <PaginationComponentPres videosToShow={videosToShow} setPage={setPage} page={page}/>
  );
}

export default PaginationComponent;