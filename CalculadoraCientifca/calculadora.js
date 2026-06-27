let pantalla = document.getElementById("pantalla");

// Agregar números
function agregar(valor) {
    pantalla.value += valor;
}

// Operadores
function operar(op) {
    pantalla.value += op;
}

// Limpiar pantalla
function limpiar() {
    pantalla.value = "";
}

// Calcular resultado
function calcular() {
    try {
        pantalla.value = eval(pantalla.value);
    } catch {
        pantalla.value = "Error";
    }
}

// Funciones científicas
function raiz() {
    pantalla.value = Math.sqrt(pantalla.value);
}

function potencia() {
    pantalla.value = Math.pow(pantalla.value, 2);
}
 
// Agregar números
function agregar(valor) {
    pantalla.value += valor;
}

// Operadores
function operar(op) {
    pantalla.value += op;
}

// Limpiar pantalla
function limpiar() {
    pantalla.value = "";
}

// Calcular resultado
function calcular() {
    try {
        pantalla.value = eval(pantalla.value);
    } catch {
        pantalla.value = "Error";
    }
}

// Funciones científicas
function raiz() {
    pantalla.value = Math.sqrt(pantalla.value);
}

function potencia() {
    pantalla.value = Math.pow(pantalla.value, 2);
}

function coseno() {
    pantalla.value = Math.cos(pantalla.value);
}

function tangente() {
    pantalla.value = Math.tan(pantalla.value);
}

// Soporte de teclado
document.addEventListener("keydown", function(e) {
  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    agregar(e.key);
  }

  if (e.key === "Enter") {
    calcular();
  }

  if (e.key === "Backspace") {
    pantalla.value = pantalla.value.slice(0, -1);
  }
});