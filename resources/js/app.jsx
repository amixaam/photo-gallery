import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "react-hot-toast";

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <Toaster
                    position="bottom-center"
                    containerStyle={{ bottom: 0, left: 0, right: 0 }}
                    gutter={0}
                />
                <App {...props} />
            </>,
        );
    },
});
