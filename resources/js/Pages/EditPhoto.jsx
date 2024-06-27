import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import { TextInput } from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { Toast } from "../components/Toast";
import { Truncate } from "../utils/Truncate";

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

    return (
        <>
            <Toast show={recentlySuccessful} text="Image saved successfully!" />
            <MainLayout auth={auth}>
                <div className="flex flex-1 flex-col gap-8 pb-app lg:gap-[inherit]">
                    <h1 className="special-text hidden text-6xl drop-shadow-md lg:block">
                        Edit {Truncate(image.title, 16)}
                    </h1>
                    <h1 className="special-text text-6xl drop-shadow-md lg:hidden">
                        Edit
                    </h1>

                    <div className="grid flex-1 gap-[inherit] lg:grid-cols-[1.5fr_2fr]">
                        {/* image */}
                        <div
                            className="hidden h-full w-full rounded-3xl bg-cover bg-center lg:block"
                            style={{
                                backgroundImage: `url("/storage/${image.path}")`,
                            }}
                        ></div>

                        {/* collections & form */}
                        <div className="flex flex-1 flex-col justify-between gap-8">
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
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h3 className="text-text">Collections</h3>
                                    <p className="text-text">
                                        This image shows up in these collections
                                    </p>
                                </div>
                                <div className="flex flex-row flex-nowrap gap-8">
                                    {image.collection.map((collection) => (
                                        <Link
                                            href={route(
                                                "gallery",
                                                collection.slug,
                                            )}
                                            className="group flex h-64 flex-col gap-4"
                                            key={collection.id}
                                        >
                                            <div
                                                className="aspect-square  h-full rounded-3xl bg-cover bg-center transition-all duration-200 group-hover:scale-[1.01]  group-hover:brightness-105"
                                                style={{
                                                    backgroundImage: `url("/storage/${collection.cover_path}")`,
                                                }}
                                            ></div>
                                            <div className="flex w-fit flex-row items-center gap-2 transition-all duration-200 group-hover:-translate-y-1">
                                                <img
                                                    src="/images/star.svg"
                                                    alt=""
                                                    className="scale-90 select-none"
                                                />
                                                <p className="text-text">
                                                    {collection.title}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default EditPhoto;
