import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { useDropzone } from "react-dropzone";
import { router } from "@inertiajs/react";
import ZipImages from "../utils/ZipImages";
import Loader from "../components/Loader";

import Creatable from "react-select/creatable";

export default function Upload({ auth, options }) {
    console.log(options);
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [collectionInput, setCollectionInput] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => {
                const newFiles = acceptedFiles.filter(
                    (newFile) =>
                        !prevFiles.some(
                            (prevFile) => prevFile.name === newFile.name,
                        ),
                );

                return [
                    ...prevFiles,
                    ...newFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        }),
                    ),
                ];
            });
        },
    });

    const thumbs = files.map((file) => (
        <img
            key={file.name}
            src={file.preview}
            className={`${isLoading && "opacity-50"} mb-6 w-full cursor-pointer rounded-md transition-all duration-200 hover:scale-105 hover:opacity-75`}
            onLoad={() => {
                URL.revokeObjectURL(file.preview);
            }}
            onClick={() => {
                if (!isLoading) {
                    clearImage(file);
                }
            }}
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
            data.append("collection", collectionInput);

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
            <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                Upload
            </h1>

            <main className="flex flex-col gap-4">
                <section
                    className={`relative h-fit rounded-3xl border-2 border-dashed border-text50 bg-footer transition-all duration-500 ease-in-out`}
                >
                    {isLoading && (
                        <div className="absolute flex h-full w-full items-center justify-center rounded-3xl bg-bg70">
                            <Loader style={"scale-[2]"} color="#EC81C7" />
                        </div>
                    )}
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className="flex h-full flex-col items-center justify-center rounded-3xl py-8"
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
                        <div className="flex flex-row flex-wrap items-center gap-4">
                            <IconButton
                                disabled={isLoading}
                                onClick={() => clearImage()}
                                text="Clear all"
                                href="/images/close.svg"
                            />
                            <Creatable
                                options={options}
                                placeholder="Select a collection"
                                className={"creatable"}
                                classNamePrefix="creatable"
                                isClearable
                                isSearchable
                                onChange={(e) => {
                                    setCollectionInput(e.value);
                                }}
                            />
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
                        <div className="columns-2 gap-6 sm:columns-3 md:columns-4 lg:columns-5">
                            {thumbs}
                        </div>
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
            className="flex gap-2 rounded-md bg-footersecondary px-4 py-2 font-medium text-text transition-all duration-200 hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100"
            disabled={disabled}
        >
            <img src={href} alt="" />
            {text}
        </button>
    );
};
