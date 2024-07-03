import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Creatable from "react-select/creatable";
import MainLayout from "../Layouts/MainLayout";
import { DeleteModal } from "../components/DeleteModal";
import Header from "../components/Header";
import { IconButton } from "../components/IconButton";
import PrimaryButton from "../components/PrimaryButton";
import { SmallCollectionCard } from "../components/SmallCollectionCard";
import { TextInput } from "../components/TextInput";
import { SetToast } from "../utils/SetToast";
import { motion } from "framer-motion";
import { container, revealItem } from "../utils/FramerVariants";
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
                SetToast("Image updated successfully!");
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
                <motion.main
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-[inherit]"
                >
                    <motion.div variants={revealItem}>
                        <Header title="Edit photo" back={true} />
                    </motion.div>

                    {/* collections & form */}
                    <motion.div variants={revealItem}>
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
                    </motion.div>

                    <motion.section
                        variants={revealItem}
                        className="flex w-full flex-col gap-8"
                    >
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
                    </motion.section>
                    <motion.section
                        variants={revealItem}
                        className="flex w-full flex-col gap-8"
                    >
                        <h3 className="text-text">Collections</h3>
                        <div className="w-full overflow-x-scroll">
                            <div
                                initial="hidden"
                                animate="show"
                                className="relative flex w-max flex-row gap-4"
                            >
                                {image.collection.map((collection) => (
                                    <div
                                        className="relative"
                                        key={collection.id}
                                    >
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
                    </motion.section>
                </motion.main>
            </MainLayout>
        </>
    );
}

export default EditPhoto;
