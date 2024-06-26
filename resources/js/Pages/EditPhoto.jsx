import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { useForm } from "@inertiajs/inertia-react";

function EditPhoto({ image, auth }) {
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            title: image.title,
            alt_text: image.alt_text,
            location: image.location,
            time: image.time,
        });

    function SubmitHandler(e) {
        e.preventDefault();
        console.log("Submitted!");
    }

    return (
        <MainLayout auth={auth}>
            <div className="grid grid-cols-[1fr_2fr] gap-8">
                <img
                    src={`/storage/${image.path}`}
                    alt={image.alt_text}
                    className="max-h-full max-w-full rounded-3xl"
                />
                <div className="">
                    <code className="bg-black text-text">
                        {JSON.stringify(data)}
                    </code>
                    <h3 className="text-text">Edit {image.title}</h3>
                    <form onSubmit={SubmitHandler}>
                        <p className="text-text">TODO: DESIGN FORM IN FIGMA</p>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default EditPhoto;
