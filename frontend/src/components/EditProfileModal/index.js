import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "./EditProfile.css";
import { Modal } from "../../context/Modal";

export default function EditProfileModal() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Profile</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProfile setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}
