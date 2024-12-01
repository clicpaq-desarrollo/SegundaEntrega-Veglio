document.addEventListener("DOMContentLoaded", () => {
    const weatherContainer = document.getElementById("weather-status");
    const simulateWeather = document.getElementById("simulate-weather");
    const toggleMode = document.getElementById("switch-clima"); 

    let mode = "real";  
 

    async function getWeather(city) {
         const apiKey = "4229ba5f770a428db2320200242911";

        try {
            const cityEncoded = city.replace(/ /g, "%20");
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityEncoded}&aqi=no`
            );
            const data = await response.json();

            if (response.ok) {
                const weatherCondition = data.current.condition.text.toLowerCase();
                const temperature = data.current.temp_c;
                const iconUrl = `https:${data.current.condition.icon}`;
                updateWeatherUI(weatherCondition, temperature, iconUrl);
                generarEfectos(
                    weatherCondition.includes("rain")
                        ? "rain"
                        : weatherCondition.includes("cloud")
                        ? "cloudy"
                        : "sun"
                );
            } else {
                weatherContainer.textContent = "Error fetching weather data";
            }
        } catch (error) {
            weatherContainer.textContent = "Unable to connect to weather service";
            console.error(error);
        }
    }

    function updateWeatherUI(condition, temp, iconUrl) {
        document.querySelectorAll(".raindrop, .cloud").forEach((el) => el.remove());

        weatherContainer.innerHTML = ` 
            <img src="${iconUrl}" alt="${condition}" />
        `;
    }
    function generarEfectos(clima) {
        const contenedorEfectos = document.getElementById("clima-efectos");
        contenedorEfectos.innerHTML = "";  
      
        if (clima === "cloudy") {
          generarNubes();
        } else if (clima === "rain") {
          generarLluvia();
        } else if (clima === "sun") {
          generarSol();
        }
      }
      

    toggleMode.addEventListener("click", () => {
        mode = mode === "real" ? "simulate" : "real";
         Swal.fire({
            title: `Modo cambiado a: ${mode === "real" ? "Datos reales" : "Simulación"}`,
            icon: "success",
            timer: 1500,
        });
          if (mode === "simulate") {
            simulateWeather.style.display = "inline";
        } else {
            simulateWeather.style.display = "none";
            getWeather("Buenos Aires");
        }
    });

    simulateWeather.addEventListener("change", (event) => {
        if (mode === "simulate") {
            const simulatedCondition = event.target.value;
            updateWeatherUI(
                simulatedCondition,
                Math.floor(Math.random() * 35),
                "https://cdn.weatherapi.com/weather/64x64/day/113.png"
            );
            generarEfectos(simulatedCondition);
        }
    });

     
    getWeather("Buenos Aires");
});


  
  

function generarLluvia() {
    const contenedorLluvia = document.getElementById("clima-efectos");
    contenedorLluvia.className = "rain";
  
     
    while (contenedorLluvia.firstChild) {
      contenedorLluvia.removeChild(contenedorLluvia.firstChild);
    }
  
    for (let i = 0; i < 50; i++) {
      const raindrop = document.createElement("div");
      raindrop.className = "raindrop";
  
       
      raindrop.style.left = `${Math.random() * 100}vw`;
      raindrop.style.animationDelay = `${Math.random()}s`;  
      contenedorLluvia.appendChild(raindrop);
    }
  }
  
   
  document.addEventListener("DOMContentLoaded", generarLluvia);
  document.addEventListener("DOMContentLoaded", actualizarIconoHorario);

  
  function actualizarIconoHorario() {
    const weatherIcon = document.getElementById("weather-icon");
    const horaActual = new Date().getHours();
    const esDeDia = horaActual >= 6 && horaActual <= 19;
  
    const iconoUrl = esDeDia
      ? "https://cdn.weatherapi.com/weather/64x64/day/113.png"  
      : "https://cdn.weatherapi.com/weather/64x64/night/113.png";  
  
    weatherIcon.innerHTML = `<img src="${iconoUrl}" alt="${
      esDeDia ? "Sol" : "Luna"
    }" class="img-fluid" style="width: 50px; height: 50px;">`;

    if (esDeDia) {
        generarSol();  
    } else {
        generarLuna();  
    }

    console.log("Hora actual:", horaActual);
console.log("Es de día:", esDeDia);

  }

  function generarSol() {
    const contenedorEfectos = document.getElementById("clima-efectos");
    contenedorEfectos.innerHTML = "";  
    const sol = document.createElement("div");
    sol.className = "sun";
    contenedorEfectos.appendChild(sol);
}

function generarLuna() {
    const contenedorEfectos = document.getElementById("clima-efectos");
    contenedorEfectos.innerHTML = "";  
    const moon = document.createElement("div");
    moon.className = "moon";
    contenedorEfectos.appendChild(moon);
}


function generarNubes() {
    const contenedorEfectos = document.getElementById("clima-efectos");
    contenedorEfectos.innerHTML = `
        <div id="clouds">
            <div class="cloud x1"></div>
            <div class="cloud x2"></div>
            <div class="cloud x3"></div>
            <div class="cloud x4"></div>
            <div class="cloud x5"></div>
        </div>
    `;
}



 

  
  
  
  
  
