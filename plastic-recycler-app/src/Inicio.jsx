import { Navbar } from "./components/Rutas";
import "./css/style.css";

function Inicio() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container titulo">
        <div className="row">
          <h1>Plastic Recycler</h1>
        </div>

        <div className="row logo">
          <img src="logo.jpg" alt="logo" width="25" height="800" id="log" />
        </div>

        <div className="row cuerpo">
          <h2>¡Bienvenidos!</h2>
          <p>
            La microempresa de reciclado de plástico llamada Plastic Recycler se ha dedicado al reciclaje de bolsas durante casi veinte años. Te contaremos un poco acerca de nuestro trabajo:
          </p>

          <div>
            <p>
              1. <strong>Recolección y Clasificación:</strong> Las bolsas plásticas se recolectan a partir de diversos puntos de recolección, como centros de reciclaje, supermercados y otros establecimientos. Luego, se clasifican según su tipo y color para asegurar que el proceso de reciclaje sea más eficiente.
            </p>
          </div>

          <div>
            <p>
              2. <strong>Trituración:</strong> Las bolsas plásticas se trituran en pequeños trozos o chips utilizando trituradoras. Este proceso reduce el tamaño del material y facilita su manejo en las etapas siguientes.
            </p>
          </div>

          <div>
            <p>
              3. <strong>Peletización:</strong> Las bolsas trituradas se introducen en una peletizadora, donde se funden y se transforman en pequeños pellets o esferas de plástico. Estos pellets son más fáciles de manejar y pueden ser utilizados en la fabricación de nuevos productos plásticos.
            </p>
          </div>

          <div>
            <p>
              4. <strong>Encostalamiento:</strong> Se llenan costales de aproximadamente 50kg y se pesan en una báscula. Este peso es anotado, se cargan los bultos al vehículo de entrega y se manda directo al cliente.
            </p>
          </div>

          <div>
            <h2>Beneficios</h2>
            <ol>
              <li><strong>Calidad Garantizada:</strong> Nuestros productos y servicios cumplen con altos estándares de calidad, asegurando la satisfacción de nuestros clientes.</li>
              <li><strong>Precios Competitivos:</strong> Ofrecemos tarifas accesibles en venta y maquila, lo que te permite maximizar tus márgenes de ganancia.</li>
              <li><strong>Flexibilidad:</strong> Adaptamos nuestros servicios a tus necesidades específicas, ya sea en la compra al por mayor o en la maquila de productos.</li>
              <li><strong>Servicio Personalizado:</strong> Nuestro equipo está disponible para brindarte atención personalizada y resolver cualquier inquietud que tengas.</li>
              <li><strong>Eficiencia en Entregas:</strong> Nuestro servicio a domicilio asegura que recibas tus productos de manera rápida y segura, minimizando tiempos de espera.</li>
              <li><strong>Transparencia en Costos:</strong> Sin costos ocultos, sabemos que la transparencia es clave para construir relaciones de confianza.</li>
              <li><strong>Variedad de Productos:</strong> Contamos con una amplia gama de productos que se adaptan a diferentes industrias y necesidades.</li>
            </ol>

            <p>Además, el reciclaje de bolsas de plástico ayuda al medio ambiente porque:</p>
            <ol>
              <li>Evita que los materiales se conviertan en residuos.</li>
              <li>Alarga la vida útil de los productos y materiales.</li>
              <li>Contribuye a la preservación de los recursos naturales.</li>
              <li>Libera al medio ambiente de la contaminación que producen las bolsas de plástico.</li>
            </ol>
          </div>

          <div className="shadow">
            <img src="Referencia.jfif" alt="referencia" width="80%" height="100%" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
