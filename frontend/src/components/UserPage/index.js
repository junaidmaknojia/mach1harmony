import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk, deleteSong, sendSong } from "../../store/song";
import EditSongFormModal from "../EditSongFormModal";
import { updateFollow } from "../../store/user";

export default function UserPage({isLoaded, sessionUser}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();

    const [following, setFollowing] = useState(false); // double check this

    useEffect(() => {
        dispatch(loadSongsThunk(userId))
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(loadComments(foundSong.id));
    // }, [dispatch, following]);

    const foundSongs = useSelector((state) => Object.values(state.song));

    async function handleDelete(e){
        const gotDeleted = await dispatch(deleteSong(e.target.value));
        if(gotDeleted){
            history.push(`/${userId}`); // reload the page?
        }
    }

    async function playSong(song) {
        await dispatch(sendSong(song));
        // add to numListens
    }

    async function handleFollow(){
        const isFollowing = await dispatch(updateFollow(userId, sessionUser.id));
        setFollowing(isFollowing);
    }

    return (
        <>
            <div className="coverBanner"></div>
            <button onClick={handleFollow}>{
                following ? "Unfollow" : "Follow"
            }</button>
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
        </>
    );
}
