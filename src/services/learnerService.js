const API_URL = "http://localhost:8085/api/v1/learners/profile";

export async function getProfile() {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load profile");
    }

    return data;
}

export async function updateProfile(id, profile) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:8085/api/v1/learners/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profile),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
    }

    return data;
}