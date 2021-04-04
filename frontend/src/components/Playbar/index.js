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

    // <ReactSlider
    // 			value={thermometer}
    // 			onAfterChange={(val) => {
    // 				setThermometer(val);
    // 			}}
    // 			className="thermometer-slider"
    // 			thumbClassName="thermometer-thumb"
    // 			trackClassName="thermometer-track"
    // 			ariaLabel={"Thermometer"}
    // 			orientation="vertical"
    // 			min={0}
    // 			max={120}
    // 			renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    // 			renderTrack={(props, state) => <div {...props} index={state.index}></div>}
    // 			invert
    // 			pearling
    // 			minDistance={1}
    // 		/>

    return (
        <div className="barContainer">
            {addedSong && (
                <>
                    <span><img style={{width: 40}} src={addedSong.coverPhoto}/></span>
                    <span style={{fontSize: 20, fontWeight: "bold"}}>{addedSong.title}</span>
                    <span>{addedSong.album}</span>
                    <span style={{width: 40, border: "black"}}>
                        {audioRef.current && (
                            playing ? <img className="playPause" src="https://www.freeiconspng.com/thumbs/pause-button-png/pause-button-png-32.png" onClick={handlePlay}></img> : <img className="playPause" src="https://www.freeiconspng.com/uploads/play-button-icon-png-0.png" onClick={handlePlay}></img>
                            )}

                        <audio src={addedSong.filePath} ref={audioRef} className="audioControls"></audio>
                    </span>
                </>
            )}
        </div>
    );
}
