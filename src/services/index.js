import axios from "axios";

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}api/`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
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
  const authSignUp = async (body) => api.post("auth/register", body);

  /*=== GET REQUEST ===*/
  const updateProfile = async ({ id, body }) =>
    api.put(`auth/update/${id}`, body);

  return {
    authLogin,
    authSignUp,
    authLogout,
    updateProfile,
  };
};

const apis = createBackendServer('http://localhost:3000/')

export default apis;
