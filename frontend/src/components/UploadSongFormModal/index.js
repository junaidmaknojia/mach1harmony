import SongUploadForm from "./SongUploadForm";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

export default function SongUploadFormModal() {

    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <span onClick={() => setShowModal(true)}>Upload</span>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SongUploadForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
}
