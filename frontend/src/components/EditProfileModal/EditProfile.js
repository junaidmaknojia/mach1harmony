import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { updateProfile } from "../../store/user";


export default function EditProfile({setShowModal}) {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [bio, setBio] = useState(sessionUser.bio);
    const [profileUpload, setProfileUpload] = useState();

    async function onSubmit(e) {
        e.preventDefault();
        const payload = {
            bio, profileUpload, userId: sessionUser.id
        };

        const updateGood = await dispatch(updateProfile(payload));
        if(updateGood) {
            // history.push(`/songs/${songUploadGood.id}`);
            setShowModal(false);
        }
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
