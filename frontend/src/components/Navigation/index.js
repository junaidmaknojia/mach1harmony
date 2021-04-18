import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SongUploadFormModal from "../UploadSongFormModal";
import EditProfileModal from "../EditProfileModal";
import { searchThunk } from "../../store/search";
import { set } from "js-cookie";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchType, setSearchType] = useState("");

    function handleSearch(e){
        console.log(e.target);
        console.log(searchType);
        // dispatch(searchThunk(e.target.value));
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
                    <input style={{width: 300}} type="search" value={searchType} onChange={e => setSearchType(e.target.value)}/>
                    {/* <input type="submit"/> */}
                </form>
            </li>
            {/* <li><NavLink id="home" style={{textDecoration: "none"}} exact to="/">Home</NavLink></li> */}
            {isLoaded && sessionLinks}
        </ul>
    );
}
