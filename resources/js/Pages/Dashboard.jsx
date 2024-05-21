import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";

export default function Dashboard({ auth }) {
    return (
        <MainLayout auth={auth}>
            <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                Dashboard
            </h1>

            <main className="flex flex-row gap-4">
                <PrimaryButton
                    text="Upload"
                    href={route("upload")}
                    style="w-fit"
                />
                <PrimaryButton
                    text="Collections"
                    href={route("edit-collections")}
                    style="w-fit"
                />
                <PrimaryButton
                    text="Logout"
                    href={route("logout")}
                    style="w-fit"
                />
            </main>
        </MainLayout>
    );
}
