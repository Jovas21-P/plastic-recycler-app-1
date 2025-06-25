// src/api/auth.js
const urlBackend = import.meta.env.VITE_BACK_URL
export const checkSession = async () => {
  try {
    const response = await fetch(`${urlBackend}/me`, {
      credentials: "include",
      });

    if (!response.ok) return false;

    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    return false;
  }
};
