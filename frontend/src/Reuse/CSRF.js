async function CSRF() {
    try {
        const response = await fetch("http://127.0.0.1:8000/", {
            method: "GET",
            credentials: "include",
        });

        return await response.text();
    } catch (error) {
        console.error("Error fetching CSRF token:", error);
    }
}

export default CSRF;
