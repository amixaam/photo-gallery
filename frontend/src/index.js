import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client"; // Updated import
import ReactDOM from "react-dom";
import "./index.css";
import MainPage from "./Pages/Main";
import GalleryPage from "./Pages/Gallery";
import Modal from "react-modal";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
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
