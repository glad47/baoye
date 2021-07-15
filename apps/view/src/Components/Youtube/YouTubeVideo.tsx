import React, {useState} from 'react'
import Draggable from 'react-draggable';


const YouTubeVideo = (props: any) => {
    return (
        <div className="youTubeDraggable">
            <Draggable
                handle=".handle"
                grid={[25, 25]}
                scale={1}>
                <div className="handle">
                    <img src={require('../../images/quate_close.png')} alt="" className="close" onClick={props.closeVideo}/>
                    <video src='../../styles/pcb-video.mp4' muted autoPlay={true} loop width="100%" height="100%"></video>
                </div>
            </Draggable>
        </div>
    )
}

export default YouTubeVideo;