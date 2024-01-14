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
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0, 0.5)",
                },
                content: {
                    position: "absolute",
                    top: "40px",
                    left: "150px",
                    right: "150px",
                    bottom: "40px",
                    background: "linear-gradient(#EC81C7, #915DBA)",
                    overflow: "auto",
                    border: "none",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "15px",
                    outline: "none",
                    padding: "10px",
                },
            }}
        >
            <div className="gallery-tile-modal">
                <div className="split">
                    <p className="title">{title}</p>
                    <div className="statistics">
                        <p className="location">location: {location}</p>
                        <p className="date">date: {date}</p>
                    </div>
                    <p className="description">{description}</p>
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
