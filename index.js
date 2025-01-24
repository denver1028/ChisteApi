/*
Para resolver el ejercicio necesitamos:
1. Obtener el chiste.
2. Renderizar el chiste en el HTML dependiendo de si es un "Two Part" o "Single"
    - Si es single, sólo deberíamos ver el chiste.
    - Si es un "Two Part" deberíamos ver la primera línea del chiste, seguido de un botón de detalle que me permita revelar la segunda parte del chiste.
    - Sólo se debe de mostrar el detalle del chiste una vez.
    - Cada uno de los botones debe de tener una función definida.
3. Mejorar el diseño sin afectar la funcionalidad del aplicativo. Use su creatividad. Puede utilizar librerías externas.
    
Si existen dudas al respecto del ejercicio por favor diríjanlas a través del Discord.
Adjunto dos imágenes básicas de como se ve el ejercicio final. 

*/
const BASE_URL = "https://v2.jokeapi.dev/joke/Any?lang=es"; // URL BASE PARA EL EJERCICIO :)

// Función principal para obtener el chiste
async function fetchJoke() {
  const jokeContainer = document.querySelector(".joke"); // Contenedor donde se mostrará el chiste
  jokeContainer.innerHTML = "Cargando chiste..."; // Mensaje de carga

  try {
    const response = await fetch(BASE_URL); // Llamada a la API
    const joke = await response.json(); // Convertir la respuesta a JSON

    renderJoke(joke); // Llamar a la función para renderizar el chiste
  } catch (error) {
    console.error("Error al obtener el chiste:", error);
    jokeContainer.innerHTML = "<p>No se pudo cargar el chiste. Intenta nuevamente.</p>";
  }
}

// Función para renderizar el chiste en el HTML
function renderJoke(joke) {
  const jokeContainer = document.querySelector(".joke"); // Contenedor dinámico
  jokeContainer.innerHTML = ""; // Limpiar contenido previo

  if (joke.type === "single") {
    // Si el chiste es de tipo "single", mostrarlo directamente
    const jokeText = document.createElement("p");
    jokeText.textContent = joke.joke;
    jokeContainer.appendChild(jokeText);
  } else if (joke.type === "twopart") {
    // Si el chiste es de tipo "twopart", mostrar la primera parte y un botón para revelar la segunda
    const setupText = document.createElement("p");
    setupText.textContent = joke.setup;

    const revealButton = document.createElement("button");
    revealButton.textContent = "Mostrar el final";
    revealButton.className = "button button-details";
    revealButton.onclick = function () {
      const punchlineText = document.createElement("p");
      punchlineText.textContent = joke.delivery;
      punchlineText.style.fontStyle = "italic";
      jokeContainer.appendChild(punchlineText); // Agregar la segunda parte del chiste
      revealButton.disabled = true; // Deshabilitar el botón tras ser usado
    };

    jokeContainer.appendChild(setupText);
    jokeContainer.appendChild(revealButton);
  }
}

// Asignar el evento al botón principal
document.getElementById("btnJoke").addEventListener("click", fetchJoke);
