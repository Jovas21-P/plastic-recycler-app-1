import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar sesión al iniciar app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error al verificar sesión", err);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
