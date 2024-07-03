import React from "react";

function Loader({ style, color = "#541B40" }) {
    return (
        <div className={`${style} loader relative h-5 w-[1.7rem] -skew-x-3`}>
            <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                className="absolute"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.30504 0.851868C8.35245 0.644693 8.64755 0.644693 8.69496 0.851868L10.2776 7.76718C10.2934 7.83626 10.3446 7.89182 10.4122 7.91322L16.3981 9.80934C16.5842 9.8683 16.5842 10.1317 16.3981 10.1907L10.4122 12.0868C10.3446 12.1082 10.2934 12.1637 10.2776 12.2328L8.69496 19.1481C8.64755 19.3553 8.35245 19.3553 8.30504 19.1481L6.7224 12.2328C6.70659 12.1637 6.65539 12.1082 6.58783 12.0868L0.601912 10.1907C0.415772 10.1317 0.415772 9.8683 0.601912 9.80934L6.58783 7.91322C6.65539 7.89182 6.70659 7.83626 6.7224 7.76718L8.30504 0.851868Z"
                    fill={color}
                />
            </svg>
            <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                className="absolute right-0 top-[-1px]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4.85378 0.638902C4.88934 0.483521 5.11066 0.48352 5.14622 0.638901L6.04152 4.55089C6.05338 4.6027 6.09177 4.64437 6.14244 4.66042L9.54857 5.73936C9.68817 5.78358 9.68817 5.98113 9.54857 6.02535L6.14244 7.10428C6.09177 7.12033 6.05338 7.162 6.04152 7.21382L5.14622 11.1258C5.11066 11.2812 4.88934 11.2812 4.85378 11.1258L3.95848 7.21382C3.94662 7.162 3.90823 7.12033 3.85756 7.10428L0.451434 6.02535C0.311829 5.98113 0.311829 5.78358 0.451434 5.73936L3.85756 4.66042C3.90823 4.64437 3.94662 4.6027 3.95848 4.55089L4.85378 0.638902Z"
                    fill={color}
                />
            </svg>
            <svg
                width="5"
                height="6"
                viewBox="0 0 5 6"
                fill="none"
                className="absolute bottom-[0px] right-[23%] scale-110"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2.40252 0.425935C2.42623 0.322347 2.57377 0.322347 2.59748 0.425934L3.01757 2.26151C3.02548 2.29605 3.05107 2.32383 3.08485 2.33453L4.69904 2.84584C4.79211 2.87533 4.79211 3.00703 4.69904 3.03651L3.08485 3.54782C3.05107 3.55852 3.02548 3.5863 3.01757 3.62085L2.59748 5.45642C2.57377 5.56001 2.42623 5.56001 2.40252 5.45642L1.98243 3.62085C1.97452 3.5863 1.94893 3.55852 1.91515 3.54782L0.300956 3.03651C0.207886 3.00703 0.207886 2.87533 0.300956 2.84584L1.91515 2.33453C1.94893 2.32383 1.97452 2.29605 1.98243 2.26151L2.40252 0.425935Z"
                    fill={color}
                />
            </svg>
        </div>
    );
}

export default Loader;
