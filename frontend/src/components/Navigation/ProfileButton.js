import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from '../../store/session';
import {NavLink, useParams} from "react-router-dom";
import "./Navigation.css";


export default function ProfileButton({ user }) {
    // console.log(user);

    // const sessionUser = useSelector(state => state.session.user);

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
        console.log(userId); // userId is undefined
        // const check = userId === sessionUser.id;
        dispatch(sessionActions.logout());
        // if(check) history.push("/");
    };



    return (
        <>
            <p onClick={openMenu}><i class="fas fa-user-circle"></i>{`  ${user.username}`}</p>
            {showMenu && (
                <>
                    <p>
                        <NavLink to={`/${user.id}`}>Profile</NavLink>
                    </p>
                    {/* <p>
                        <EditProfileModal/>
                    </p> */}
                    <p>{user.email}</p>
                    <p onClick={logout}>
                        <i class="fas fa-sign-out-alt"></i>
                        Log Out
                    </p>
                </>
            )}
        </>
    );
}
