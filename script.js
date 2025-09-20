const inputBox = document.querySelector('.search-bar input');    // Caja de texto
const searchBtn = document.querySelector('.search-bar button');  // Botón buscar
const weatherIcon = document.querySelector('.weather-icon');     // Icono clima
const weather = document.querySelector('.weather');              // Contenedor del clima
const errorMessage = document.querySelector('.error');           // Mensaje error

async function checkWeather(city) {
    try {
      const apiKey = '3b7803f7076118beaaead521b5443d95'; // API Key de OpenWeather
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl); // Hace la consulta HTTP

      if (!response.ok) {                   // Si no responde correctamente
        throw new Error('ciudad no encontrada');
      }

      const data = await response.json();   // Convierte respuesta a JSON
      console.log(data);                    // Debug en consola
      updateWeatherUI(data);                // Actualiza UI con datos

    } catch (error) {
      console.error(error.message);
      weather.style.display = 'none';       // Oculta info
      errorMessage.style.display = 'block'; // Muestra error
    }
}

function updateWeatherUI(data) {
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`; // Temperatura
    document.querySelector('.city').innerHTML = data.name;                              // Ciudad
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;           // Humedad
    document.querySelector('.wind').innerHTML = `${data.wind.speed}km/h`;               // Viento

    // Diccionario de iconos
    const weatherIcons = {
        Clear: 'images/clear.png',
        Snow: 'images/snow.png',
        Rain: 'images/rain.png',
        Clouds: 'images/clouds.png',
        Drizzle: 'images/drizzle.png',
        Mist: 'images/mist.png' //
    }

    weatherIcon.src = weatherIcons[data.weather[0].main] || 'images/rain.png'; // Asigna ícono

    weather.style.display = 'block'; // Muestra datos
    errorMessage.style.display = 'none'; // Oculta error
}
// Evento click en botón
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})

// Cargar clima inicial por defecto (Minato)
window.onload = () => {
    checkWeather('Minato');
}
