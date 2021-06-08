import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import SongUploadFormModal from "../UploadSongFormModal";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="navBar">
            <div className="navBar__section">
                <div id="siteLogo">
                    <NavLink exact to="/">
                        <img src="https://react-project.s3.us-east-2.amazonaws.com/new-logo.png" className="logo"/>
                    </NavLink>
                </div>
                <div><Link className="navLink" exact to="/genres">Browse</Link></div>
            </div>
            <div className="navBar__section">
                <div>Upgrade</div>
                <div><SongUploadFormModal/></div>
                <ProfileButton user={sessionUser}/>
            </div>
        </div>
    );
}
