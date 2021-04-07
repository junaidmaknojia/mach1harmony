import { useState } from "react";
import "./GenresPage.css";

export default function GenresPage() {
    const [genreSelected, setGenreSelected] = useState([]);

    function showSongs(e){
        // console.log(e.target.value);
        // grab the songs
        setGenreSelected(genreSongs);
    }

    return (
        <>
            <div className="genreOptions">
                {/* {genres && (
                    genres.map(genre => {
                        return (
                            <p
                            onClick={showSongs}
                            value={genre.id}
                            className="genreOptions__genre">{genre.name}</p>
                        )
                    })
                )} */}
            </div>
            <div className="genreSongs">
                {/* {genreSelected && (
                    genreSelected.map(song => {
                        return (
                            <div>
                                <img src={song.coverPhoto}/>
                                <span>{song.title}</span>
                                <span>{song.artist}</span>
                                <span>{song.album}</span>
                                <span>{song.numListens}</span>
                            </div>
                        )
                    })
                )} */}
            </div>
        </>
    )
}
