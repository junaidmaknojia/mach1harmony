import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export default function EditProfile() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [bio, setBio] = useState("");
    const [profileUpload, setProfileUpload] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        const payload = {
            bio, profileUpload, userId: sessionUser.id
        };

        // let songUploadGood = await dispatch(updateSong(payload, songId));
        // if(songUploadGood) {
        //     // history.push(`/songs/${songUploadGood.id}`);
        //     console.log("edit done");
        // }
    }

    return (
        <>
            <form onSubmit={onSubmit} enctype='multipart/form-data'>
                <div>
                    <input
                        type="textarea"
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChange={e=>setBio(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <p>Profile Photo Upload</p>
                    <input type="file" name='profilePhotoUpload' onChange={e => setProfileUpload(e.target.files[0])}/>
                </div>
                <div>
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </>
    );
}
