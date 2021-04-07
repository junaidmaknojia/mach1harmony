import { useState } from "react";
import Genre from "./Genre";
import "./GenresPage.css";

export default function GenresPage() {
    const [genreSelected, setGenreSelected] = useState([]);

    function showSongs(e){
        // console.log(e.target.value);
        // grab the songs
        // setGenreSelected(genreSongs);
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

            {/* {genreSelected && (
                <Genre songs={songs}/>
            )} */}
        </>
    )
}
