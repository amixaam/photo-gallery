import Modal from "react-modal";

import "./ImageModal.scss";
import AnimatedWave from "../../../Reuse/AnimatedWave";
import Statistics from "../../../Reuse/Statistics";

const ImageModal = ({ imageData, onClose, onNext, onPrevious }) => {
    if (!imageData) {
        return null;
    }

    const { image_url, picture_data } = imageData;
    const { title, description, location, date, time, camera } = picture_data;

    const statisticsData = {
        location: location,
        date: date,
        time: time,
        camera: camera,
    };

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
                    backgroundColor: "rgba(0,0,0, 0.75)",
                },
                content: {
                    position: "absolute",
                    top: "10%",
                    bottom: "10%",
                    left: "10%",
                    right: "10%",
                    background: "var(--grain-bg)",
                    backgroundRepeat: "repeat, no-repeat, no-repeat",
                    overflow: "auto",
                    border: "none",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "15px",
                    outline: "none",
                    padding: "16px",
                },
            }}
        >
            <div className="gallery-tile-modal">
                <div className="content">
                    <div className="top">
                        <h1>{title ? title : "no data"}</h1>
                        <AnimatedWave
                            className={"content-flair"}
                            amplitude={5}
                            speed={0.1}
                            frequency={10}
                        />
                        <Statistics statistics={statisticsData} />
                        <div className="description-container">
                            <p>{description ? description : "no data"}</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <div
                            className="flex-button modal-button"
                            onClick={onPrevious}
                        >
                            previous
                        </div>
                        <div
                            className="flex-button modal-button"
                            onClick={onNext}
                        >
                            next
                        </div>
                    </div>
                </div>
                <img src={image_url} alt={title} className="image" />
            </div>
        </Modal>
    );
};

export default ImageModal;
