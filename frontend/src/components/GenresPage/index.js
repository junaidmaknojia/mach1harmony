import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { getGenres } from "../../store/genre";
import Genre from "./Genre";
import "./GenresPage.css";


export default function GenresPage() {
    const dispatch = useDispatch();
    const genres = [];
    const songs = [];
    const [genreSelected, setGenreSelected] = useState([]);

    function showSongs(e){
        console.log(e.target.value);
        // setGenreSelected(genreSongs);
    }

    useEffect(async ()=> {
        genres = await dispatch(getGenres())
    }, [dispatch])

    return (
        <>
            <div className="genreOptions">
                {genres && (
                    genres.map(genre => {
                        return (
                            <p
                            onClick={showSongs}
                            value={genre.id}
                            className="genreOptions__genre">{genre.name}</p>
                        )
                    })
                )}
            </div>

            {genreSelected && (
                <Genre songs={songs}/>
            )}
        </>
    )
}
