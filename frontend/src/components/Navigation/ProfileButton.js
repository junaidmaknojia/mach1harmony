import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import {Route, NavLink} from "react-router-dom";
import "./Navigation.css";


export default function ProfileButton({ user }) {
    // console.log(user);

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
            <button onClick={openMenu}>
                <i className="fas fa-compact-disc"></i>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li>
                            <NavLink to={`/${user.id}`}>{user.username}</NavLink>
                            {/* <Route path={`/${user.id}`}/> */}
                        </li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                )}
            </button>
        </>
    );
}
