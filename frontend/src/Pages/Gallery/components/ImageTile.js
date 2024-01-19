import "./ImageTile.scss";

function ImageTile({ ThumbnailData, onImageClick }) {
    return (
        <div
            className="gallery-tile"
            onClick={() => onImageClick(ThumbnailData)}
        >
            <img src={ThumbnailData.thumbnail} className="thumbnail" />
        </div>
    );
}

export default ImageTile;
