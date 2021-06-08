import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { getGenres, showSongs } from "../../store/genre";
import Footer from "../Footer";
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

    useEffect(() => {
        const getAllSongs = async () => {
            const songs = await fetch("/api/genres/songs");
            const songsData = await songs.json();
            setSongs(songsData)
        }
        getAllSongs();
    }, []);

    return (
        <div className="genrePage">
            <div className="genreOptions">
                {genres?.map(genre => (
                    <div onClick={handleSongs} value={genre.id} className="genreOptions__genre">{genre.name}</div>
                    ))}
            </div>
            <Genre songs={songs}/>
            <Footer/>
        </div>
    )
}
