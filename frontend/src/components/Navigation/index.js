import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SongUploadFormModal from "../UploadSongFormModal";
import EditProfileModal from "../EditProfileModal";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <li><ProfileButton user={sessionUser} /></li>
                <li><SongUploadFormModal/></li>
                <li><EditProfileModal/></li>
            </>
        )
    } else {
        sessionLinks = (
            <>
                <li><LoginFormModal/></li>
                <li><SignupFormModal/></li>
            </>
        );
    }

    return (
        <div className="navBar">
            <ul>
                <li className="siteLogo">Mach1Harmony</li>
                <li className="navButton" id="browse" >Browse</li>
                <li className="search">
                    <input type="text"/>
                </li>
                <li><NavLink className="navButton" id="home" exact to="/">Home</NavLink></li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}
