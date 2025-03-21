
// import axios from "axios";

// const API_URL = "http://localhost:5000/api"; // Update this if needed

// // Fetch all sectors
// export const fetchSectors = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/sectors`);
//     console.log("Fetched Sectors:", response.data); // ✅ Debugging log
//     return response.data; // Return only data
//   } catch (error) {
//     console.error("Error fetching sectors:", error);
//     throw error; // Rethrow for UI handling
//   }
// };

// // Fetch sector-specific data entries
// export const fetchSectorData = async (sectorId) => {
//   try {
//     const response = await axios.get(`${API_URL}/entries/${sectorId}`);
//     console.log("Fetched Sector Data:", response.data); // ✅ Debugging log
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching sector data:", error);
//     throw error;
//   }
// };

// // Submit new entry for a sector
// export const submitEntry = async (data) => {
//   try {
//     const response = await axios.post(`${API_URL}/entries`, data);
//     console.log("Entry Submitted:", response.data); // ✅ Debugging log
//     return response.data;
//   } catch (error) {
//     console.error("Error submitting entry:", error);
//     throw error;
//   }
// };
 

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update this if needed

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Helper function to get token
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// User Authentication APIs
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/users/register", payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data.message || "Something went wrong" };
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/users/login", payload);
    console.log("Login Response:", response.data);  // ✅ Debugging Log
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data?.message || error.message);  // ✅ Debugging Log
    return { success: false, message: error.response?.data.message || "Something went wrong" };
  }
};


export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/get-current-user", getAuthHeaders());
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data.message || "Something went wrong" };
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/get-users", getAuthHeaders());
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data.message || "Something went wrong" };
  }
};

// Sector-Based APIs with Authentication
export const fetchSectors = async () => {
  try {
    const response = await axiosInstance.get("/sectors", getAuthHeaders());
    console.log("Fetched Sectors:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sectors:", error);
    throw error;
  }
};

// export const fetchSectorData = async (sectorId) => {
//   try {
//     const response = await axiosInstance.get(`/entries/${sectorId}`, getAuthHeaders());
//     console.log("Fetched Sector Data:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching sector data:", error);
//     throw error;
//   }
// };

export const fetchEntriesBySector = async (sectorId) => {
  try {
    console.log("Fetching entries for sector:", sectorId); // ✅ Debugging log
    const response = await axiosInstance.get(`/entries/${sectorId}`, getAuthHeaders());
    console.log("Fetched Entries Data:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching sector entries:", error.response?.data || error);
    throw error;
  }
};


export const submitEntry = async (data) => {
  try {
    console.log("📤 Submitting Entry:", data); // ✅ Debugging log
    const response = await axiosInstance.post("/entries", data, getAuthHeaders());
    console.log("✅ Entry Submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error submitting entry:", error.response?.data || error);
    throw error;
  }
};

// 🟢 Export APIs (Excel & PDF)
export const exportEntries = async (sectorId, format) => {
  try {
    console.log(`📤 Exporting ${format.toUpperCase()} for sector:`, sectorId); // ✅ Debugging log

    const response = await axiosInstance.get(`/export/${format}/${sectorId}`, {
      ...getAuthHeaders(),
      responseType: "blob", // Important for file downloads
    });

    return response.data; // Return blob data
  } catch (error) {
    console.error(`❌ Error exporting ${format.toUpperCase()}:`, error.response?.data || error);
    throw error;
  }
};