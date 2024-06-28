import React from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import { SecondaryButton } from "../components/SecondaryButton";
import { useForm } from "@inertiajs/inertia-react";
import { TextInput } from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import toast from "react-hot-toast";
import { Toast } from "../components/Toast";

export default function EditProfile({ auth }) {
    const {
        data: usernameData,
        setData: setUsername,
        patch: patchUsername,
        errors: errorsUsername,
        processing: processingUsername,
        reset: resetUsername,
    } = useForm({
        username: "",
    });
    const {
        data: passwordData,
        setData: setPassword,
        patch: patchPassword,
        errors: errorsPassword,
        processing: processingPassword,
        reset: resetPassword,
    } = useForm({
        current_password: "",
        new_password: "",
    });

    const ChangeUsername = (e) => {
        e.preventDefault();
        patchUsername(route("user.update.username"), {
            onSuccess: () => {
                resetUsername();
                toast.custom((t) => (
                    <Toast t={t} text="Username changed successfully!" />
                ));
            },
        });
    };

    const ChangePassword = (e) => {
        e.preventDefault();
        patchPassword(route("user.update.password"), {
            onSuccess: () => {
                resetPassword();
                toast.custom((t) => (
                    <Toast t={t} text="Password changed successfully!" />
                ));
            },
        });
    };

    return (
        <MainLayout auth={auth} admin={true}>
            <Header
                title="Edit profile"
                back={true}
            />
            <main className="flex flex-col gap-[inherit]">
                <section className="flex flex-col gap-4">
                    <h3>Change username</h3>
                    <form
                        onSubmit={ChangeUsername}
                        className="flex flex-col gap-4"
                    >
                        <TextInput
                            name="username"
                            value={usernameData.username}
                            onchange={(e) =>
                                setUsername("username", e.target.value)
                            }
                            error={errorsUsername.username}
                        />
                        <PrimaryButton
                            text="Save"
                            onClick={() => {}}
                            style="w-fit"
                            processing={processingUsername}
                        />
                    </form>
                </section>
                <section className="flex flex-col gap-4">
                    <h3>Change password</h3>
                    <form
                        onSubmit={ChangePassword}
                        className="flex flex-col gap-4"
                    >
                        <TextInput
                            type="password"
                            name="current_password"
                            value={passwordData.current_password}
                            onchange={(e) =>
                                setPassword("current_password", e.target.value)
                            }
                            error={errorsPassword.current_password}
                        />
                        <TextInput
                            type="password"
                            name="new_password"
                            value={passwordData.new_password}
                            onchange={(e) =>
                                setPassword("new_password", e.target.value)
                            }
                            error={errorsPassword.new_password}
                        />
                        <PrimaryButton
                            text="Save"
                            onClick={() => {}}
                            style="w-fit"
                            processing={processingPassword}
                        />
                    </form>
                </section>
            </main>
        </MainLayout>
    );
}
