import React, { useEffect } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import "./UserProfile.css";
import SongUploadFormModal from "../UploadSongFormModal";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk, deleteSong, sendSong } from "../../store/song";
import EditSongFormModal from "../EditSongFormModal";
import SongPage from "../SongPage";

export default function UserProfile({sessionUser, isLoaded}) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadSongsThunk(sessionUser.id))
    }, [dispatch]);

    const foundSongs = useSelector((state) => Object.values(state.song));
    // console.log(foundSongs);

    async function handleDelete(e){
        const gotDeleted = await dispatch(deleteSong(e.target.value));
        if(gotDeleted){
            history.push(`/${sessionUser.id}`); // reload the page?
        }
    }

    async function playSong(song) {
        console.log(song);
        await dispatch(sendSong(song));
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
                                <img src={song.coverPhoto} height="100" width="100" value={song.filePath} onClick={()=>playSong(song)}/>
                                <Link to={`/${song.userId}/${song.id}`}>
                                    {song.title}
                                </Link>
                                <p>{song.artist}</p>
                                <button type="click" value={song.id} onClick={handleDelete}>Delete</button>
                                <EditSongFormModal songId={song.id}/>
                                <audio controls>
                                    <source src={song.filePath} type="audio/mpeg" />
                                </audio>
                            </div>
                        );
                    }
                })}
            </div>

            {/* <Route path={`/${sessionUser.id}/new-song`}>Upload New Song
                <SongUploadFormModal/>
            </Route> */}
        </>
    );
}
