import React, { useState } from "react";
import EditSongForm from "./EditSongForm";
import "./EditSongForm.css";
import { Modal } from "../../context/Modal";
// import { useSelector } from "react-redux";

export default function EditSongFormModal({songId}) {

    const [showModal, setShowModal] = useState(false);
    // const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <span className="appSubmitButton" onClick={() => setShowModal(true)}>Edit</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm songId={songId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}
