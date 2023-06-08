// Obtener elementos del DOM
let sumar = document.getElementById("mas"); 
let restar = document.getElementById("menos"); 
let contador = document.getElementById("contador"); 
let prevValue; 

// Función para realizar el cálculo y validar el valor del contador
function calcular() {
  var value = contador.value;
  var isValid = /^[1-9][0-9]*$/.test(value);

  if (!isValid) {
    // Si el valor no es válido, restaurar el valor previo
    contador.value = prevValue;
  } else {
    // Si el valor es válido, actualizar el valor previo
    prevValue = value;
  }
}

// Evento click del botón "sumar"
sumar.onclick = function() {
  contador.value = Number(contador.value) + 1;
  calcular();
};

// Evento click del botón "restar"
restar.onclick = function() {
  contador.value = Number(contador.value) - 1;
  calcular();
};

// Evento onchange del campo de contador
contador.onchange = function() {
  calcular();
};

// Evento onkeyup del campo de contador
contador.onkeyup = function() {
  if (contador.value === "") {
    return;
  }
  calcular();
};

// Llamar a la función calcular inicialmente
calcular();

// Evento "DOMContentLoaded" del documento
document.addEventListener("DOMContentLoaded", function() {
  // Obtener el botón "Pedir"
  var botonPedir = document.getElementById("Pedir");

  // Evento click del botón "Pedir"
  botonPedir.addEventListener("click", function(event) {
    event.preventDefault();
    // Realizar la petición
    alert("Has realizado la petición.");
  });
});
