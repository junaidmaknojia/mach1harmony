import React from "react";
import { Link, Route } from "react-router-dom";
import "./UserProfile.css";
import SongUploadFormModal from "../UploadSongFormModal";

export default function UserProfile({sessionUser}) {
    // console.log(sessionUser);

    return (
        <>
            <div className="coverBanner"></div>
            <Route path={`/${sessionUser.id}/new-song`}>Upload New Song
                <SongUploadFormModal/>
            </Route>
            {/* <Link to="">Playlists</Link>
            <Link to="">Albums</Link> */}
        </>
    );
}
