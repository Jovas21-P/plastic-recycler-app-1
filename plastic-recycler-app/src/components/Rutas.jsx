import { Route, Routes, Link } from "react-router-dom"
import App from "../App.jsx"
import "../css/nav.css"
import Cart from "../Pages/Cart.jsx"
import Login from "../Pages/Login.jsx"
import Register from "../Pages/Register.jsx"
import Porfile from "../Pages/Porfile.jsx"
import { useAuth } from "./UserContext.jsx"
import QuienesSomos from "../Pages/QuienesSomos.jsx"
import Inicio from "../Inicio.jsx"
import Servicios from "../Pages/Servicios.jsx"
import Pedido from "../Pages/Pedido.jsx"
import Ubicacion from "../Pages/Ubicacion.jsx"
export function Navbar({ activeHome, activeAbout, activeProducts }) {
  const { user } = useAuth();  // <-- obtenemos el usuario

  return (
    <section className="navbar-div position-fixed z-1 w-100 top-0">
      {/* Links de navegación */}
      <div className="links">
        <ul className="nav nav-underline mb-0">
          <li className="nav-item">
            <Link className={`nav-link ${activeHome}`} to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeAbout}`} to="/quienes-somos">Quienes Somos</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeProducts}`} to="/products">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeProducts}`} to="/servicios">Servicios</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeProducts}`} to="/ubicacion">Ubicacion</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeProducts}`} to="/pedido">Pedido</Link>
          </li>
          
        </ul>
      </div>

      {/* Barra de búsqueda que se expande */}
      <div className="search flex-grow-1 mx-3">
       
      </div>

      <div className="" style={{marginRight: "20px"}}>
        {user ? (
          <Link to="/profile" className="user-info">
            <i className="bi bi-person-circle"></i>
          </Link>
        ) : (
          <Link to="/login">
            <i className="bi bi-person-circle"></i>
          </Link>
        )}
      </div>

    </section>
  );
}


export function Rutas() {
    return (
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
            <Route path="/products" element={<App />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Porfile></Porfile>}></Route>
            <Route path="/quienes-somos" element={<QuienesSomos />}></Route>
            <Route path="/servicios" element={<Servicios />}></Route>
            <Route path="/ubicacion" element={<Ubicacion />}></Route>
            <Route path="/pedido" element={<Pedido />}></Route>
        </Routes>
    )
}