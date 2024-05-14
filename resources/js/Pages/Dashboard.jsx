import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";

export default function Dashboard({ auth }) {
    return (
        <MainLayout auth={auth}>
            <main className="mx-8 pt-24 sm:pt-24 sm:mx-24 flex flex-col gap-6">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                        Dashboard
                    </h1>
                    <PrimaryButton text="Upload" href={route("upload")} />
                </div>

                <PrimaryButton
                    text="Logout"
                    href={route("logout")}
                    style="w-fit"
                />
            </main>
        </MainLayout>
    );
}
