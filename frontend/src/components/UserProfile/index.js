import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import "./UserProfile.css";
import SongUploadFormModal from "../UploadSongFormModal";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";

export default function UserProfile({sessionUser, isLoaded}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSongsThunk(sessionUser))
    }, [dispatch]);

    // useSelector(state => console.log(state));
    const foundSongs = useSelector((state) => Object.values(state.song));

    console.log(foundSongs);

    return (
        <>
            <div className="coverBanner"></div>
            <div className="songsList">
                <h2>Songs You've Uploaded</h2>
                {isLoaded && foundSongs.map(song => {
                    if(song){
                        return (
                            <>
                                <p>{song.title}</p>
                                <p>{song.artist}</p>
                                <audio
                                    controls
                                    src={song.filePath}>
                                </audio>
                            </>
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
