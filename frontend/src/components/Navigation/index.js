import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SongUploadFormModal from "../UploadSongFormModal";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <SongUploadFormModal/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal/>
                <SignupFormModal/>
            </>
        );
    }

    return (
        <div className="navBar">
            <p className="siteLogo">Mach1Harmony</p>
            <p className="navButton" id="browse" >Browse</p>
            <div className="search">
                <input type="text"/>
            </div>
            <NavLink className="navButton" id="home" exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </div>
    );
}
