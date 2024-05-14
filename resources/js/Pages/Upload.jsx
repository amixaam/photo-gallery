import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { useDropzone } from "react-dropzone";
import { TextInput } from "../components/TextInput";

export default function Dashboard({ auth }) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file) => (
        <li key={file.path} className="text-text">
            {file.path} - {file.size} bytes
        </li>
    ));
    return (
        <MainLayout auth={auth}>
            <main className="mx-8 pt-24 sm:pt-24 sm:mx-24 flex flex-col gap-6">
                <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                    Upload
                </h1>
                <section
                    className={`bg-footer ${acceptedFiles.length ? "h-20" : "h-[47rem]"} border-text50 border-2 border-dashed rounded-3xl py-12 transition-all duration-500 ease-in-out`}
                >
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className=" h-full rounded-3xl flex flex-col justify-center items-center gap-2"
                    >
                        <input {...getInputProps()} />
                        <img
                            src="/images/upload.svg"
                            alt="upload icon"
                            className="size-8 "
                        />
                        <p className="text-text">
                            Drag and drop or select images here!
                        </p>
                    </div>
                </section>
                {acceptedFiles.length && (
                    <div className="">
                        <TextInput name="Add to collection" />
                    </div>
                )}
                <div>
                    <h4
                        className={`${acceptedFiles.length ? "" : "hidden"} text-text`}
                    >
                        Files
                    </h4>
                    <ul>{files}</ul>
                </div>
                {/* <Link href={route("logout")}>Logout</Link> */}
            </main>
        </MainLayout>
    );
}
