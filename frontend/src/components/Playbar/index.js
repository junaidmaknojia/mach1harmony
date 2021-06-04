import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementListen } from "../../store/playbar";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./Playbar.css";

export default function Playbar(){

    const audioRef = useRef()
    const dispatch = useDispatch();
    const addedSong = useSelector(state => state.playBar.currSong);

    const [playing, setPlaying] = useState(false);

    useEffect(async () => {
        // if(audioRef.current){
        //     audioRef.current.pause();
        //     setPlaying(false);
        //     audioRef.current.load();
        //     audioRef.current.play();
        //     await dispatch(incrementListen(addedSong.id));
        //     setPlaying(true);
        // }
    }, [addedSong]);

    function handlePlay(){
        if(playing){
            audioRef.current.pause();
            setPlaying(false)
        }else{
            audioRef.current.play();
            setPlaying(true);
        }
    }

    return (
        <div className="barContainer">
            {addedSong && (
                <>
                    <AudioPlayer src={addedSong.filePath} ref={audioRef} style={{marginRight: 100}} className="audioControls"/>
                    <div><img style={{height: 40}} alt={addedSong.title} src={addedSong.coverPhoto}/></div>
                    <div className="barContainer__songInfo">
                        <div>{addedSong.title}</div>
                        <div>{addedSong.album}</div>
                    </div>
                </>
            )}
        </div>
    );
}
