import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateSong, loadSongsThunk} from "../../store/song";


export default function EditSongForm({songId}) {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(loadSongsThunk(sessionUser))
    }, [dispatch]);
    const foundSongs = useSelector((state) => Object.values(state.song));
    const selectSong = foundSongs.find((song) => song.id === songId);


    const [title, setTitle] = useState(selectSong.title);
    const [artist, setArtist] = useState(selectSong.artist);
    const [album, setAlbum] = useState(selectSong.album);
    const [year, setYear] = useState(selectSong.year);
    const [songUpload, setSongUpload] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
       const errorsList = [];
       if(!title) errorsList.push("Song must have a title");
       if(title.length > 0 && title.length < 3) errorsList.push("Song title must be at least 3 characters");
       if(!artist) errorsList.push("Song must have an artist");
       if(artist.length > 0 && artist.length < 3) errorsList.push("Song artist must be at least 3 characters");
       setErrors(errorsList);
    }, [title, artist, album, year]);

    async function onSubmit(e) {
        e.preventDefault();
        const payload = {
            title, artist, album, year, songUpload, imageUpload
        };

        let songUploadGood = await dispatch(updateSong(payload, songId));
        if(songUploadGood) {
            // history.push(`/songs/${songUploadGood.id}`);
            console.log("edit done");
        }
    }

    return (
        <>
            <div>
                {errors && errors.map(error => {
                    return <p key={error} style={{color:"red", lineHeight: 0, margin: "20px"}}>{error}</p>
                })}
            </div>
            <form onSubmit={onSubmit} enctype='multipart/form-data'>
                <div>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Artist"
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Album"
                        value={album}
                        onChange={e=>setAlbum(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        placeholder="Year"
                        value={year}
                        onChange={e=>setYear(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <p>Song Upload</p>
                    <input type="file" name='audioUpload' onChange={e => setSongUpload(e.target.files[0])}/>
                </div>
                <div>
                    <p>Cover Photo Upload</p>
                    <input type="file" name='coverPhotoUpload' onChange={e => setImageUpload(e.target.files[0])}/>
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </>
    );
}
