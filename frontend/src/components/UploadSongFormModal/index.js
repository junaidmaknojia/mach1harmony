import SongUploadForm from "./SongUploadForm";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

export default function SongUploadFormModal() {

    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>Upload New Song!</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SongUploadForm />
          </Modal>
        )}
      </>
    );
}
