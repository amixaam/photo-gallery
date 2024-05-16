import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { useDropzone } from "react-dropzone";
import { TextInput } from "../components/TextInput";
import axios from "axios";
import { router } from "@inertiajs/react";
import ZipImages from "../utils/ZipImages";
import Loader from "../components/Loader";

export default function Dashboard({ auth }) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => {
                const newFiles = acceptedFiles.filter(
                    (newFile) =>
                        !prevFiles.some(
                            (prevFile) => prevFile.name === newFile.name
                        )
                );

                return [
                    ...prevFiles,
                    ...newFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    ),
                ];
            });
        },
    });

    const thumbs = files.map((file) => (
        <img
            key={file.name}
            src={file.preview}
            className="h-48 rounded-md hover:scale-105 transition-all duration-200 hover:opacity-75 cursor-pointer"
            onLoad={() => {
                URL.revokeObjectURL(file.preview);
            }}
            onClick={() => clearImage(file)}
        />
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const totalSizeInMB = (
        files.reduce((acc, file) => acc + file.size, 0) /
        (1024 * 1024)
    ).toFixed(2);

    const clearImage = (image = null) => {
        if (image == null) {
            setFiles([]);
            return;
        }

        setFiles(files.filter((file) => file !== image));
    };

    function submitHandler() {
        const data = new FormData();

        ZipImages(files).then((zip) => {
            data.append("zip", zip);
            router.post(route("upload.post"), data, {
                onStart: () => {
                    setIsLoading(true);
                },
                onError: (error) => console.error(error),
                onFinish: () => {
                    setFiles([]);
                    setIsLoading(false);
                },
            });
        });
    }

    return (
        <MainLayout auth={auth}>
            <main className="mx-8 pt-24 sm:pt-24 sm:mx-24 flex flex-col gap-4">
                <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                    Upload
                </h1>
                <section
                    className={`bg-footer h-fit border-text50 border-2 border-dashed rounded-3xl transition-all duration-500 ease-in-out relative`}
                >
                    {isLoading && (
                        <div className="absolute bg-bg70 w-full h-full flex items-center justify-center rounded-3xl">
                            <Loader style={"scale-[2]"} color="#EC81C7" />
                        </div>
                    )}
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className="h-full py-8 rounded-3xl flex flex-col justify-center items-center"
                    >
                        <input {...getInputProps()} />
                        <img src="/images/upload.svg" alt="upload icon" />
                        <p className="text-text">
                            Drag and drop or select images here!
                        </p>
                    </div>
                </section>

                {thumbs.length && (
                    <>
                        <div className="flex flex-row gap-4 items-center">
                            <IconButton
                                disabled={isLoading}
                                onClick={() => clearImage()}
                                text="Clear all"
                                href="/images/close.svg"
                            />
                            <TextInput name="Collection" disabled={isLoading} />
                            <IconButton
                                disabled={isLoading}
                                onClick={submitHandler}
                                text="Upload"
                                href="/images/upload.svg"
                            />
                            <p className="text-text">
                                Selected {totalSizeInMB} MB
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">{thumbs}</div>
                    </>
                )}
            </main>
        </MainLayout>
    );
}

const IconButton = ({
    href = "/images/close.svg",
    text = "Icon button",
    onClick = () => {
        console.log("Clicked!");
    },
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            className="flex gap-2 px-4 py-2 rounded-md text-text font-medium bg-footersecondary hover:scale-105 hover:drop-shadow-xl active:drop-shadow-xl active:scale-100 active:brightness-95 active:duration-100 transition-all duration-200"
            disabled={disabled}
        >
            <img src={href} alt="" />
            {text}
        </button>
    );
};
