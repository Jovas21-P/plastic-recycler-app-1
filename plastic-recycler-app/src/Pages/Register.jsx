import { Navbar } from '../components/Rutas';
import { Link } from 'react-router-dom';
import { Label } from '../components/Formulario';

function Register() {

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const correo = form.correo.value;
  const contra = form.contra.value;

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: correo,   // si tu backend espera username para correo
        password: contra  // si tu backend espera password para contraseña
      })
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Usuario registrado",
        icon: "success"
      });
      // opcional: redirigir al login
      // window.location.href = "/login";
    } else {
      Swal.fire({
        title: data.message || "Error al registrar usuario",
        icon: "error"
      });
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};


  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container-fluid">
        <section className='div-card d-flex flex-column align-items-center'>
          <div className="title text-center d-flex justify-content-center w-100 p-5">
            <h1 className='w-50'>Formulario de Registro</h1>
          </div>

          <form onSubmit={handleSubmit} className='w-50 mt-3'>
            <Label labelText="Correo" name="correo" placeholderText="Ingrese su correo" type="email" />
            <Label labelText="Contraseña" name="contra" placeholderText="Ingrese su contraseña" type="password" />

            <div className="btn-div mb-5 d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="btn btn-primary w-25">Registrarse</button>
              <Link className='mt-3' to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;
