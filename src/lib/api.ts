/**
 * Get the API base URL
 * Handles both localhost and network IP access
 */
export const getApiUrl = (): string => {
  // Get the current hostname and port
  const { hostname, port } = window.location;
  
  // If already on localhost or 127.0.0.1, use port 5000
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // For network IPs, replace the port with 5000 and keep the same IP
  return `http://${hostname}:5000`;
};

/**
 * Fetch user profile from backend
 */
export const fetchUserProfile = async (userId: string) => {
  const response = await fetch(`${getApiUrl()}/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("pp_token") || ""}`
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  
  return response.json();
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, profileData: any) => {
  const response = await fetch(`${getApiUrl()}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("pp_token") || ""}`
    },
    body: JSON.stringify(profileData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  
  return response.json();
};
