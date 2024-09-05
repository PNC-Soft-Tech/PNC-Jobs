// api/contest.js

const BASE_URL = "https://pnc-jobs-server.vercel.app/api/v1"; // Your API base URL

// Get all contests
export const getAllContests = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // Extract contests array from the response
    return data.success ? data.data : []; // Assuming contests are inside `data`
  } catch (error) {
    console.error("Error fetching contests:", error);
    return []; // Return an empty array on error
  }
};
