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
                <NavLink className="navButton" to="/login">Log In</NavLink>
                <NavLink className="navButton" to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className="navBar">
            <NavLink className="navButton" exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </div>
    );
}
