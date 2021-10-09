import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponentPres = ({videosToShow, setPage, page}) => {
    return (
        <Pagination size={"md"} d-flex="true" className="d-flex justify-content-center" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink previous onClick={()=>setPage((prevPage)=> prevPage - 1)} disabled={(page === 0) ? true : false}/>
      </PaginationItem>
      {videosToShow.map((video, index)=>{
        return (
          <PaginationItem onClick={()=>setPage(index)} key={index}>
            <PaginationLink>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )
      })}        
      <PaginationItem>
        <PaginationLink next onClick={()=>setPage((prevPage)=> prevPage + 1)} disabled={videosToShow.length === (page + 1) ? true : false}/>
      </PaginationItem>
    </Pagination>
    )
}

export default PaginationComponentPres
