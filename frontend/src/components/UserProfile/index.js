import React from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import UploadSongPage from "../UploadSongPage";

export default function UserProfile({sessionUser}) {
    // console.log(sessionUser);

    return (
        <>
            <div className="coverBanner"></div>
            <Link to={`/${sessionUser.id}/new-song`}>Upload New Song
                <UploadSongPage/>
            </Link>
            {/* <Link to="">Playlists</Link>
            <Link to="">Albums</Link> */}
        </>
    );
}
