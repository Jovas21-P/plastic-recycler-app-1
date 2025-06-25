import { Navbar } from "../components/Rutas.jsx";
import { useAuth } from "../components/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Porfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div><h2>No hay usuario logueado</h2></div>;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
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
        <h1>Bienvenido, {user.nombres}</h1>
        <p><strong>Nombres:</strong> {user.nombres}</p>
        <p><strong>Apellidos:</strong> {user.apellidos}</p>
        <p><strong>Correo:</strong> {user.username}</p>
        {/* No mostrar contraseña por seguridad */}
        <p><strong>Dirección:</strong> {user.direccion}</p>
        <p><strong>Ciudad:</strong> {user.ciudad}</p>
        <p><strong>Estado:</strong> {user.estado}</p>
        <p><strong>Código Postal:</strong> {user.codigoPostal}</p>

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
