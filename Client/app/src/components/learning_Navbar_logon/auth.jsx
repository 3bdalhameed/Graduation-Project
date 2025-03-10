// src/utils/auth.js
export const checkAuthentication = async () => {
    try {
        const response = await fetch("/api/check-authentication/");
        const data = await response.json();
        return data.authenticated;
    } catch (error) {
        console.error("Authentication check failed:", error);
        return false;
    }
};
