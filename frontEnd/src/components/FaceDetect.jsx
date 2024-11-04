import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'




const FaceDetect = () => {
    const [Emotion, setEmotion] = useState('');
    const [TrackId, setTrackId] = useState('');
    const [isPlaying, setisPlaying] = useState(false)
    const [iframeSrc, setIframeSrc] = useState('https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P');
    useEffect(() => {
        if (isPlaying) {
            setIframeSrc(`https://open.spotify.com/embed/track/${TrackId}`); // Replace with your track URI

        } else {
            setIframeSrc(''); // Clear iframe src to simulate stop
        }
    }, [isPlaying]);
    const makePost = ()=>{
        axios.post('http://127.0.0.1:5000/facedetect').then(Response=>{
            console.log(Response.data.preview_url)
            setTrackId((Response.data.preview_url).split('/').pop())
            setisPlaying(!isPlaying)
        }).catch(Error=>{
            console.log(Error)
        })
    }
  return (
    <>
        
        <button onClick={()=> makePost()}>faceDetect</button>
        {iframeSrc && (
                <iframe
                    style={{"width":"100%",position:'fixed',bottom:0,left:0}}
                    src={iframeSrc}
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    title="Spotify Player"
                ></iframe>
            )}
       
    </>
  )

}

export default FaceDetect