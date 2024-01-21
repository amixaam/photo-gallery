import Modal from "react-modal";

import "./EditImageModal.scss";
import TrashIcon from "../../../images/decoration/icons/trash.svg";

import { useEffect, useState } from "react";

const EditImageModal = ({
    imageData,
    onClose,
    handleUpdateImage,
    handleDeleteImage,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        camera: "",
        folder: "",
    });

    useEffect(() => {
        if (imageData) {
            const { title, description, location, date, time, camera } =
                imageData.picture_data;
            setFormData({
                title: title || "",
                description: description || "",
                location: location || "",
                date: date || "",
                time: time || "",
                camera: camera || "",
                folder: imageData.folder || "",
                id: imageData.picture_data.id,
            });
        }
    }, [imageData]);

    if (!imageData) {
        return null;
    }

    const { image_url, title } = imageData.picture_data;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
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
            <div className="admin-modal">
                <div className="content">
                    <form onSubmit={handleUpdateImage} className="upload-image">
                        <div className="a-top">
                            <h1>update image</h1>
                            <input
                                type="text"
                                name="folder"
                                placeholder="folder"
                                value={formData.folder}
                                onChange={handleChange}
                                className="admin-input"
                            />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="title"
                            />
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="description"
                            />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="city, country"
                                className="admin-input"
                            />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="mm/dd/yyyy"
                                className="admin-input"
                            />
                            <input
                                type="text"
                                name="time"
                                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                                placeholder="time HH:mm:ss"
                                value={formData.time}
                                onChange={handleChange}
                                className="admin-input"
                            />
                            <input
                                type="text"
                                name="camera"
                                placeholder="camera"
                                value={formData.camera}
                                onChange={handleChange}
                                className="admin-input"
                            />
                        </div>

                        <div className="button-container">
                            <button
                                onClick={(e) => handleUpdateImage(e, formData)}
                                className="flex-button m-button"
                            >
                                Update
                            </button>

                            <button
                                onClick={(e) =>
                                    handleDeleteImage(
                                        e,
                                        imageData.picture_data.id
                                    )
                                }
                                className="flex-button d-button"
                            >
                                <img src={TrashIcon} alt="delete" />
                            </button>
                        </div>
                    </form>
                </div>
                <img
                    src={image_url}
                    alt={title ? title : "Image"}
                    className="image"
                />
            </div>
        </Modal>
    );
};

export default EditImageModal;
