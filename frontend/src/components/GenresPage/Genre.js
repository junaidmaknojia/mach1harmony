import "./GenresPage.css";
import {Link} from "react-router-dom";

export default function Genre({songs}){


    return (
        <div className="genreSongs">
            {songs.map(song => {
                return (
                    <div>
                        <img src={song.coverPhoto} style={{width: 40, height: 40}}/>
                        <Link to={`/users/${song.userId}/${song.id}`}>{song.title}</Link>
                        <span>{song.artist}</span>
                        <span>{song.album}</span>
                        <span>{song.numListens}</span>
                    </div>
                )
            })}
        </div>
    );
}
