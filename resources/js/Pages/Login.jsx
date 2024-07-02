import { useForm } from "@inertiajs/inertia-react";
import MainLayout from "../Layouts/MainLayout";
import GalleryTitle from "../components/GalleryTitle";
import PrimaryButton from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";
import { motion } from "framer-motion";
import { container, revealItem } from "../utils/FramerVariants";
export default function Login({ auth }) {
    function changeHandler(e) {
        setData(e.target.name, e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        post(route("post.login"));
    }

    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    return (
        <MainLayout auth={auth.user} margins={false}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex min-h-screen flex-col items-center justify-center gap-8"
            >
                <motion.div variants={revealItem}>
                    <GalleryTitle />
                </motion.div>
                <motion.form variants={revealItem} onSubmit={submitHandler} className="flex flex-col gap-4">
                    <TextInput
                        type="text"
                        name="username"
                        value={data.username}
                        onchange={changeHandler}
                        error={errors.username || errors.error}
                    />
                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        onchange={changeHandler}
                        error={errors.password || errors.error}
                    />
                    <PrimaryButton
                        text="Login"
                        onClick={() => {}}
                        processing={processing}
                    />
                </motion.form>
            </motion.div>
        </MainLayout>
    );
}
