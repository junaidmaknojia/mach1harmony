import React, { useState } from "react";
import "./LoginForm.css";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
// import { useSelector } from "react-redux";

export default function LoginFormModal() {

    const [showModal, setShowModal] = useState(false);
    // const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <span onClick={() => setShowModal(true)} className="login">Log In</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm/>
                </Modal>
            )}
        </>
    );
}
