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

        const updateGood = dispatch(updateProfile(payload));
        if(updateGood) {
            // history.push(`/songs/${songUploadGood.id}`);
            setShowModal(false);
        }
    }

    return (
        <>
            {/* <h2>Edit Profile</h2> */}
            <img className="profilePic" src={sessionUser.profilePic} alt="Current profile"/>
            <form onSubmit={onSubmit} enctype='multipart/form-data'>
                <div>
                    <textarea
                        className="textarea"
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChange={e=>setBio(e.target.value)}
                    >
                    </textarea>
                </div>
                <div>
                    <p className="appText">Profile Photo Upload</p>
                    <input className="appFileUpload" type="file" name='profilePhotoUpload' onChange={e => setProfileUpload(e.target.files[0])}/>
                </div>
                <div>
                    <button type="submit" className="appSubmitButton">Update Profile</button>
                </div>
            </form>
        </>
    );
}
