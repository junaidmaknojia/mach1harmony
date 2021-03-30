import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import "./UserProfile.css";
import SongUploadFormModal from "../UploadSongFormModal";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";

export default function UserProfile({sessionUser}) {
    // console.log(sessionUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSongsThunk(sessionUser))
    }, [dispatch]);

    useSelector(state => console.log(state));
    // console.log(sessionUser);
    const songs = useSelector((state) => {
        return sessionUser.songs.map(songId => state.song[songId]);
    });


    return (
        <>
            <div className="coverBanner"></div>
            <div className="songsList">
                <h2>Songs You've Uploaded</h2>

            </div>
            {/* <Route path={`/${sessionUser.id}/new-song`}>Upload New Song
                <SongUploadFormModal/>
            </Route> */}
            {/* <Link to="">Playlists</Link>
            <Link to="">Albums</Link> */}
        </>
    );
}
