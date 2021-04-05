import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createSong} from "../../store/song";
import "./UploadSongPage.css";


export default function SongUploadForm({setShowModal}) {

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

        let createdSong = await dispatch(createSong(payload));
        if(createdSong) {
            setShowModal(false);
            history.push(`/${sessionUser.id}/${createdSong.id}`);
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
                        className="lineText"
                        placeholder="Title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        className="lineText"
                        placeholder="Artist"
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        className="lineText"
                        placeholder="Album"
                        value={album}
                        onChange={e=>setAlbum(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <input
                        className="lineText"
                        placeholder="Year"
                        value={year}
                        onChange={e=>setYear(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <p>Upload Song (.mp3)</p>

                    <input type="file" name='audioUpload' onChange={e => setSongUpload(e.target.files[0])}/>
                </div>
                <div>
                    <p>Upload Album Cover (.jpg)</p>
                    <input type="file" name='coverPhotoUpload' onChange={e => setImageUpload(e.target.files[0])}/>
                </div>
                <div>
                    <button type="submit" className="appSubmitButton">Submit</button>
                </div>
            </form>
        </>
    );
}
