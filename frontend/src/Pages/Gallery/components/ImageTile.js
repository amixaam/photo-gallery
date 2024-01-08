import React, { useState } from "react";

import "./ImageTile.scss";

function ImageTile({ ImageData, onImageClick }) {
    return (
        <div className="gallery-tile" onClick={() => onImageClick(ImageData)}>
            <img
                src={ImageData.image_url}
                alt={ImageData.picture_data.title}
                className="thumbnail"
            />
        </div>
    );
}

export default ImageTile;
