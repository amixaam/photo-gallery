import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { useDropzone } from "react-dropzone";
import { router } from "@inertiajs/react";
import ZipImages from "../utils/ZipImages";
import Loader from "../components/Loader";

import Creatable from "react-select/creatable";
import { TextInput } from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { IconButton } from "../components/IconButton";

export default function Upload({ auth, options }) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [collectionInput, setCollectionInput] = useState("");
    const [massAssignValues, setMassAssignValues] = useState({
        place: "",
        date: "",
    });

    const [modalData, setModalData] = useState({
        show: false,
        data: null,
    });

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

    const clearImage = (image = null) => {
        if (image == null) {
            setFiles([]);
            return;
        }
        setFiles(files.filter((file) => file !== image));
    };

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const totalSizeInMB = (
        files.reduce((acc, file) => acc + file.size, 0) /
        (1024 * 1024)
    ).toFixed(2);

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

    const OpenModal = (file) => {
        setModalData({
            show: true,
            data: file,
        });
    };

    const CloseModal = () => {
        setModalData({ show: false, data: null });
    };

    const thumbs = files.map((file, id) => (
        <ImagePreview
            key={id}
            file={file}
            isLoading={isLoading}
            clearImage={clearImage}
            massAssignValues={massAssignValues}
            OpenModal={OpenModal}
        />
    ));

    return (
        <>
            <ModalSkeleton
                show={modalData.show}
                data={modalData.data}
                CloseModal={CloseModal}
            />
            <MainLayout auth={auth}>
                <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                    Upload
                </h1>

                <main className="grid grid-cols-[1fr_4fr] gap-8">
                    <aside className="sticky flex flex-col gap-8">
                        <div
                            className={`relative aspect-square w-full rounded-3xl border-2 border-dashed border-text50 bg-footer transition-all duration-500 ease-in-out`}
                        >
                            {isLoading && (
                                <div className="absolute flex h-full w-full items-center justify-center rounded-3xl bg-bg70">
                                    <Loader
                                        style={"scale-[2]"}
                                        color="#EC81C7"
                                    />
                                </div>
                            )}
                            <div
                                {...getRootProps({ className: "dropzone" })}
                                className="flex h-full flex-col items-center justify-center rounded-3xl py-8"
                            >
                                <input {...getInputProps()} />
                                <img
                                    src="/images/upload.svg"
                                    alt="upload icon"
                                />
                                <p className="text-text">
                                    Drag and drop or select images here!
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-text">Mass assign metadata</p>
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
                            <TextInput
                                name="place"
                                value={massAssignValues.place}
                                onchange={(e) => {
                                    setMassAssignValues({
                                        ...massAssignValues,
                                        place: e.target.value,
                                    });
                                }}
                            />
                            <TextInput
                                name="date"
                                value={massAssignValues.date}
                                onchange={(e) => {
                                    setMassAssignValues({
                                        ...massAssignValues,
                                        date: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-text">
                                {thumbs.length} selected, {totalSizeInMB} MB
                            </p>
                            <IconTextButton
                                disabled={isLoading}
                                onClick={() => clearImage()}
                                text="Clear all"
                                href="/images/close.svg"
                            />
                            <IconTextButton
                                disabled={isLoading}
                                onClick={submitHandler}
                                text="Upload"
                                href="/images/upload.svg"
                            />
                        </div>
                    </aside>

                    {thumbs.length && (
                        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 2xl:columns-4">
                            {thumbs}
                        </div>
                    )}
                </main>
            </MainLayout>
        </>
    );
}

const ImagePreview = ({
    file,
    isLoading,
    clearImage,
    massAssignValues,
    OpenModal,
}) => {
    return (
        <div className="relative">
            <div className="image-preview-overlay absolute flex h-full w-full flex-row justify-between rounded-xl p-4">
                <div className="flex h-fit w-full flex-row items-center justify-between">
                    <p className="text-text">
                        {file.path.slice(0, 12) +
                            (file.path.length > 12 ? "..." : "")}
                    </p>
                    <div className="flex flex-row">
                        <div className="group relative">
                            <IconButton icon="info" alt="View info button" />
                            <div className="clip absolute left-1/2 z-10 hidden size-8 -translate-x-1/2 rounded-full bg-bgsecondary group-hover:block"></div>
                            <div className="absolute left-1/2 z-10 hidden w-fit -translate-x-1/2 translate-y-2 rounded-md bg-bgsecondary p-4 group-hover:block">
                                <p className="text-text">{file.path}</p>
                                <p className="text-text">No description</p>
                                <p className="text-text">
                                    {massAssignValues.date
                                        ? massAssignValues.date
                                        : "No date"}
                                </p>
                                <p className="text-text">
                                    {massAssignValues.place
                                        ? massAssignValues.place
                                        : "No place"}
                                </p>
                            </div>
                        </div>
                        <IconButton
                            icon="edit"
                            alt="Edit image data button"
                            onClick={() => {
                                OpenModal(file);
                            }}
                            disabled={isLoading}
                        />
                        <IconButton
                            icon="close"
                            alt="clear image button"
                            onClick={() => {
                                if (!isLoading) {
                                    clearImage(file);
                                }
                            }}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
            <img
                key={file.name}
                src={file.preview}
                className={`${isLoading && "opacity-50"} mb-6 w-full rounded-xl `}
                onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                }}
            />
        </div>
    );
};

const IconTextButton = ({
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

const ModalSkeleton = ({ show, CloseModal = () => {}, data }) => {
    if (!show || !data) return;

    console.log(data.path);

    return (
        <div
            className={`fixed z-20 flex h-screen w-screen items-center justify-center bg-bg70 transition-all duration-200 ${!show && "pointer-events-none opacity-0"} `}
            onClick={CloseModal}
        >
            <div className="flex flex-col items-center justify-center bg-bgsecondary p-4">
                <p className="text-text">Edit {data.path}</p>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <TextInput name="Title" />
                        <TextInput name="Place" />
                        <TextInput name="Date" />
                    </div>
                    <TextInput name="Description" />
                </div>
                <PrimaryButton />
            </div>
        </div>
    );
};
