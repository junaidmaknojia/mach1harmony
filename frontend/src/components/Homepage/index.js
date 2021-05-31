import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./Homepage.css";
import { getFollowInfo, loadHomeSongs, loadHomeUsers } from "../../store/user";
import { Link } from "react-router-dom";
import { sendSong } from "../../store/playbar";
import Carousel from 'react-bootstrap/Carousel';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
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
            <Carousel className="carousel">
                <Carousel.Item>
                    <div className="carousel__main carouselText">
                        <h2>Discover more with this SoundCloud clone</h2>
                        <p>Mach1Harmony allows you to get the same experience of SoundCloud, but on a whole other site. Listen solely on your desktop and connect with the limited people that know about the application!</p>
                        <SignupFormModal text="Get Started"/>
                    </div>
                    <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/sunset-people.jpg" className="sliderimg d-block w-100"/>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel__second carouselText">
                        <h2>Upload your hits</h2>
                        <p>With over 20 users (yeah... that's right), your tracks will gain all kinds of traction with Mach1Harmony. Start uploading your tracks for mid-size virality!</p>
                        <SignupFormModal text="Upload Now"/>
                    </div>
                    <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/piano-night-club.jpg" className="sliderimg d-block w-100"/>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel__third carouselText">
                        <h2>{"Ad partner goes \<here\>"}</h2>
                        <p>That somone in the crowd will grant this application's big break and will be featured here as an ad partner. Conditions will follow</p>
                    </div>
                    <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/night-dj.jpg" className="sliderimg d-block w-100"/>
                </Carousel.Item>
            </Carousel>
            <div className="trending">
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
            <div className="explore">
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
            {/* <div className="lastInfo">
                <h2>Last Ad</h2>
                <p>This is the last ad talking about how you should join Mach1Harmony. Click the button below to get started!</p>
                <SignupFormModal text="Sign Up"/>
                <img src="https://react-project.s3.us-east-2.amazonaws.com/stock/shelf-headphones.jpg"/>
            </div> */}
            <div className="getStarted"></div>
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
