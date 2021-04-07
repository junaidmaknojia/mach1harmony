import React, { useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import "./UserProfile.css";
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
    // sessionUser = useSelector(state => state.session.user);

    async function handleDelete(e){
        if(window.confirm("Are you sure you want to delete your song?")){
            const gotDeleted = await dispatch(deleteSong(e.target.value));
            if(gotDeleted){
                history.push(`/${sessionUser.id}`); // reload the page?
            }
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
                <img className="coverPhoto" alt="" src="https://images.unsplash.com/photo-1612255109949-a87fab1a43e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"/>
                <img className="profilePhoto" alt={sessionUser.profilePic} src={sessionUser.profilePic} style={{width: 200, borderRadius: 100}}/>
                <h1 className="username">{`@${sessionUser.username}`}</h1>
                <h2 className="email">{sessionUser.email}</h2>
                <p className="bio">{sessionUser.bio}</p>
            </div>
            <div className="songsList">
                <h1>Songs You've Uploaded</h1>
                {isLoaded && foundSongs.map(song => {
                    if(song){
                        return (
                            <div className="songDiv">
                                <img src={song.coverPhoto} alt={song.title} height="100" width="100" value={song.filePath} onClick={()=>playSong(song)}/>
                                <Link to={`/${song.userId}/${song.id}`} className="title">
                                    {song.title}
                                </Link>
                                <p className="artist">{song.artist}</p>
                                <p className="album">{song.album ? song.album : ""}</p>
                                <p className="year">{song.year ? song.year : ""}</p>
                                <button type="click" className="appSubmitButton delete" value={song.id} onClick={handleDelete}>Delete</button>
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
