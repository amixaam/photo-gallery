import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";

export default function EditCollection({ auth }) {
    return (
        <MainLayout auth={auth}>
            <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                Edit Collections
            </h1>

            <main className="flex flex-row gap-4"></main>
        </MainLayout>
    );
}
