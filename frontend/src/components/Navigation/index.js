import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import SongUploadFormModal from "../UploadSongFormModal";
import EditProfileModal from "../EditProfileModal";
import { searchThunk } from "../../store/search";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <li className="dropdown"><ProfileButton user={sessionUser} /></li>
                <li><SongUploadFormModal/></li>
                <li><EditProfileModal/></li>
            </>
        )
    }

    return (
        <div className="navBar">
            <div className="siteLogo">
                <NavLink style={{textDecoration: "none"}} exact to="/">
                    <img src="https://react-project.s3.us-east-2.amazonaws.com/new-logo.png" className="logo"/>
                </NavLink>
            </div>
            <div id="browse" ><NavLink id="home" style={{textDecoration: "none"}} exact to="/genres">Browse</NavLink></div>
            {/* <li><NavLink id="home" style={{textDecoration: "none"}} exact to="/">Home</NavLink></li> */}
            {isLoaded && sessionLinks}
        </div>
    );
}
