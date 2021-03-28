import { useSelector } from "react-redux";
import React from "react";
import "./Homepage.css";

export default function Homepage({isLoaded}) {

    //have a div for the following section ready
    // ternery operator for className that determines if you're loggedin
    // which stuff to show as trending

    const sessionUser = useSelector(state => state.session.user);

    let following = (sessionUser) ? "following" : "";

    return (
        <div className="homepage">
            <div className={`banner ${following}`}></div>
            <div className={`trending ${following}`}></div>
            <div className={`newFeatures ${following}`}></div>
            <div className={`getStarted ${following}`}></div>
            {sessionUser && (
                <div className="followingDiv"></div>
            )}
        </div>
    );
}
