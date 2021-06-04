import SongUploadForm from "./SongUploadForm";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import "./UploadSongPage.css";

export default function SongUploadFormModal() {

	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<span onClick={() => setShowModal(true)}>Upload</span>
			{showModal && (
				<Modal onClose={() => setShowModal(false)} id="uploadSongModal">
					<SongUploadForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}
