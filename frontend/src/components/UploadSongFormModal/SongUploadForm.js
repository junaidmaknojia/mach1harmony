import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createSong} from "../../store/song";


export default function SongUploadForm() {

    const sessionUser = useSelector(state => state.session.user);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [year, setYear] = useState("2021");
    const [songUpload, setSongUpload] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

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
            title, artist, album, year, songUpload, imageUpload, userId: sessionUser.id
        };

        let songCreateGood = await dispatch(createSong(payload));
        if(songCreateGood) {
            history.push(`/${sessionUser.id}/${songCreateGood.id}`);
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
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}
