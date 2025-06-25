document.addEventListener("DOMContentLoaded", () => {
    
  var alertas = [
      document.getElementById('alertaNombre'),
      document.getElementById('alertaApellidos'),
      document.getElementById('alertaDireccion'),
      document.getElementById('alertaTelefono'),
      document.getElementById('alertaCorreo')
    ];

    var alertaCorrecto = document.getElementById('alertaCorrecta');
    

  for(i=0;i < alertas.length;i++){
      alertas[i].style.display = 'none';
  }
  alertaCorrecto.style.display = "none";
   // Oculta la alerta
})




var boton = document.getElementById('boton');

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  telefono: /^\d{10}$/, // 10 dígitos numéricos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Correo electrónico.
  direccion: /^(.+)$/ // Dirección no puede estar vacía.
}

boton.disabled = true;
// Referencias a los campos de entrada
var cajas_input = document.getElementsByTagName("input");

function valida() {
  

  // Validación del campo Nombre
  if (!expresiones.nombre.test(cajas_input[0].value)) {
      alertaNombre.style.display = "block"; // Mostrar alerta si está vacío o no cumple la regex
  } else {
      alertaNombre.style.display = "none"; // Ocultar alerta si está completo y es válido
  }

  // Validación del campo Apellidos
  if (!expresiones.apellidos.test(cajas_input[1].value)) {
      alertaApellidos.style.display = "block"; // Mostrar alerta si está vacío
  } else {
      alertaApellidos.style.display = "none"; // Ocultar alerta si está completo
  }

  // Validación del campo Teléfono
  if (cajas_input[2].value == "") {
      alertaDireccion.style.display = "block"; // Mostrar alerta si está vacío o no cumple con la regex
  } else {
      alertaDireccion.style.display = "none"; // Ocultar alerta si está completo y es válido
  }

  // Validación del campo Dirección
  if (cajas_input[3].value == "" || !expresiones.telefono.test(cajas_input[3].value)) {
      alertaTelefono.style.display = "block"; // Mostrar alerta si está vacío o no cumple con la regex
  } else {
      alertaTelefono.style.display = "none"; // Ocultar alerta si está completo y es válido
  }

  // Validación del campo Correo
  if (cajas_input[4].value == "" || !expresiones.correo.test(cajas_input[4].value)) {
      alertaCorreo.style.display = "block"; // Mostrar alerta si está vacío o no cumple con la regex
  } else {
      alertaCorreo.style.display = "none"; // Ocultar alerta si está completo y es válido
  }

  if(!expresiones.nombre.test(cajas_input[0].value) || !expresiones.apellidos.test(cajas_input[1].value) || !expresiones.direccion.test(cajas_input[2].value) || !expresiones.telefono.test(cajas_input[3].value) || !expresiones.correo.test(cajas_input[4].value)){

      alertaForm.style.display = "block";
      alertaCorrecta.style.display = "none";
      boton.disabled = true;      

  }else{
      alertaForm.style.display = "none";
      alertaCorrecta.style.display = "block";
      boton.disabled = false;
  }

  // Verificar si todos los campos están completos y válidos
}

// Ejecutar la validación cada vez que el usuario cambia el valor en cualquier campo
for (let i = 0; i < cajas_input.length; i++) {
  cajas_input[i].addEventListener('input', valida)
  cajas_input[i].addEventListener('blur', valida);
}



