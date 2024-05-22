import React from "react";
import MainLayout from "../Layouts/MainLayout";

export default function EditCollection({ auth }) {
    return (
        <MainLayout auth={auth}>
            <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                Edit Collections
            </h1>

            <main className="flex flex-row gap-4"></main>
        </MainLayout>
    );
}
