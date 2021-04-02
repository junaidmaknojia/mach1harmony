import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import {NavLink, useHistory, useParams} from "react-router-dom";
import "./Navigation.css";
import EditProfileModal from "../EditProfileModal";


export default function ProfileButton({ user }) {
    // console.log(user);

    const sessionUser = useSelector(state => state.session.user);

    const {userId} = useParams();
    const history = useHistory();
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
        console.log(userId); // userId is undefined
        // const check = userId === sessionUser.id;
        dispatch(sessionActions.logout());
        // if(check) history.push("/");
    };



    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-compact-disc"></i>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li>
                            <NavLink to={`/${user.id}`}>{user.username}</NavLink>
                        </li>
                        {/* <li>
                            <EditProfileModal/>
                        </li> */}
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
