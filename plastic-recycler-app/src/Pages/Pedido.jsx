import { useAuth } from "../components/UserContext";
import { Navbar } from "../components/Rutas";
import { useState } from "react";
const url = import.meta.env.VITE_BACK_URL

function Pedido() {
  const { user } = useAuth(); // Acceso al usuario autenticado
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="alert alert-warning text-center" role="alert">
          ⚠️ Debes <strong>iniciar sesión</strong> para realizar un pedido. <br />
          Por favor, dirígete a la página de inicio de sesión.
        </div>
      </div>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const pedido = {
      tel: form.tel.value,
      nombres: form.nombres.value,
      apellidos: form.apellidos.value,
      direccion: form.direc.value,
      correo: form.correo.value,
      productos: {
        peletizado: Number(form.peletizado.value) || 0,
        compactado: Number(form.compactado.value) || 0,
      },
      userId: user.username,  // o el campo que identifique al usuario en tu contexto
    };

    if (!pedido.tel || !pedido.nombres || !pedido.apellidos || !pedido.direccion || !pedido.correo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor completa todos los campos."
      });
      return;
    }

    try {
      const response = await fetch(`${url}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Pedido enviado",
          text: "Tu pedido fue enviado correctamente."
        });
        form.reset();
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Error enviando el pedido."
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "Intenta de nuevo más tarde."
      });
      console.error(error);
    }
  };

  // Nuevo: función para buscar pedido y rellenar el formulario
  const handleBuscarPedido = async (e) => {
    e.preventDefault();
    const tel = e.target.telBuscar.value.trim();

    if (!tel) {
      Swal.fire({
        icon: "warning",
        title: "Número requerido",
        text: "Por favor ingresa un teléfono para buscar."
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/pedidos/${encodeURIComponent(tel)}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const pedido = await response.json();

        // Rellenar el formulario principal con los datos del pedido
        const form = document.querySelector("form");
        form.tel.value = pedido.tel || "";
        form.nombres.value = pedido.nombres || "";
        form.apellidos.value = pedido.apellidos || "";
        form.direc.value = pedido.direccion || "";
        form.correo.value = pedido.correo || "";
        form.peletizado.value = pedido.productos?.peletizado || 0;
        form.compactado.value = pedido.productos?.compactado || 0;

        Swal.fire({
          icon: "success",
          title: "Pedido encontrado",
          text: "El formulario ha sido rellenado con tu pedido."
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: "info",
          title: "No encontrado",
          text: "No se encontró un pedido con ese teléfono."
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al buscar el pedido."
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "Intenta de nuevo más tarde."
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <div className="row">
          <h2>Pedido</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Datos personales */}
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="tel" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="tel"
                name="tel"
                placeholder="Ingresa tu teléfono"
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="nombres" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                name="nombres"
                placeholder="Ingresa tus nombres"
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="apellidos" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                name="apellidos"
                placeholder="Ingresa tus apellidos"
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="direc" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="direc"
                name="direccion"
                placeholder="Ingresa tu dirección"
              />
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                placeholder="Ingresa tu correo"
              />
            </div>

            {/* Productos */}
            <h3>Productos</h3>
            <div className="accordion" id="accordionExample">
              {/* Peletizado */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePeleti"
                    aria-expanded="false"
                    aria-controls="collapsePeleti"
                  >
                    Bulto de peletizado
                  </button>
                </h2>
                <div
                  id="collapsePeleti"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p className="card-text">
                      <img
                        src="bultoPeletizado.jpeg"
                        alt="Peletizado"
                        width="150"
                        height="150"
                      />
                      <br />
                      Bulto de peletizado (50kg)
                      <br />
                      20$ MXN por kilo
                    </p>
                    <div className="d-flex align-items-center mb-3 productos">
                      <label
                        htmlFor="cantidadPeleti"
                        className="form-label prod"
                      >
                        Cantidad:{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control prod"
                        id="cantidadPeleti"
                        name="peletizado"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Compactado */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseCompa"
                    aria-expanded="false"
                    aria-controls="collapseCompa"
                  >
                    Bulto de compactado
                  </button>
                </h2>
                <div
                  id="collapseCompa"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p className="card-text">
                      <img
                        src="bultoCompactado.jpeg"
                        alt="Compactado"
                        width="150"
                        height="150"
                      />
                      <br />
                      Bulto de compactado (40kg)
                      <br />
                      17$ MXN por kilo
                    </p>
                    <div className="d-flex align-items-center mb-3 productos">
                      <label
                        htmlFor="cantidadCompa"
                        className="form-label prod"
                      >
                        Cantidad:{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control prod"
                        id="cantidadCompa"
                        name="compactado"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón enviar */}
            <div className="col-12 mb-3 boton" style={{ textAlign: "center" }}>
              <button
                type="submit"
                className="btn"
                id="boton"
                style={{
                  backgroundColor: "rgb(33, 182, 13)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "600",
                  minWidth: "120px",
                  marginTop: "1rem",
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </form>

        {/* Formulario para rellenar */}
        <div className="mt-4">
          <p>
            Si ya ha realizado un pedido anteriormente, ingrese su número y haga
            click en rellenar
          </p>
          <form onSubmit={handleBuscarPedido} style={{ textAlign: "center" }}>
            <label htmlFor="telBuscar" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              className="form-control"
              id="telBuscar"
              name="telBuscar"
              placeholder="Ingresa tu teléfono"
              disabled={loading}
              style={{ maxWidth: "300px", margin: "0 auto 1rem auto" }}
            />
            <button
              type="submit"
              className="btn"
              id="botonRelle"
              disabled={loading}
              style={{
                backgroundColor: "rgb(33, 182, 13)",
                color: "white",
                border: "none",
                padding: "0.5rem 1.5rem",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
                minWidth: "120px",
                marginBottom: "1rem"
              }}
            >
              {loading ? "Buscando..." : "Rellenar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Pedido;
