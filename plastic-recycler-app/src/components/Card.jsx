import "../css/cards.css";
import { useCart } from "../js/useCart";

function Card({ products }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const estaEnCarrito = cart.some((item) => item.id === products.id);
  const iconClass = estaEnCarrito ? "bi bi-cart-x" : "bi bi-cart-plus car-x";
  const btnClass = estaEnCarrito ? "btn-danger" : "btn-primary";

  const handleCartToggle = () => {
    if (estaEnCarrito) {
      removeFromCart(products.id);
      console.log("Producto eliminado del carrito:", products.id);
    } else {
      addToCart(products);
      console.log("Producto agregado al carrito:", products);
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={products.image} className="card-img-top" alt={products.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{products.title}</h5>
        <p className="card-text">{products.description}</p>
        <p className="text-center">{`${products.price}$ MXN por kilo`}</p>
        
      </div>
    </div>
  );
}

export default Card;
