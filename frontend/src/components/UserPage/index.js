import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        dispatch(loadSongsThunk(userId))
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
        // add to numListens
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
                    <img className="coverPhoto" src="https://images.unsplash.com/photo-1612255109949-a87fab1a43e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"/>
                    <img className="profilePhoto" src={user.profilePic} style={{width: 200, borderRadius: 100}}/>
                    <h1 className="username">{`@${user.username}`}</h1>
                    <h2 className="email">{user.email}</h2>
                    <p className="bio">{user.bio}</p>
                </div>
            )}
            {/* <p>{`${user.username} has ${followers.length} followers!`}</p> */}
            {sessionUser && (
                <button onClick={handleFollow}>{
                    following ? "Unfollow" : "Follow"
                }</button>
            )}
            <div className="songsList">
                <h1>User's Songs</h1>
                {foundSongs && foundSongs.map(song => {
                    if(song){
                        return (
                            <div>
                                <img src={song.coverPhoto} height="100" width="100" value={song.filePath} onClick={()=>playSong(song)}/>
                                <Link to={`/${song.userId}/${song.id}`}>
                                    {song.title}
                                </Link>
                                <p>{song.artist}</p>
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
