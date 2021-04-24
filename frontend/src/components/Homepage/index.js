import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./Homepage.css";
import { getFollowInfo, loadHomeSongs, loadHomeUsers } from "../../store/user";
import { Link } from "react-router-dom";
import { sendSong } from "../../store/playbar";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Homepage({isLoaded}) {

    // which stuff to show as trending
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const peopleYoureFollowing = useSelector(state => state.user.following);

    const [loadSongs, setLoadSongs] = useState([]);
    const [loadUsers, setLoadUsers] = useState([]);


    useEffect(()=> {
        if(sessionUser){
            dispatch(getFollowInfo(sessionUser.id));
        }
    }, [dispatch]);

    useEffect(async ()=> {
        const response = await dispatch(loadHomeSongs());
        setLoadSongs(response);
    }, [dispatch]);

    useEffect(async ()=> {
        const response = await dispatch(loadHomeUsers());
        setLoadUsers(response);
    }, [dispatch]);

    async function playSong(song) {
        await dispatch(sendSong(song));
        // add to numListens
    }

    // useEffect(() => {}, [dispatch, peopleYoureFollowing]);

    let following = (sessionUser && peopleYoureFollowing) ? "following" : "";

    return (
        <div className="homepage">
            <div className={`banner ${following}`}>
                <Carousel>
                    <Carousel.Item>
                        <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/sunset-people.jpg" className="sliderimg d-block w-100"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/piano-night-club.jpg" className="sliderimg d-block w-100"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/shelf-headphones.jpg" className="sliderimg d-block w-100"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/night-dj.jpg" className="sliderimg d-block w-100"/>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className={`trending ${following}`}>
                <h2>Trending</h2>
                <div>
                    {loadSongs && (
                        loadSongs.map(song => {
                            return (
                                <div className="homeSong" key={song.id}>
                                    <img src={song.coverPhoto} alt={song.title} style={{width: 120}} onClick={()=>playSong(song)}/>
                                    <div>
                                        <Link style={{textDecoration: "none", color: "black"}} to={`/users/${song.userId}/${song.id}`}>{song.title}</Link>
                                    </div>
                                    <div>{song.album}</div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
            <div className={`explore ${following}`}>
                <h2>Explore</h2>
                <div>
                    {loadUsers && (
                        loadUsers.map(user => {
                            return (
                                <div className="homeUser" key={user.id}>
                                    <img src={user.profilePic} alt={user.username} style={{width: 150, borderRadius: 75}}/>
                                    <div>
                                        <Link style={{textDecoration: "none", color: "black"}} to={`/users/${user.id}`}>{user.username}</Link>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
            <div className={`getStarted ${following}`}></div>
            {sessionUser && (
                <div className="followingDiv">
                    <h3 style={{marginLeft: 25, marginRight: 25, textAlign: "center"}}>People You're Following</h3>
                    {peopleYoureFollowing && peopleYoureFollowing.map(user => {
                        return (
                            <div className="eachFollowing" key={user.id}>
                                <img src={user.profilePic} alt={user.username} style={{width: 80}} className="userPic"/>
                                <div>
                                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                                </div>
                            </div>
                        )})
                    }
                </div>
            )}
        </div>
    );
}
