import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementListen } from "../../store/playbar";
import {Link} from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./Playbar.css";

export default function Playbar(){

    const audioRef = useRef()
    const dispatch = useDispatch();
    const addedSong = useSelector(state => state.playBar.currSong);

    // const [playing, setPlaying] = useState(false);

    useEffect(async () => {
        if(addedSong){
            await dispatch(incrementListen(addedSong?.id));
        }
    }, [addedSong]);

    // Helper function if not using react-h5 library for player

    // function handlePlay(){
    //     if(playing){
    //         audioRef.current.pause();
    //         setPlaying(false)
    //     }else{
    //         audioRef.current.play();
    //         setPlaying(true);
    //     }
    // }

    return (
        <div className="barContainer">
            {addedSong && (
                <>
                    <AudioPlayer src={addedSong.filePath} ref={audioRef} autoplay="true" style={{marginRight: 100}} className="audioControls"/>
                    <div className="barContainer__songInfo">
                        <img alt={addedSong.title} src={addedSong.coverPhoto}/>
                        <div>
                            <div><Link to={`/users/${addedSong.userId}/${addedSong.id}`}>{addedSong.title}</Link></div>
                            <div>{addedSong.album}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
