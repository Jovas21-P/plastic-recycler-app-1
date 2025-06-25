import { Navbar } from "../components/Rutas";

function Ubicacion() {
  return(
    <>
    <header>
      <Navbar />
    </header>
    <div className="container">
  <div className="row">
    <h2>Ubicación</h2>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.4405170924147!2d-99.29865069996032!3d19.60845597672971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21be0db2792f5%3A0xcd671b369ab1379d!2sCda.%20Casa%20Blanca%2060%2C%20Benito%20Ju%C3%A1rez%20Barron%2C%20Cdad.%20Nicol%C3%A1s%20Romero%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1727509313460!5m2!1ses-419!2smx"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación Google Maps"
    ></iframe>
  </div>
</div>
</>
  )
}

export default Ubicacion