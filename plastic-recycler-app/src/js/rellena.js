// Obtener los elementos del formulario y alertas
var alertaPeletizado = document.getElementById('alertaPeletizado');
var alertaCompactado = document.getElementById('alertaCompactado');
var alertaForm = document.getElementById('alertaForm');
var boton = document.getElementById('boton');
var cantidadPeleti = document.getElementById('cantidadPeleti');
var cantidadCompa = document.getElementById('cantidadCompa');

// Deshabilitar el botón por defecto
boton.disabled = true;

// Función de validación
function valida() {

    // Validar cantidad de Peletizado
    if (cantidadPeleti.value == "" || cantidadPeleti.value <= 0) {
        alertaPeletizado.style.display = "block"; 
    } else {
        alertaPeletizado.style.display = "none";
    }

    // Validar cantidad de Compactado
    if (cantidadCompa.value == "" || cantidadCompa.value <= 0) {
        alertaCompactado.style.display = "block"; 
    } else {
        alertaCompactado.style.display = "none"; 
    }

    // Verificar si ambos campos son válidos
    if (cantidadPeleti.value <= 0 || cantidadCompa.value <= 0) {
        alertaForm.style.display = "block";
        boton.disabled = true;  // Deshabilitar el botón
    } else {
        alertaForm.style.display = "none";
        boton.disabled = false; // Habilitar el botón
    }
}

// Agregar eventos a los campos de cantidad
cantidadPeleti.addEventListener('input', valida);
cantidadCompa.addEventListener('input', valida);
cantidadPeleti.addEventListener('blur', valida);
cantidadCompa.addEventListener('blur', valida);

// Ejecutar la validación al cargar la página

