import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import { SecondaryButton } from "../components/SecondaryButton";
import { TextInput } from "../components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import Select from "react-select";
import { SmallCollectionCard } from "../components/SmallCollectionCard";

const selectOptions = [
    { value: "all", label: "All" },
    { value: "public", label: "Public" },
    { value: "featured", label: "Pinned" },
    { value: "private", label: "Private" },
];

export default function Dashboard({
    auth,
    collections: unmodifiedCollections,
}) {
    const [collections, setCollections] = useState(unmodifiedCollections);
    const { data, setData } = useForm({
        search: "",
        select: "all",
    });

    useEffect(() => {
        const filteredCollections = unmodifiedCollections.filter(
            (collection) => {
                const matchesSearch =
                    data.search === "" ||
                    collection.title
                        .toLowerCase()
                        .includes(data.search.toLowerCase());
                const matchesSelect =
                    data.select === "all" ||
                    (data.select === "public" && collection.is_public) ||
                    (data.select === "private" && !collection.is_public) ||
                    (data.select === "featured" && collection.is_featured);

                return matchesSearch && matchesSelect;
            },
        );

        setCollections(filteredCollections);
    }, [data, unmodifiedCollections]);

    return (
        <MainLayout auth={auth} admin={true}>
            <Header title="Dashboard" />
            <main className="flex flex-col gap-[inherit]">
                <section className="flex flex-col gap-4">
                    <h3>Upload</h3>
                    <div className="flex flex-row gap-4">
                        <SecondaryButton as="link" href={route("upload")}>
                            <p>Upload</p>
                            <img src="/images/upload.svg" alt="redirect icon" />
                        </SecondaryButton>
                    </div>
                </section>
                <section className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h3>Collections</h3>
                        <div className="flex flex-row gap-4">
                            <TextInput
                                name="search"
                                value={data.search}
                                onchange={(e) =>
                                    setData("search", e.target.value)
                                }
                                icon={"search"}
                            />
                            <Select
                                className="creatable"
                                classNamePrefix="creatable"
                                defaultValue={selectOptions[0]}
                                isSearchable={true}
                                name="select"
                                onChange={(e) => setData("select", e.value)}
                                options={selectOptions}
                            />
                        </div>
                    </div>
                    <div className="relative w-full overflow-x-scroll">
                        <div className="relative flex w-max flex-row gap-4">
                            {collections.map((collection) => (
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
                </section>

                <section className="flex flex-col gap-4">
                    <h3>Settings</h3>
                    <div className="flex flex-row gap-4">
                        <SecondaryButton
                            text="Edit profile"
                            as="link"
                            href={route("user.edit")}
                        />
                        <SecondaryButton as="link" href={route("logout")}>
                            <p>Logout</p>
                            <img
                                src="/images/redirect.svg"
                                alt="redirect icon"
                            />
                        </SecondaryButton>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}

export const Icon = ({ show, icon }) => {
    if (!show) return null;

    return <img src={icon} alt={`${icon} icon`} className="size-6" />;
};
