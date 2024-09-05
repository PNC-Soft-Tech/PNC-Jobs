// api/model.js

const BASE_URL = "https://pnc-jobs-server.vercel.app/api/v1"; // Your API base URL

// Create a new model
export const createModel = async (modelData) => {
  const response = await fetch(`${BASE_URL}/models`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modelData),
  });
  return response.json();
};

// Update an existing model
export const updateModel = async (modelId, modelData) => {
  const response = await fetch(`${BASE_URL}/models/${modelId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modelData),
  });
  return response.json();
};

// Get all models
export const getAllModels = async () => {
  try {
    const response = await fetch(`${BASE_URL}/models`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.success ? data.data : []; // Assuming models are inside `data`
  } catch (error) {
    console.error("Error fetching models:", error);
    return []; // Return an empty array on error
  }
};

// Get a single model by name
export const getModelByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/models/name/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.success ? data.data : null; // Assuming model data is inside `data`
  } catch (error) {
    console.error("Error fetching model by name:", error);
    return null; // Return null on error
  }
};

// Get a single model by ID
export const getModelById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/models/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.success ? data.data : null; // Assuming model data is inside `data`
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    return null; // Return null on error
  }
};
