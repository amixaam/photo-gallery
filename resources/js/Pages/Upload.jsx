import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import MainLayout from "../Layouts/MainLayout";
import Loader from "../components/Loader";
import ZipImages from "../utils/ZipImages";

import Creatable from "react-select/creatable";
import { IconButton } from "../components/IconButton";
import { ModalSkeleton } from "../components/ModalSkeleton";
import PrimaryButton from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";
import { Toast } from "../components/Toast";
import { Truncate } from "../utils/Truncate";
import toast from "react-hot-toast";
import Header from "../components/Header";
import { SecondaryButton } from "../components/SecondaryButton";

export default function Upload({ auth, options }) {
    const [files, setFiles] = useState([]);
    const {
        data,
        setData,
        processing,
        reset,
        post,
        recentlySuccessful,
        errors,
    } = useForm({
        location: "",
        time: "",
        specificValues: [],
        collection: "",
        zip: null,
    });

    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

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

    const ClearButton = (image = null) => {
        if (image == null) {
            reset();
            setFiles([]);
            return;
        }

        // if image is not null, remove a single image
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
    const limit = 50;
    const limitReached = totalSizeInMB > limit;

    async function SubmitHandler(e) {
        e.preventDefault();

        if (files.length === 0) {
            toast.custom((t) => (
                <Toast
                    t={t}
                    text="Please select at least one image to upload."
                />
            ));
            return;
        }

        if (limitReached) {
            toast.custom((t) => (
                <Toast
                    t={t}
                    text={`Please upload no more than ${limit} MB of images.`}
                />
            ));
            return;
        }

        const zip = await ZipImages(files);
        setData("zip", zip);
    }

    // whyy isnt setData async :<<
    useEffect(() => {
        if (data.zip !== null) {
            post(route("photo.post"), {
                onError: (e) => {
                    toast.custom((t) => (
                        <Toast
                            t={t}
                            text="Something went wrong. Please try again later."
                        />
                    ));
                },
                onSuccess: () => {
                    setFiles([]);
                    reset();
                    toast.custom((t) => (
                        <Toast t={t} text="Images uploaded successfully!" />
                    ));
                },
            });
        }
    }, [data.zip]); // This effect runs when data.zip changes

    const OpenModal = (file) => {
        setModalData({
            show: true,
            data: file,
        });
    };

    const CloseModal = () => {
        setModalData({ show: false, data: null });
    };

    const EditImage = (imagePath, specificData) => {
        setData({
            ...data,
            specificValues: {
                ...data.specificValues,
                [imagePath]: {
                    title:
                        specificData.title === "" ? null : specificData.title,
                    time: specificData.time === "" ? null : specificData.time,
                    location:
                        specificData.location === ""
                            ? null
                            : specificData.location,
                },
            },
        });
        CloseModal();
    };

    const thumbs = files.map((file, id) => (
        <ImagePreview
            key={id}
            file={file}
            data={{
                title: data.specificValues[file.path]?.title ?? file.path,
                time: data.specificValues[file.path]?.time ?? data.time ?? null,
                location:
                    data.specificValues[file.path]?.location ??
                    data.location ??
                    null,
            }}
            isLoading={processing}
            clearImage={ClearButton}
            OpenModal={OpenModal}
        />
    ));

    return (
        <>
            <EditModal
                show={modalData.show}
                data={modalData.data}
                CloseModal={CloseModal}
                EditImage={EditImage}
            />
            <MainLayout auth={auth}>
                <Header title="Upload" back={true} href={route("dashboard")} />
                <main className="grid gap-8 md:grid-cols-[1fr_4fr]">
                    <aside className="flex flex-col gap-8 md:sticky md:top-8 md:h-fit">
                        <div
                            className={`relative w-full rounded-3xl border-2 border-dashed border-text bg-text bg-opacity-10 transition-all duration-500 ease-in-out md:aspect-square`}
                        >
                            {processing && (
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
                                <input
                                    {...getInputProps()}
                                    disabled={processing}
                                />
                                <img
                                    src="/images/upload.svg"
                                    alt="upload icon"
                                    className={processing ? "opacity-0" : ""}
                                />
                                <p
                                    className={`text-center ${processing ? "opacity-0" : ""}`}
                                >
                                    Drag and drop or select images here!
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-text">Mass assign metadata</p>
                            <Creatable
                                options={options}
                                placeholder="Collection..."
                                className={"creatable"}
                                classNamePrefix="creatable"
                                isDisabled={processing}
                                isLoading={processing}
                                isSearchable
                                onChange={(e) => {
                                    setData("collection", e.value);
                                }}
                            />
                            <TextInput
                                name="location"
                                value={data.location}
                                onchange={changeHandler}
                                disabled={processing}
                            />
                            <TextInput
                                name="time"
                                value={data.time}
                                onchange={changeHandler}
                                disabled={processing}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between">
                                <p className="text-text">
                                    {thumbs.length} images, {totalSizeInMB} MB
                                </p>
                                {limitReached && (
                                    <p className="inline text-error">
                                        LIMIT REACHED
                                    </p>
                                )}
                            </div>
                            <div className="flex w-full flex-row gap-[inherit]">
                                <SecondaryButton
                                    type="button"
                                    disabled={processing}
                                    onClick={() => {
                                        ClearButton();
                                    }}
                                    className="flex-grow justify-center"
                                >
                                    <img src="/images/close.svg" alt="" />
                                    <p>Clear</p>
                                </SecondaryButton>
                                <form
                                    onSubmit={SubmitHandler}
                                    className="flex-grow"
                                >
                                    <SecondaryButton
                                        type="submit"
                                        disabled={processing}
                                        className="w-full justify-center"
                                    >
                                        <img
                                            src="/images/upload.svg"
                                            alt="upload icon"
                                        />
                                        <p>Upload</p>
                                    </SecondaryButton>
                                </form>
                            </div>
                        </div>
                    </aside>
                    <div className="flex flex-col">
                        {thumbs.length > 0 && (
                            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 2xl:columns-4">
                                {thumbs}
                            </div>
                        )}
                    </div>
                </main>
            </MainLayout>
        </>
    );
}

const ImagePreview = ({ file, isLoading, clearImage, data, OpenModal }) => {
    return (
        <div className="relative">
            <div className="image-preview-overlay absolute flex h-full w-full flex-row justify-between rounded-xl p-4">
                <div className="flex h-fit w-full flex-row items-center justify-between">
                    <p className="text-text sm:hidden xl:block">
                        {Truncate(data.title ? data.title : file.path, 12)}
                    </p>
                    <div className="flex flex-row">
                        <div className="group relative">
                            <IconButton icon="info" alt="View info button" />
                            <div className="clip absolute left-1/2 z-10 hidden size-8 -translate-x-1/2 rounded-full bg-bgsecondary group-hover:block"></div>
                            <div className="absolute left-1/2 z-10 hidden w-fit -translate-x-1/2 translate-y-2 rounded-md bg-bgsecondary p-4 *:text-nowrap group-hover:block">
                                <p className="text-text">
                                    {data.title ? data.title : file.path}
                                </p>
                                <p className="text-text">
                                    {data.time ? data.time : "No time"}
                                </p>
                                <p className="text-text">
                                    {data.location
                                        ? data.location
                                        : "No location"}
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
            className="flex flex-1 justify-center gap-2 rounded-md bg-text bg-opacity-10 px-4 py-2 font-medium text-text transition-all duration-200 hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100"
            disabled={disabled}
        >
            <img src={href} alt="" />
            {text}
        </button>
    );
};

const EditModal = ({ show, CloseModal = () => {}, data: image, EditImage }) => {
    const { data, setData, reset } = useForm({
        title: "",
        location: "",
        time: "",
    });

    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

    if (!show || !image) return;
    return (
        <ModalSkeleton
            show={show}
            CloseModal={() => {
                CloseModal();
                reset();
            }}
        >
            <div className="flex flex-col gap-4">
                <p className="text-text">Edit {image.path}</p>
                <TextInput
                    name="title"
                    onchange={changeHandler}
                    value={data.title}
                />
                <TextInput
                    name="location"
                    onchange={changeHandler}
                    value={data.location}
                />
                <TextInput
                    name="time"
                    onchange={changeHandler}
                    value={data.time}
                />
                <PrimaryButton
                    style="w-fit"
                    text="Edit"
                    onClick={() => {
                        EditImage(image.path, data);
                    }}
                />
            </div>
        </ModalSkeleton>
    );
};
