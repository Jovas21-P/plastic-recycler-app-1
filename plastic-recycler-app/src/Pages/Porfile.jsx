import { Navbar } from "../components/Rutas.jsx";
import { useAuth } from "../components/UserContext.jsx";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACK_URL
function Porfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div><h2>No hay usuario logueado</h2></div>;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch(`${url}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null); // Limpias el usuario del contexto
        navigate("/login"); // Rediriges a login (opcional)
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="container-fluid d-flex flex-column align-items-center" style={{ marginTop: "90px" }}>
        <div className="">
        <h1>Bienvenido {user.nombres}</h1>
        
        <p><strong>Correo:</strong> {user.username}</p>
        {/* No mostrar contraseña por seguridad */}
        

      </div>
      <div className="bton-div d-flex justify-content-center">
        <button className="btn btn-danger mt-4 " onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
      </div>
    </>
  );
}

export default Porfile;
