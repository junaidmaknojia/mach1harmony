import React, { useEffect } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import "./UserProfile.css";
import SongUploadFormModal from "../UploadSongFormModal";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk, deleteSong } from "../../store/song";
import EditSongFormModal from "../EditSongFormModal";

export default function UserProfile({sessionUser, isLoaded}) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadSongsThunk(sessionUser))
    }, [dispatch]);

    const foundSongs = useSelector((state) => Object.values(state.song));
    // console.log(foundSongs);

    async function handleDelete(e){
        const gotDeleted = await dispatch(deleteSong(e.target.value));
        if(gotDeleted){
            history.push(`/${sessionUser.id}`); // reload the page?
        }
    }

    return (
        <>
            <div className="coverBanner"></div>
            <div className="songsList">
                <h1>Songs You've Uploaded</h1>
                {isLoaded && foundSongs.map(song => {
                    if(song){
                        return (
                            <div>
                                <img src={song.coverPhoto} height="100" width="100"/>
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                                <button type="click" value={song.id} onClick={handleDelete}>Delete</button>
                                <EditSongFormModal songId={song.id}/>
                                <audio controls>
                                    <source src="../../../songs/Interstellar - Main Theme - Hans Zimmer.mp3" type="audio/mpeg" />
                                </audio>
                            </div>
                        );
                    }
                })}
            </div>
            {/* <Route path={`/${sessionUser.id}/new-song`}>Upload New Song
                <SongUploadFormModal/>
            </Route> */}
            {/* <Link to="">Playlists</Link>
            <Link to="">Albums</Link> */}
        </>
    );
}
