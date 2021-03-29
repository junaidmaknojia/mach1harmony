import React, { useState } from "react";
import "./LoginForm.css";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";

export default function LoginFormModal() {

    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm/>
                </Modal>
            )}
        </>
    );
}
