import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (<ProfileButton user={sessionUser} />);
    } else {
        sessionLinks = (
            <>
                <NavLink className="navButton" id="login" to="/login">Log In</NavLink>
                <NavLink className="navButton" id="signup" to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className="navBar">
            <p className="siteLogo">Mach1Harmony</p>
            <p className="navButton" id="browse" >Browse</p>
            <input type="text" className="search">
            </input>
            <NavLink className="navButton" id="home" exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </div>
    );
}
