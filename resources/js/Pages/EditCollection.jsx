import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";
import { Link, useForm } from "@inertiajs/inertia-react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { Toast } from "../components/Toast";
import Header from "../components/Header";
import { DeleteModal } from "../components/DeleteModal";
import { IconButton } from "../components/IconButton";
import { router } from "@inertiajs/react";

// "Misc." and "My best work"
const undeletableCollections = [1, 2];

export default function EditCollection({ auth, collection }) {
    const [showCollectionDeleteModal, setShowCollectionDeleteModal] =
        useState(false);
    const [showImageDeleteModal, setShowImageDeleteModal] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        title: collection.title,
        is_public: collection.is_public,
        is_featured: collection.is_featured,
    });
    const { delete: destroy, processing: deleteProcessing } = useForm({});
    const { patch: pathCover, processing: coverProcessing } = useForm({});
    const {
        data: selected,
        setData: setSelected,
        delete: massDestroy,
        processing: massDeleteProcessing,
    } = useForm([]);

    function SubmitUpdate(e) {
        e.preventDefault();
        patch(route("gallery.update", collection.slug), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.custom((t) => (
                    <Toast t={t} text="Collection updated successfully!" />
                ));
            },
        });
    }

    function SubmitDelete(e) {
        e.preventDefault();
        destroy(route("gallery.delete", collection.slug), {
            onStart: () => {
                setShowCollectionDeleteModal(false);
            },
            onSuccess: () => {
                toast.custom((t) => (
                    <Toast t={t} text="Collection deleted successfully!" />
                ));
            },
        });
    }

    function SubmitMassDelete(e) {
        e.preventDefault();
        massDestroy(route("photo.massDelete"), {
            preserveScroll: true,
            preserveState: true,
            onStart: () => {
                setShowImageDeleteModal(false);
            },
            onError: (error) => console.error("error: ", error),
            onSuccess: () => {
                toast.custom((t) => (
                    <Toast t={t} text="Images deleted successfully!" />
                ));
                setSelected([]);
            },
        });
    }

    function SelectImage(id) {
        if (selected.includes(id)) {
            setSelected(selected.filter((i) => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    }

    return (
        <>
            <DeleteModal
                show={showImageDeleteModal}
                CloseModal={() => {
                    setShowImageDeleteModal(false);
                }}
                DeleteImage={SubmitMassDelete}
                title="Mass delete images?"
            >
                <p className="text-center text-text">
                    Are you sure you want to delete the selected images?
                </p>
                <p className="text-center text-text">
                    This action cannot be reversed.
                </p>
            </DeleteModal>
            <DeleteModal
                show={showCollectionDeleteModal}
                CloseModal={() => {
                    setShowCollectionDeleteModal(false);
                }}
                DeleteImage={SubmitDelete}
                title="Delete this collection?"
            >
                <p className="text-center text-text">
                    Are you sure you want to delete this collection?
                </p>
                <p className="text-center text-text">
                    This action cannot be reversed.
                </p>
            </DeleteModal>

            <MainLayout auth={auth} admin={true}>
                <Header
                    title="Edit collection"
                    back={true}
                    href={route("dashboard")}
                />
                <main className="flex flex-col gap-[inherit]">
                    {/* Edit form */}
                    <section className="flex flex-col gap-4 sm:grid sm:grid-cols-[auto_1fr]">
                        <img
                            src={`/storage/${collection.cover_path}`}
                            alt={collection.title}
                            className="aspect-square w-full rounded-3xl object-cover md:h-[250px] md:w-[250px]"
                        />
                        <form
                            onSubmit={SubmitUpdate}
                            className="flex w-full flex-col gap-4 sm:w-[320px]"
                        >
                            <TextInput
                                name="title"
                                value={data.title}
                                onchange={(e) =>
                                    setData("title", e.target.value)
                                }
                                error={errors.title}
                            />
                            <CheckBox
                                name="public"
                                value={data.is_public}
                                onChange={(e) =>
                                    setData("is_public", e.target.checked)
                                }
                            />
                            <CheckBox
                                name="pinned"
                                value={data.is_featured}
                                onChange={(e) =>
                                    setData("is_featured", e.target.checked)
                                }
                            />

                            <div className="flex flex-row gap-4">
                                <PrimaryButton
                                    text="Save"
                                    onClick={() => {}}
                                    processing={processing}
                                />
                                <DangerButton
                                    text="Delete"
                                    onClick={() =>
                                        setShowCollectionDeleteModal(true)
                                    }
                                    disabled={undeletableCollections.includes(
                                        collection.id,
                                    )}
                                    processing={deleteProcessing}
                                />
                            </div>
                        </form>
                    </section>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                            <h3>Photos</h3>
                            <div
                                className={
                                    selected.length
                                        ? "pointer-events-auto select-all opacity-100"
                                        : "pointer-events-none select-none opacity-0"
                                }
                            >
                                <DangerButton
                                    text={`Delete ${selected.length}`}
                                    onClick={() =>
                                        setShowImageDeleteModal(true)
                                    }
                                    className="w-full md:w-fit"
                                    processing={massDeleteProcessing}
                                />
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                            {collection.images.map((image) => (
                                <PhotoCard
                                    key={image.id}
                                    image={image}
                                    Select={SelectImage}
                                    selected={selected.includes(image.id)}
                                    collectionSlug={collection.slug}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    );
}

const PhotoCard = ({
    image,
    selected = false,
    Select = () => {},
    collectionSlug,
}) => {
    return (
        <div
            className={`${selected ? "outline-text" : "outline-transparent"} relative h-full w-full rounded-3xl outline transition-all`}
        >
            <div className="image-preview-overlay absolute flex h-full w-full flex-row justify-between rounded-3xl p-4">
                <IconButton
                    icon={selected ? "checkbox" : "checkbox-empty"}
                    onClick={() => {
                        Select(image.id);
                    }}
                />
                <div className="flex flex-row">
                    <IconButton
                        icon="collections"
                        as="link"
                        href={route("gallery.setCover", [
                            collectionSlug,
                            image.id,
                        ])}
                    />
                    <IconButton
                        icon="edit"
                        as="link"
                        href={route("photo.edit", image.id)}
                    />
                </div>
            </div>
            <img
                src={`/storage/${image.path}`}
                alt={image.title}
                className="aspect-square w-full rounded-3xl object-cover"
            />
        </div>
    );
};

const CheckBox = ({
    name = "Input",
    value,
    onChange = () => {},
    className,
}) => {
    return (
        <div
            className={`${className} flex w-full items-center gap-2 rounded-md bg-text bg-opacity-10 px-4 py-3 transition-all duration-200`}
        >
            <input
                type="checkbox"
                name={name}
                value={value}
                onChange={onChange}
                checked={value}
                className="size-4 rounded-md"
            />
            <label htmlFor={name} className="font-medium text-text">
                {name}
            </label>
        </div>
    );
};

function DangerButton({
    text = "Danger button",
    processing = false,
    className = "",
    children = null,
    type = "button",
    disabled = false,

    as = "button",
    href,
    onClick,
}) {
    if (as === "button") {
        return (
            <button
                type={type}
                onClick={onClick}
                disabled={disabled || processing}
                className={`${className} ${disabled ? "brightness-50" : "hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100"} group relative flex items-center justify-center rounded-md bg-error bg-opacity-50 px-6 py-2 transition-all duration-200`}
            >
                <div className={`h-full w-full ${processing && "opacity-0"}`}>
                    {children ? children : <h4>{text}</h4>}
                </div>
                {processing && (
                    <div className="absolute flex h-full w-full items-center justify-center">
                        <Loader color="#F6D4EA" />
                    </div>
                )}
            </button>
        );
    }

    return (
        <Link
            href={href}
            disabled={disabled || processing}
            className={`${className} ${disabled ? "brightness-50" : "hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100"} group relative flex items-center justify-center rounded-md bg-error bg-opacity-50 px-6 py-2 transition-all duration-200`}
        >
            <div className={`h-full w-full ${processing && "opacity-0"}`}>
                {children ? children : <h4>{text}</h4>}
            </div>
            {processing && (
                <div className="absolute flex h-full w-full items-center justify-center">
                    <Loader color="#F6D4EA" />
                </div>
            )}
        </Link>
    );
}
