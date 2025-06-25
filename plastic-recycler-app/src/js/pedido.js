document.addEventListener("DOMContentLoaded", () => {
    // Asignación de alertas a sus respectivos divs
    var alertas = [
        document.getElementById('alertaTelefono'),
        document.getElementById('alertaNombre'),
        document.getElementById('alertaApellidos'),
        document.getElementById('alertaDireccion'),
        document.getElementById('alertaCorreo'),
        document.getElementById('alertaPeletizado'),
        document.getElementById('alertaCompactado')
        
    ];

    var alertaCorrecto = document.getElementById('alertaCorrecta');
    var alertaForm = document.getElementById('alertaForm');
    var alertaTel2 = document.getElementById('alertaTel2');
    var alertaCorrecta2 = document.getElementById('alertaCorrecta2');

    // Ocultar las alertas al cargar la página
    for (let i = 0; i < alertas.length; i++) {
        alertas[i].style.display = 'none';
    }
    alertaCorrecto.style.display = "none";
    alertaCorrecta2.style.display = "none";
    alertaTel2.style.display = "block"
    alertaForm.style.display = "block";
});

// Obtener el botón y los campos de input
var boton = document.getElementById('boton');
var btnRelle = document.getElementById('botonRelle');
var cajas_input = document.getElementsByTagName("input");

// Expresiones regulares para validaciones
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    telefono: /^\d{10}$/, // 10 dígitos numéricos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Correo electrónico.
    direccion: /^(.+)$/ // Dirección no puede estar vacía.
}


boton.disabled = true;
btnRelle.disabled = true;

function valida() {
    // Validación del campo Teléfono
    if (!expresiones.telefono.test(cajas_input[0].value)) {
        document.getElementById('alertaTelefono').style.display = "block"; 
    } else {
        document.getElementById('alertaTelefono').style.display = "none";
    }

    // Validación del campo Nombre
    if (!expresiones.nombre.test(cajas_input[1].value)) {
        document.getElementById('alertaNombre').style.display = "block"; 
    } else {
        document.getElementById('alertaNombre').style.display = "none"; 
    }

    // Validación del campo Apellidos
    if (!expresiones.apellidos.test(cajas_input[2].value)) {
        document.getElementById('alertaApellidos').style.display = "block"; 
    } else {
        document.getElementById('alertaApellidos').style.display = "none"; 
    }

    // Validación del campo Dirección
    if (cajas_input[3].value == "" || !expresiones.direccion.test(cajas_input[3].value)) {
        document.getElementById('alertaDireccion').style.display = "block"; 
    } else {
        document.getElementById('alertaDireccion').style.display = "none"; 
    }

    // Validación del campo Correo
    if (cajas_input[4].value == "" || !expresiones.correo.test(cajas_input[4].value)) {
        document.getElementById('alertaCorreo').style.display = "block"; 
    } else {
        document.getElementById('alertaCorreo').style.display = "none"; 
    }

    // Validación del campo Peletizado
    if (cajas_input[5].value == "" || cajas_input[5].value <= 0) {
        document.getElementById('alertaPeletizado').style.display = "block"; 
    } else {
        document.getElementById('alertaPeletizado').style.display = "none"; 
    }

    // Validación del campo Compactado
    if (cajas_input[6].value == "" || cajas_input[6].value <= 0) {
        document.getElementById('alertaCompactado').style.display = "block"; 
    } else {
        document.getElementById('alertaCompactado').style.display = "none"; 
    }

    // Verificar si todos los campos están completos y válidos
    if (!expresiones.nombre.test(cajas_input[1].value) || !expresiones.apellidos.test(cajas_input[2].value) || !expresiones.direccion.test(cajas_input[3].value) || !expresiones.telefono.test(cajas_input[0].value) || !expresiones.correo.test(cajas_input[4].value) || cajas_input[5].value <= 0 || cajas_input[6].value <= 0) {
        document.getElementById('alertaForm').style.display = "block";
        alertaCorrecta.style.display = "none";
        boton.disabled = true;
    } else {
        document.getElementById('alertaForm').style.display = "none";
        alertaCorrecta.style.display = "block";
        boton.disabled = false; // Habilitar el botón
    }

    var telBusca = document.getElementById('tel2');
    
    

    if(!expresiones.telefono.test(telBusca.value)){
        alertaCorrecta2.style.display = "none";
        alertaTel2.style.display = "block";
        btnRelle.disabled = true;
    }else{
        document.getElementById('alertaTel2').style.display = "none";
        document.getElementById('alertaCorrecta2').style.display = "block";
        btnRelle.disabled = false;
    }


}



// Ejecutar la validación cada vez que el usuario cambia el valor en cualquier campo
for (let i = 0; i < cajas_input.length; i++) {
    cajas_input[i].addEventListener('input', valida);
    cajas_input[i].addEventListener('blur', valida);
}
