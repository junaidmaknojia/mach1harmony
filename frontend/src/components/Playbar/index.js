import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Playbar.css";

export default function Playbar(){

    const audioRef = useRef()

    const addedSong = useSelector(state => state.song.currSong);

    useEffect(() => {
        if(audioRef.current){
            audioRef.current.pause();
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [addedSong]);

    return (
        <div className="barContainer">
            {addedSong && (
               <>
                    <audio controls ref={audioRef}>
                        <source src={addedSong.filePath} type="audio/mpeg" />
                    </audio>
               </>
            )}
        </div>
    );
}
