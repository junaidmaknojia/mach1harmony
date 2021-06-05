import React, { useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import "../UserPage/UserPage.css";
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
        // eslint-disable-next-line
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
            <div className="coverPhotoDiv">
                <img className="coverPhoto" src="https://images.unsplash.com/photo-1612255109949-a87fab1a43e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"/>
                <img className="profilePhoto" alt={sessionUser.profilePic} src={sessionUser.profilePic}/>
                <h1 className="username">{`@${sessionUser.username}`}</h1>
            </div>
            <div className="userPage__content">
                <div className="songsList">
                    <h1>Songs You've Uploaded</h1>
                    {isLoaded && foundSongs.map(song => {
                        if(song){
                            return (
                                <div className="songDiv">
                                    <img src={song.coverPhoto} alt={song.title} value={song.filePath} className="songDiv__coverPhoto" onClick={() => playSong(song)}/>
                                    <div className="songDiv__info">
                                        <div className="appSubmitButton play" onClick={() => playSong(song)}><i class="fas fa-play"></i></div>
                                        <div>
                                            <Link to={`/users/${song.userId}/${song.id}`} className="title">{song.title}</Link>
                                            <p className="album">{song.album ? song.album : ""}</p>
                                            <p className="year">{song.year ? song.year : ""}</p>
                                            <div><i class="fas fa-headphones" style={{marginRight: 5}}></i>{song.numListens}</div>
                                            <img src="https://react-project.s3.us-east-2.amazonaws.com/wave.JPG" className="waves"/>
                                        </div>
                                        <button type="click" className="appSubmitButton delete" value={song.id} onClick={handleDelete}>Delete</button>
                                        <EditSongFormModal songId={song.id}/>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="userInfo">
                    <div className="userInfo__stats">
                        <div>
                            <p>Followers</p>
                            <p>53,003</p>
                        </div>
                        <div>
                            <p>Following</p>
                            <p>34</p>
                        </div>
                        <div>
                            <p>Songs</p>
                            <p>23</p>
                        </div>
                    </div>
                    <p className="bio">{sessionUser.bio}</p>
                    <p className="email">{sessionUser.email}</p>
                </div>
            </div>
        </div>
    );
}
