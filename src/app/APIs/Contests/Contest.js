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

// Get a single contest by ID
export const getContestById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/contests/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // Extract single contest data from the response
    return data.success ? data.data : null; // Assuming contest data is inside `data`
  } catch (error) {
    console.error("Error fetching contest by ID:", error);
    return null; // Return null on error
  }
};

// Create a new contest
export const createContest = async (contestData) => {
  try {
    const response = await fetch(`${BASE_URL}/contests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contestData),
    });
    const data = await response.json();
    // Handle the response from creating a new contest
    return data.success ? data.data : null; // Assuming the new contest data is inside `data`
  } catch (error) {
    console.error("Error creating contest:", error);
    return null; // Return null on error
  }
};

// Update an existing contest
export const updateContest = async (id, contestData) => {
  try {
    const response = await fetch(`${BASE_URL}/contests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contestData),
    });
    const data = await response.json();
    // Handle the response from updating the contest
    return data.success ? data.data : null; // Assuming the updated contest data is inside `data`
  } catch (error) {
    console.error("Error updating contest:", error);
    return null; // Return null on error
  }
};
