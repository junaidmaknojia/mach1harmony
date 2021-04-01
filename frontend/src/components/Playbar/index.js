import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Playbar.css";

export default function Playbar(){


    const addedSong = useSelector(state => state.song.currSong);
    const [newSong, setNewSong] = useState((addedSong || {}));


    return (
        <div className="barContainer">
            {addedSong && (
               <>
                    <audio controls autoPlay={true}>
                        <source src={addedSong.filePath} type="audio/mpeg" />
                    </audio>
               </>
            )}
        </div>
    );
}
