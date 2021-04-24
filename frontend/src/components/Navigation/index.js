import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SongUploadFormModal from "../UploadSongFormModal";
import EditProfileModal from "../EditProfileModal";
import { searchThunk } from "../../store/search";
import Search from "../Search";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchType, setSearchType] = useState("");

    async function handleSearch(e){
        await dispatch(searchThunk(searchType));
        history.push("/search");
    }

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
            <li id="browse" ><NavLink id="home" style={{textDecoration: "none"}} exact to="/genres">Browse</NavLink></li>
            <li className="search">
                <form onSubmit={handleSearch}>
                    <input style={{width: 300}} type="text" value={searchType} onChange={e => setSearchType(e.target.value)}/>
                    <input type="submit"/>
                </form>
            </li>
            {/* <li><NavLink id="home" style={{textDecoration: "none"}} exact to="/">Home</NavLink></li> */}
            {isLoaded && sessionLinks}
        </ul>
    );
}
