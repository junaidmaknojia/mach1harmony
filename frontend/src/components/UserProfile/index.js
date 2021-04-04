import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./UserProfile.css";
import SongUploadFormModal from "../UploadSongFormModal";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk, deleteSong} from "../../store/song";
import EditSongFormModal from "../EditSongFormModal";
import { sendSong } from "../../store/playbar";
// import { updateFollow } from "../../store/user";

export default function UserProfile({sessionUser, isLoaded}) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadSongsThunk(sessionUser.id))
    }, [dispatch]);

    const foundSongs = useSelector((state) => Object.values(state.song));

    async function handleDelete(e){
        const gotDeleted = await dispatch(deleteSong(e.target.value));
        if(gotDeleted){
            history.push(`/${sessionUser.id}`); // reload the page?
        }
    }

    async function playSong(song) {
        await dispatch(sendSong(song));
        // add to numListens
    }

    return (
        <div className="userPage">
            {/* <div className="coverBanner"></div> */}
            <div className="coverPhotoDiv">
                <img className="coverPhoto" src="https://images.unsplash.com/photo-1612255109949-a87fab1a43e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"/>
            </div>
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
                            </div>
                        );
                    }
                })}
            </div>

            {/* <Route path={`/${sessionUser.id}/new-song`}>Upload New Song
                <SongUploadFormModal/>
            </Route> */}
        </div>
    );
}
