import JSZip from "jszip";

export default async function ZipImages(images, download = false) {
    const zip = new JSZip();

    // Add Images to the zip file
    for (let i = 0; i < images.length; i++) {
        const filename = images[i].name;

        // Find the last dot index
        const lastDotIndex = filename.lastIndexOf(".");

        // Extract file name without extension
        const filenameWithoutExtension =
            lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;

        // Extract file extension
        const fileExtension =
            lastDotIndex !== -1 ? filename.slice(lastDotIndex + 1) : "";

        // add timestamp to the name
        const finalName =
            filenameWithoutExtension + "_" + Date.now() + "." + fileExtension;
        zip.file(finalName, images[i]);
    }

    // Generate the zip file
    const zipData = await zip.generateAsync({
        type: "blob",
        streamFiles: true,
    });

    if (download) {
        // Create a download link for the zip file
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(zipData);
        link.download = "Compressed pictures.zip";
        link.click();
    } else {
        return zipData;
    }
}
