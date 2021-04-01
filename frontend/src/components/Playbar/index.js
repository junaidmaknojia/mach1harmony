import { useSelector } from "react-redux";
import "./Playbar.css";

export default function Playbar(){

const currSong = useSelector(state => state.song.currSong);

    return (
        <div className="barContainer">
            {currSong && (
               <>
                    <audio controls>
                        <source src={currSong.filePath} type="audio/mpeg" autoplay/>
                    </audio>
               </>
            )}
        </div>
    );
}
