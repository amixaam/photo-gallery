import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainPage from "./Pages/Main";
import GalleryPage from "./Pages/Gallery";
import Modal from "react-modal";
import Admin from "./Pages/Admin";
import UhOh from "./Pages/UhOh";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top on route change
    }, [location.pathname]); // Trigger effect when the pathname changes

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/UhOh" element={<UhOh />} />
        </Routes>
    );
};

const root = createRoot(document.getElementById("root"));
const rootElement = document.getElementById("root");
Modal.setAppElement(rootElement);

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
