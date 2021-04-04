import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Playbar.css";

export default function Playbar(){

    const audioRef = useRef()

    const addedSong = useSelector(state => state.playBar.currSong);

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if(audioRef.current){
            audioRef.current.pause();
            setPlaying(false);
            audioRef.current.load();
            audioRef.current.play();
            setPlaying(true);
        }
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
                <div >
                    {audioRef.current && (
                        playing ? <img className="playPause" src="https://www.freeiconspng.com/thumbs/pause-button-png/pause-button-png-32.png" onClick={handlePlay}></img> : <img className="playPause" src="https://www.freeiconspng.com/uploads/pause-button-png-31.png" onClick={handlePlay}></img>
                    )}
                    <audio src={addedSong.filePath} ref={audioRef} className="audioControls"></audio>
                </div>
            )}
        </div>
    );
}
