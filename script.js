// Seleccionamos la pantalla de la calculadora y todos los botones

const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

//funcio para formatear numeros 

function formatearNumero(numero) {

    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
}

// Recorremos todos los botones para añadirles el evento de click

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;  // Texto del botón presionado

// Limpia la pantalla si se presiona el botón "C"

        if(boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

// Elimina el último carácter si se presiona "←"

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "ERROR!") {
                pantalla.textContent = "0";    // Resetea a "0" si solo queda un carácter o hay un error
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);  // Elimina el último carácter
            }
            return;
        }

// Realiza el cálculo si se presiona "="

        if (boton.id === "igual") {
            try {
                pantalla.textContent = formatearNumero(evaluarOperacion(pantalla.textContent));
            } catch {
                pantalla.textContent = "ERROR!";   // Muestra error si hay un problema con el cálculo
            }
            return;
            }

// Función para evaluar la operación matemática

            function evaluarOperacion(expresion) {

// Identifica operadores básicos (+, -, ×, ÷)

                const operadores = /[\+\-\×÷]/;
                const partes = expresion.split(operadores);
            
 // Verifica que la expresión tenga el formato correcto (dos números)     
    
            if (partes.length !== 2) throw new Error("Formato inválido");



                let [num1, num2] = partes.map(Number);
                let operador = expresion.match(operadores)[0];

  // Verifica que ambos números sean válidos    
    
                if (isNaN(num1) || isNaN(num2)) throw new Error("Número inválido");

// Realiza la operación según el operador

                switch (operador){
                    case '+':
                return num1 + num2;
                case '-':
                return num1 - num2;
                case '×':
                return num1 * num2;
                case '÷':
                if (num2 === 0) throw new Error("División por cero");   // Evita división por cero
                return num1 / num2;
                default:
                throw new Error("Operador no soportado"); // Lanza error si el operador no es válido
                    }
                }
                
            
            // Lógica para manejar números y operadores en la pantalla


                if (pantalla.textContent === "0" || pantalla.textContent === "ERROR!") {

 // Si la pantalla muestra "0" o "ERROR!", reinicia con el nuevo número o punto

                    if (!isNaN(botonApretado) || botonApretado === ".") { 
                        pantalla.textContent = botonApretado;
                    } else {
                        pantalla.textContent = "0" + botonApretado;   // Agrega un operador después de un "0" o "ERROR!"
                    }
                    } else {
                        pantalla.textContent += botonApretado;     // Concatenar el texto del botón presionado

// Formatear la pantalla si el contenido es un número

                    if (!isNaN(pantalla.textContent.replace(/\./g, ''))) {
                        pantalla.textContent = formatearNumero(pantalla.textContent.replace(/\./g, ''));
            }
        }
})})
