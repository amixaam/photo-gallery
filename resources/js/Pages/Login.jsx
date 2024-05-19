import { useForm } from "@inertiajs/inertia-react";
import MainLayout from "../Layouts/MainLayout";
import GalleryTitle from "../components/GalleryTitle";
import PrimaryButton from "../components/PrimaryButton";
import Loader from "../components/Loader";
import { TextInput } from "../components/TextInput";

export default function Login({ auth }) {
    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        post(route("post.login"));
    }

    const {
        data,
        setData,
        post,
        // delete: destroy, // way of setting these function with different names
        processing,
        reset,
        errors,
    } = useForm({
        username: "",
        password: "",
    });

    return (
        <MainLayout auth={auth.user} margins={false}>
            <div className="flex flex-col min-h-screen justify-center items-center gap-8">
                <GalleryTitle />
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <TextInput
                        type="text"
                        name="username"
                        onchange={changeHandler}
                        error={errors.username || errors.error}
                    />
                    <TextInput
                        type="password"
                        name="password"
                        onchange={changeHandler}
                        error={errors.password || errors.error}
                    />
                    <PrimaryButton
                        text="Login"
                        onClick={() => {}}
                        processing={processing}
                    />
                </form>
            </div>
        </MainLayout>
    );
}
