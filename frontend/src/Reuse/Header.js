import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

export default function Header({
    onDropdownChange,
    selectedDropdownValue,
    dropdownOptions,
}) {
    const location = useLocation();

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        onDropdownChange(selectedValue);
    };
    const shineClass = location.pathname == "/" ? "shine-light" : "shine-dark";
    return (
        <header>
            <div className="left-side">
                <Link
                    to="/"
                    className={`logo nav-colors text-shine ${shineClass}`}
                >
                    RB
                </Link>
                <Link
                    to="/gallery"
                    className={`nav-button nav-colors text-shine ${shineClass}`}
                >
                    All photos
                </Link>
            </div>
            <div className="right-side">
                {location.pathname === "/gallery" && (
                    <div className="dropdown-container">
                        <select
                            className="flex-selector header-selector"
                            id="selector"
                            onChange={handleDropdownChange}
                            value={selectedDropdownValue}
                        >
                            {dropdownOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </header>
    );
}
