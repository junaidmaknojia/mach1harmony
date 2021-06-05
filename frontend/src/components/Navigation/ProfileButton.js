import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from '../../store/session';
import {NavLink, useParams} from "react-router-dom";
import "./Navigation.css";
import EditProfileModal from "../EditProfileModal";


export default function ProfileButton({ user }) {

    const {userId} = useParams();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    function openMenu() {
        if (!showMenu) setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };



    return (
        <>
            <div onClick={openMenu}><img className="profileButton__pic" src={user.profilePic}></img>{user.username}</div>
            {showMenu && (
                <div className="menu">
                    <NavLink to={`/${user.id}`}>Profile</NavLink>
                    <EditProfileModal/>
                    <p onClick={logout}>
                        <i class="fas fa-sign-out-alt"></i>
                        Log Out
                    </p>
                </div>
            )}
        </>
    );
}
