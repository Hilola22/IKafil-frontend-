import axios from "axios";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export const api = axios.create({
  baseURL: "https://api.ikafil.uz/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        if (!newAccessToken) throw new Error("Yangi access token topilmadi!");

        document.cookie = `accessToken=${encodeURIComponent(
          newAccessToken
        )}; path=/; max-age=${5 * 60 * 60}; SameSite=Lax`;

        onRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token yangilanishi muvaffaqiyatsiz:", err);
        document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax"; 
        window.location.href = "/auth/signin";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
