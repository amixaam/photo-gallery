import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import { TextInput } from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { Toast } from "../components/Toast";
import { Truncate } from "../utils/Truncate";
import toast from "react-hot-toast";
import Header from "../components/Header";
import { SmallCollectionCard } from "../components/SmallCollectionCard";

function EditPhoto({ image, auth }) {
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            title: image.title,
            alt_text: image.alt_text,
            location: image.location,
            time: image.time,
        });

    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

    function SubmitHandler(e) {
        e.preventDefault();
        patch(route("photo.update", image.id));
    }

    if (recentlySuccessful) {
        toast.custom((t) => <Toast t={t} text="Image saved successfully!" />);
    }

    return (
        <>
            <MainLayout auth={auth} admin={true}>
                <div className="flex flex-col gap-[inherit]">
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
                    <div className="flex w-full flex-col gap-8">
                        <h3 className="text-text">Collections</h3>
                        <div className="w-full overflow-x-scroll">
                            <div className="relative flex w-max flex-row gap-4">
                                {image.collection.map((collection) => (
                                    <SmallCollectionCard
                                        key={collection.id}
                                        collection={collection}
                                        href={route(
                                            "gallery.edit",
                                            collection.slug,
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default EditPhoto;
