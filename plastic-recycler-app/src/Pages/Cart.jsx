import { useCart } from '../js/useCart';
import { ScrollTop } from '../components/ScrollTop';
import { Navbar } from '../components/Rutas';
import { checkSession } from '../js/session';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handlePagar = async () => {
  const sessionActiva = await checkSession();

  if (!sessionActiva) {
    Swal.fire({
  title: "Error",
  text: "Debes iniciar sesión para cotinuar con el pago",
  icon: "error",
  confirmButtonText: "Iniciar sesion",
  showCancelButton: true
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    navigate("/login")
  }
});

    // Redirige al login si lo deseas
    // window.location.href = "/login";
    return;
  }
  Swal.fire({
  title: "Exito",
  text: "Pago realizado, su pedido llegara en 24hrs",
  icon: "success"
});
  // Aquí va la lógica de pago real, como mostrar un modal, procesar el pago, etc.

  clearCart();
};


  return (
    <>
    <section>
      <Navbar activeCart={"active"}></Navbar>
    </section>
    <div className="container my-4 d-flex flex-column gap-5">
      <ScrollTop></ScrollTop>
      <h2 className="mb-3 text-center" style={{ marginTop: "90px"}}>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="mb-3 text-center">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center gap-3">
                <div>
                  <img src={item.image} style={{ width: '100px', height: '100px' }} alt="" />
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                  <p><strong>${item.price}</strong></p>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className='bi bi-cart-x'></i>
                </button>
              </li>
            ))}
          </ul>
            <div className="btn d-flex justify-content-center gap-3">
          <button className="btn btn-warning" onClick={clearCart}>
            Vaciar Carrito
          </button>

          <button className="btn btn-primary" onClick={handlePagar}>
            Pagar
          </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default Cart;
