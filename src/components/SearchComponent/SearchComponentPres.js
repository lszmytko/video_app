import React from 'react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
  } from "reactstrap";

const SearchComponentPres = ({handleSubmit, inputValue, setInputValue, findVideoData, mistake}) => {
    return (
        <div>
            <form className="search d-flex justify-content-center" xs={{fontSize:'0.8rem'}} onSubmit={(e)=>handleSubmit(e)}>
            <InputGroup>                
                <Input placeholder="Add vimeo / youtube link" value={inputValue} onChange={(e)=>{
                    setInputValue(e.target.value)
                }}/>
                <InputGroupAddon addonType="append">
                <InputGroupText onClick={()=>findVideoData(inputValue)} role="button" disabled={inputValue.length ? false : true}>Add video</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            </form>
            <div className={mistake.happened ? 'wrongAddressDiv wrongAddressDiv_active' : 'wrongAddressDiv'}>{mistake.message ? mistake.message : 'Holder'}</div>
        </div>
    )
}

export default SearchComponentPres
