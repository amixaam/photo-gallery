import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import { TextInput } from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { Toast } from "../components/Toast";
import { Truncate } from "../utils/Truncate";
import toast from "react-hot-toast";
import Header from "../components/Header";
import { SmallCollectionCard } from "../components/SmallCollectionCard";
import Creatable from "react-select/creatable";
import { SetToast } from "../utils/SetToast";
import { IconLink } from "../components/IconLink";
import { IconButton } from "../components/IconButton";
import { DeleteModal } from "../components/DeleteModal";

function EditPhoto({ image, options, auth }) {
    const [confirmModal, setConfirmModal] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        title: image.title,
        alt_text: image.alt_text,
        location: image.location,
        time: image.time,
    });

    const {
        data: addCollectionData,
        setData: setAddCollectionData,
        patch: patchCollection,
        processing: collectionProcessing,
        reset: resetCollection,
    } = useForm({
        collection: "",
    });

    const {
        data: removeCollectionData,
        setData: setRemoveCollectionData,
        patch: patchRemoveCollection,
        processing: removeCollectionProcessing,
    } = useForm({
        collection: "",
    });

    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

    function SubmitHandler(e) {
        e.preventDefault();
        patch(route("photo.update", image.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.custom((t) => (
                    <Toast t={t} text="Image updated successfully!" />
                ));
            },
            onError: (e) => {
                SetToast(
                    e.error
                        ? e.error
                        : "Something went wrong. Please try again later.",
                );
            },
        });
    }

    function SubmitAddToCollection(e) {
        e.preventDefault();
        patchCollection(route("photo.addToCollection", image.id), {
            preserveState: true,
            preserveScroll: true,
            onStart: () => {
                resetCollection();
            },
            onSuccess: () => {
                SetToast("Image added to collection successfully!");
            },
            onError: (e) => {
                SetToast(
                    e.error
                        ? e.error
                        : "Something went wrong. Please try again later.",
                );
            },
        });
    }

    function SubmitRemoveFromCollection(e) {
        e.preventDefault();
        patchRemoveCollection(route("photo.removeFromCollection", image.id), {
            preserveState: true,
            preserveScroll: true,
            onStart: () => {
                setConfirmModal(false);
            },
            onSuccess: () => {
                SetToast("Image removed from collection successfully!");
            },
            onError: (e) => {
                SetToast(
                    e.error
                        ? e.error
                        : "Something went wrong. Please try again later.",
                );
            },
        });
    }

    return (
        <>
            <DeleteModal
                title="Remove from collection?"
                show={confirmModal}
                confirmButtonText="Remove"
                CloseModal={() => setConfirmModal(false)}
                DeleteImage={SubmitRemoveFromCollection}
            >
                <p className="text-center">
                    Remove this image from this collection?
                </p>
            </DeleteModal>
            <MainLayout auth={auth} admin={true}>
                <main className="flex flex-col gap-[inherit]">
                    <Header title="Edit photo" back={true} />

                    {/* collections & form */}
                    <form
                        onSubmit={SubmitHandler}
                        className="flex flex-col gap-4"
                    >
                        <TextInput
                            name="title"
                            value={data.title}
                            onchange={changeHandler}
                            error={errors.title || errors.error}
                        />
                        <TextInput
                            name="alt_text"
                            value={data.alt_text}
                            onchange={changeHandler}
                            error={errors.alt_text || errors.error}
                        />
                        <TextInput
                            name="location"
                            value={data.location}
                            onchange={changeHandler}
                            error={errors.location || errors.error}
                        />
                        <TextInput
                            name="time"
                            value={data.time}
                            onchange={changeHandler}
                            error={errors.time || errors.error}
                        />
                        <PrimaryButton
                            text="Save"
                            onClick={() => {}}
                            style="w-fit"
                        />
                    </form>
                    <section className="flex w-full flex-col gap-8">
                        <h3>Add to collection</h3>
                        <form
                            className="flew-row flex gap-4"
                            onSubmit={SubmitAddToCollection}
                        >
                            <div className="w-[20rem]">
                                <Creatable
                                    options={options}
                                    placeholder="Collection..."
                                    className={"creatable"}
                                    classNamePrefix="creatable"
                                    isDisabled={collectionProcessing}
                                    isLoading={collectionProcessing}
                                    isSearchable
                                    onChange={(e) => {
                                        setAddCollectionData(
                                            "collection",
                                            e.value,
                                        );
                                    }}
                                />
                            </div>
                            <PrimaryButton
                                text="Add"
                                onClick={() => {}}
                                style="w-fit"
                                processing={collectionProcessing}
                            />
                        </form>
                    </section>
                    <section className="flex w-full flex-col gap-8">
                        <h3 className="text-text">Collections</h3>
                        <div className="w-full overflow-x-scroll">
                            <div className="relative flex w-max flex-row gap-4">
                                {image.collection.map((collection) => (
                                    <div className="relative">
                                        <div className="absolute right-0 top-0 z-[1] m-2 rounded-full bg-bg drop-shadow-2xl">
                                            <IconButton
                                                icon="close"
                                                onClick={() => {
                                                    setRemoveCollectionData(
                                                        "collection",
                                                        collection.id,
                                                    );
                                                    setConfirmModal(true);
                                                }}
                                                disabled={
                                                    removeCollectionProcessing
                                                }
                                            />
                                        </div>
                                        <SmallCollectionCard
                                            key={collection.id}
                                            collection={collection}
                                            href={route(
                                                "gallery.edit",
                                                collection.slug,
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </MainLayout>
        </>
    );
}

export default EditPhoto;
