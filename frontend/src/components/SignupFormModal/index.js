import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import './SignupForm.css';


export default function SignupFormModal({text}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="appSubmitButton" onClick={() => setShowModal(true)}>{text}</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}
