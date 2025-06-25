import { useState, useEffect} from 'react'
import './App.css'
import { Navbar } from './components/Rutas.jsx'
import Card from './components/Card.jsx'
import { TraerDatos } from './js/datos.js'
import { ScrollTop } from './components/ScrollTop.jsx'
import "./css/productos.css"
function App() {
  const [products, setProducts] = useState([]);
  // const [cambiaCart, setCart] = useState(false);
  // const iconClass = cambiaCart ? "bi bi-cart-x" : "bi bi-cart-plus car-x";
  // const btnClass = cambiaCart ? "btn-danger" : "btn-primary";

  useEffect(() => {
    TraerDatos().then((data) => {
        setProducts(data);
    });
  }, []);
  console.log("Productos: ", products);

  return (
    <>
    <ScrollTop></ScrollTop>
      <section style={{ marginBottom: "px"}}>
          <Navbar activeHome={"active"}></Navbar>
        </section>
      <div className="container-fluid">
        <div className="title d-flex justify-content-center align-items-center my-4">
          <h1 className="text-center w-50">Productos</h1>
        </div>
        <div className="products d-flex flex-wrap justify-content-center gap-4 h-25">
          {products.map((product) => (
            <Card key={product.id} products={product} />
          ))}
</div>

      </div>
    </>
  )
}

export default App
