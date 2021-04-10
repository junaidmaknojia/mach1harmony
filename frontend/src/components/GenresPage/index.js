import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { getGenres, showSongs } from "../../store/genre";
import Genre from "./Genre";
import "./GenresPage.css";


export default function GenresPage() {
    const dispatch = useDispatch();
    const [genreSelected, setGenreSelected] = useState([]);
    const [genres, setGenres] = useState([]);
    const [songs, setSongs] = useState([]);

    async function handleSongs(e){
        const genreClicked = e.target.getAttribute("value");
        const result = await dispatch(showSongs(genreClicked));
        setGenreSelected(genreClicked);
        setSongs(result);
    }

    useEffect(async ()=> {
        const result = await dispatch(getGenres());
        setGenres(result);
    }, [dispatch])

    return (
        <>
            <div className="genreOptions">
                {genres && (
                    genres.map(genre => {
                        return (
                            <p
                            onClick={handleSongs}
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
