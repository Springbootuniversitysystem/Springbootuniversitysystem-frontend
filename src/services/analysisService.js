const API_URL = "http://localhost:8085/api/v1/programmes/qualified";

export async function analyseMarks(payload) {

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}