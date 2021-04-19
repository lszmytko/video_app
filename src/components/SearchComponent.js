import React, {useEffect, useState} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import {useGlobalContext} from '../context/context';
import moment from 'moment'

export const SearchComponent = ()=>{
    const [inputValue, setInputValue] = useState('')
    const {videos, setVideos, loading, setLoading} = useGlobalContext()
    const [mistake, setMistake]= useState({
        'happened': false,
        'message' : null
    })
   

    const youTubeGetID = (url)=>{
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : undefined;
    }

    const vimeoGetID = (url)=>{
        let regEx = /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        let match = url.match(regEx);
        if (match && match.length == 7) {
            let videoId = match[6];
            return videoId
        }
        else {
            return null
        }
    }
    
    const findVideoData = async (url)=>{
        const youtubeID = youTubeGetID(url)
        const vimeoID = vimeoGetID(url)
        const youtubeEndpoint = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${youtubeID}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`

        const vimeoEndPoint =`https://api.vimeo.com/videos/${vimeoID}?access_token=${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`

        const finalID =  youtubeID ? youtubeID : vimeoID
        const finalEndPoint = youtubeID ? youtubeEndpoint : vimeoEndPoint

        try {
            setLoading(true)
            setMistake({
                'happened': false,
                'message' : null 
            })
            const response = await fetch(finalEndPoint)
            let data = await response.json()
            if(youtubeID){
                data = data.items[0]
            }            
            setInputValue('')
            data.img = youtubeID ? data.snippet.thumbnails.medium['url'] : data.pictures.sizes[4].link
            data.favourite = false
            data.date = moment()
            data.url = url
            data.type = youtubeID ? 'youtube' : 'vimeo'
            data.id = finalID
            setVideos((oldState)=>{
                if(!oldState.length) return [data]
                if(!oldState.filter((video)=> video.id === data.id).length){
                    return [...oldState, data] 
                }
                setMistake({
                    'happened':true,
                    'message':'Video already added'
                })
                return oldState                
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            setMistake({
                'happened':true,
                'message':'Wrong address'
            })
        }    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        findVideoData(inputValue)
    }
    
    return(
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



