import { useForm } from "@inertiajs/inertia-react";
import MainLayout from "../Layouts/MainLayout";
import GalleryTitle from "../components/GalleryTitle";
import PrimaryButton from "../components/PrimaryButton";
import Loader from "../components/Loader";

export default function Login() {
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
        <MainLayout>
            <div className="flex flex-col min-h-screen justify-center items-center gap-8">
                <GalleryTitle />
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <TextInput
                        type="text"
                        name="username"
                        onchange={changeHandler}
                        error={errors.username}
                    />
                    <TextInput
                        type="password"
                        name="password"
                        onchange={changeHandler}
                        error={errors.password}
                    />
                    <PrimaryButton
                        text="Login"
                        type="button"
                        processing={processing}
                    />
                </form>
            </div>
        </MainLayout>
    );
}

const TextInput = ({
    type = "text",
    name = "Input",
    onchange = () => {},
    error = "",
}) => {
    return (
        <label className="flex flex-col">
            <input
                type={type}
                name={name}
                placeholder={name}
                onChange={onchange}
                className={`px-4 py-2 rounded-md text-text font-medium
                    ${error ? "bg-error20 placeholder-error" : "bg-secondary20 placeholder-text50"}
                    `}
            />
            {error && <p className="text-error">{error}</p>}
        </label>
    );
};
