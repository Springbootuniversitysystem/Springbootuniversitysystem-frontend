const API_URL = "http://localhost:8085/api/v1/programmes";

export async function getProgrammeCareers(programmeId) {
    const response = await fetch(
        `${API_URL}/${programmeId}/careers`
    );

    if (!response.ok) {
        throw new Error("Failed to load careers");
    }

    const data = await response.json();

    return data.data;
}