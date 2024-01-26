import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}api/`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    timeout: 60 * 1000,
  });

  /*=== INTERCEPTOR ===*/
  // checkpoint
  //let successful responses pass through
  // and handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;
      if (error?.response?.data?.errors)
        error.errors = error?.response?.data?.errors;
      return Promise.reject(error);
    }
  );

  /*=== POST REQUEST ===*/
  const authLogin = async (body) => api.post("auth/login", body);
  const authLogout = async () => api.post("auth/logout");
  const authSignup = async (body) => api.post("auth/register", body);

  /*=== GET REQUEST ===*/
  const updateProfile = async ({ body }) => api.put("auth/update", body);

  return {
    authLogin,
    authSignup,
    authLogout,
    updateProfile,
  };
};

const apis = createBackendServer(BASE_URL);

export default apis;
