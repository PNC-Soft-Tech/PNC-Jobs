// src/APIs/jobCirculars.js

const BASE_URL = 'https://pnc-jobs-server.vercel.app/api/v1'; // Your API base URL

// Fetch all job circulars
export const getAllJobCirculars = async () => {
  try {
    const response = await fetch(`${BASE_URL}/job-circulars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (result.success) {
      return result.data; // Return the data if the request was successful
    } else {
      console.error('Failed to fetch job circulars:', result.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching job circulars:', error);
    return []; // Return an empty array in case of error
  }
};

// You can add other API functions like create, update, delete, etc., here if needed.
