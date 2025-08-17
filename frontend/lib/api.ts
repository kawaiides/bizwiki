import axios from 'axios';

// Create an Axios instance with the base URL from our environment variables.
// This makes it easy to call our backend endpoints without repeating the URL.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;