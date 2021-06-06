import "./GenresPage.css";
import {Link} from "react-router-dom";
import { sendSong } from "../../store/playbar";
import { useDispatch } from "react-redux";

export default function Genre({songs}){

    const dispatch = useDispatch();

    async function playSong(song) {
        dispatch(sendSong(song));
    }

    return (
        <div className="genreSongs">
            {songs.map(song => (
                <div className="genreSongs__song">
                    <img src={song.coverPhoto} className="genreSongs__song--img" onClick={() => playSong(song)}/>
                    <div><Link to={`/users/${song.userId}/${song.id}`}>{song.title}</Link></div>
                    <div>{song.artist}</div>
                    <div>{`${song.album} - ${song.year}`}</div>
                    <div><i class="fas fa-headphones" style={{marginRight: 8}}></i>{song.numListens}</div>
                </div>
            ))}
        </div>
    );
}
