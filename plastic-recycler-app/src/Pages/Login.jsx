import { Navbar } from '../components/Rutas';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../components/Formulario';
import { useAuth } from '../components/UserContext.jsx';  // importa el contexto

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();  // extraemos setUser para actualizar el usuario

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const correo = form.correo.value;
    const contra = form.contra.value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: correo,
          password: contra
        })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
        title: "Inicio de sesión exitoso",
        icon: "success"
        });
        setUser(data.user);  // actualizamos el contexto con la info del usuario
        console.log(data);
        navigate('/'); // o redirige a la página que quieras
      } else {
        Swal.fire({
        title: "Credenciales incorrectas",
        icon: "error"
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container-fluid">
        <section className="div-card d-flex flex-column align-items-center">
          <div className="title text-center w-100 d-flex justify-content-center" >
            <h1 className="text-center w-50">Iniciar sesión</h1>
          </div>

          <form onSubmit={handleSubmit} className="w-50">
            <Label
              labelText="Correo"
              name="correo"
              placeholderText="Ingrese su correo"
              type="email"
            />
            <Label
              labelText="Contraseña"
              name="contra"
              placeholderText="Ingrese su contraseña"
              type="password"
            />

            <div className="btn-div d-flex flex-column justify-content-center align-items-center mb-4">
              <button type="submit" className="btn btn-primary w-25">Iniciar sesión</button>
              <Link className="mt-3" to="/register">¿No tienes una cuenta? Regístrate ahora</Link>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
