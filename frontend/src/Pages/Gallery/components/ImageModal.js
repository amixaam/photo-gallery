import Modal from "react-modal";

import "./ImageModal.scss";

const ImageModal = ({ imageData, onClose }) => {
    if (!imageData) {
        return null;
    }

    const { image_url, picture_data } = imageData;
    const { title, description, location, date } = picture_data;

    return (
        <Modal
            isOpen={!!imageData}
            onRequestClose={onClose}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
        >
            <div className="gallery-tile-modal">
                <button onClick={onClose} className="close-button">
                    Close
                </button>
                <div className="split">
                    <p className="title">title: {title}</p>
                    <p className="description">description: {description}</p>
                    <p className="location">location: {location}</p>
                    <p className="date">date: {date}</p>
                </div>
                <div className="split">
                    <img
                        src={image_url}
                        alt={title}
                        className="full-res-image"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ImageModal;
