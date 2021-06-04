import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import "../UserProfile/UserProfile.css";
import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { getFollowInfo, getUserInfo, updateFollow } from "../../store/user";
import { sendSong } from "../../store/playbar";
import UserProfile from "../UserProfile";

export default function UserPage({isLoaded}) {
    const dispatch = useDispatch();
    const {userId} = useParams();


    const foundSongs = useSelector((state) => Object.values(state.song));
    const sessionUser = useSelector(state => state.session.user);
    const followers = useSelector(state => state.user.followers);
    const [following, setFollowing] = useState(false); // figure this out
    const [user, setUser] = useState({}); // figure this out

    useEffect(() => {
        dispatch(loadSongsThunk(userId));
    }, [dispatch]);

    useEffect(async() => {
        const fuser = await dispatch(getUserInfo(userId));
        setUser(fuser);
    }, [dispatch]);

    useEffect(async ()=> {
        await dispatch(getFollowInfo(userId));
        setFollowing(followers?.some(follower => follower.id === sessionUser?.id)); // figure this out
    }, [dispatch]);

    async function playSong(song) {
        await dispatch(sendSong(song));
    }

    async function handleFollow(){
        const isFollowing = await dispatch(updateFollow(userId, sessionUser.id));
        setFollowing(isFollowing);
        await dispatch(getFollowInfo(userId));
    }

    if(sessionUser?.id === Number(userId)){
        return <UserProfile sessionUser={sessionUser} isLoaded={isLoaded}/>
    }

    return (
        <div className="userPage">
            {user && (
                <div className="coverPhotoDiv">
                    <img className="coverPhoto" alt={user.username} src="https://images.unsplash.com/photo-1612255109949-a87fab1a43e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"/>
                    <img className="profilePhoto" src={user.profilePic}/>
                    <h1 className="username">{`@${user.username}`}</h1>
                </div>
            )}
            {sessionUser && (
                <button onClick={handleFollow} className="appSubmitButton">{
                    following ? "Unfollow" : "Follow"
                }</button>
            )}
            <h2 className="email">{user.email}</h2>
            <p className="bio">{user.bio}</p>
            {/* <p>{`${user.username} has ${followers.length} followers!`}</p> */}
            <div className="songsList">
                {user && (<h1>{`${user.username}'s Songs`}</h1>)}

                {foundSongs && foundSongs.map(song => {
                    if(song){
                        return (
                            <div className="songDiv">
                                <img src={song.coverPhoto} alt={song.title} height="100" width="100" value={song.filePath} className="appPlaySong" onClick={()=>playSong(song)}/>
                                <Link to={`/users/${song.userId}/${song.id}`} className="title">
                                    {song.title}
                                </Link>
                                <p className="artist">{song.artist}</p>
                                <p className="album">{song.album ? song.album : ""}</p>
                                <p className="year">{song.year ? song.year : ""}</p>
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
