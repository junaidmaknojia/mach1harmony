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
                <li className="dropdown"><ProfileButton user={sessionUser} /></li>
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
        <ul>
            <li className="siteLogo"><NavLink id="home" style={{textDecoration: "none"}} exact to="/">Mach1Harmony</NavLink></li>
            <li id="browse" >Browse</li>
            <li className="search">
                <input style={{width: 300}} type="text"/>
            </li>
            {/* <li><NavLink id="home" style={{textDecoration: "none"}} exact to="/">Home</NavLink></li> */}
            {isLoaded && sessionLinks}
        </ul>
    );
}
