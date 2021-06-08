import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import "../UserProfile/UserProfile.css";
import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { getFollowInfo, getUserInfo, updateFollow } from "../../store/user";
import { sendSong } from "../../store/playbar";
import UserProfile from "../UserProfile";
import Footer from "../Footer";

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
                    <img className="coverPhoto" src="https://images.unsplash.com/photo-1612255109949-a87fab1a43e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"/>
                    <img className="profilePhoto" alt={user.username} src={user.profilePic}/>
                    <h1 className="username">{`@${user.username}`}</h1>
                </div>
            )}
            <div className="userPage__content">
                <div className="songsList">
                    {user && (<h1>{`${user.username}'s Songs`}</h1>)}
                    {foundSongs && foundSongs.map(song => {
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
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="userInfo">
                    {sessionUser && (
                        <button onClick={handleFollow} className="appSubmitButton">
                            <i class="fas fa-user-plus" style={{marginRight: 5}}></i>
                            {following ? "Unfollow" : "Follow"}
                        </button>
                    )}
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
                    <p className="bio">{user.bio}</p>
                    <p className="email">{user.email}</p>
                    {/* <p>{`${user.username} has ${followers.length} followers!`}</p> */}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
