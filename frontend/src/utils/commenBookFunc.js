export async function fetchRequestNoRes(url, method, data) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;  
    }
};

export const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); 
    return date;
}; 

export function formatLocalDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
        day: "2-digit", 
        month: "2-digit" 
    }).slice(0,5);
}

export function formatLocalDateWithYear(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
        day: "2-digit", 
        month: "2-digit",
        year:  "numeric",
    });
}

