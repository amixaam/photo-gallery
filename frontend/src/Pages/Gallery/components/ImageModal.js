import Modal from "react-modal";

import "./ImageModal.scss";
import WaveDecal from "../../../images/decoration/wave.svg";
import LocationIcon from "../../../images/decoration/icons/location.svg";
import CalendarIcon from "../../../images/decoration/icons/calendar.svg";

const ImageModal = ({ imageData, onClose, onNext, onPrevious }) => {
    if (!imageData) {
        return null;
    }

    const { image_url, picture_data } = imageData;
    const { title, description, location, date, time } = picture_data;

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
                    top: "40px",
                    left: "150px",
                    right: "150px",
                    bottom: "40px",
                    background: "var(--grain-bg)",
                    backgroundSize: "300px 300px, auto, auto",
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
                <div className="details-container">
                    <div className="content">
                        <p className="title">{title ? title : "no title"}</p>
                        <img src={WaveDecal} alt="" className="wave-detail" />
                        <div className="statistics-container">
                            <div className="statistic">
                                <img src={LocationIcon} alt="" />
                                <p>{location ? location : "no location"}</p>
                            </div>
                            <div className="statistic">
                                <img src={CalendarIcon} alt="" />
                                <p>
                                    {date ? date : "no date"} {time ? time : ""}
                                </p>
                            </div>
                        </div>
                        <p className="description">
                            {description ? description : "no description"}
                        </p>
                    </div>
                    <div className="buttons-container">
                        <div className="flex-button" onClick={onPrevious}>
                            <p>previous</p>
                        </div>
                        <div className="flex-button" onClick={onNext}>
                            <p>next</p>
                        </div>
                    </div>
                </div>
                <div className="image-container">
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
