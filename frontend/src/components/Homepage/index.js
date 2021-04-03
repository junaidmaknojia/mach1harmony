import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import "./Homepage.css";
import { getFollowInfo } from "../../store/user";
import { Link } from "react-router-dom";

export default function Homepage({isLoaded}) {

    // which stuff to show as trending
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const peopleYoureFollowing = useSelector(state => state.user.following);
    console.log(peopleYoureFollowing);

    useEffect(()=> {
        dispatch(getFollowInfo(sessionUser?.id));
    }, [dispatch]);

    let following = (sessionUser) ? "following" : "";

    return (
        <div className="homepage">
            <div className={`banner ${following}`}></div>
            <div className={`trending ${following}`}></div>
            <div className={`newFeatures ${following}`}></div>
            <div className={`getStarted ${following}`}></div>
            {sessionUser && (
                <div className="followingDiv">
                    <p>People You're Following</p>
                    {peopleYoureFollowing && peopleYoureFollowing.map(user => {
                        <div>
                            <img src={user.coverPhoto}/>
                            <Link to={`/${user.id}`}>{user.username}</Link>
                        </div>
                        })
                    }
                </div>
            )}
        </div>
    );
}
