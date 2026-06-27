function buscarClima() {
    let ciudad = document.getElementById("ciudad").value;

    if (ciudad.trim() === "") {
        mostrarError("Escribe una ciudad");
        return;
    }

    mostrarCargando();

    let urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es`;

    fetch(urlGeo)
        .then(res => res.json())
        .then(data => {

            if (!data.results || data.results.length === 0) {
                throw new Error("Ciudad no encontrada");
            }

            let lat = data.results[0].latitude;
            let lon = data.results[0].longitude;
            let nombre = data.results[0].name;

            let urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

            return fetch(urlClima)
                .then(res => {
                    if (!res.ok) throw new Error("Error al obtener clima");
                    return res.json();
                })
                .then(clima => mostrarClima(nombre, clima));
        })
        .catch(error => mostrarError(error.message));
}

/* Mostrar clima */
function mostrarClima(ciudad, datos) {

    let clima = datos.current;

    let temp = Math.round(clima.temperature_2m);
    let humedad = clima.relative_humidity_2m;
    let viento = clima.wind_speed_10m;
    let info = obtenerInfoClima(clima.weather_code);

    let html = `
        <div class="clima-card">
            <h2>${ciudad}</h2>

            <div class="icono-clima">${info.icono}</div>

            <div class="temperatura">${temp}°C</div>

            <div class="descripcion">${info.descripcion}</div>

            <div class="detalles">
                <div class="detalle">
                    <div> Humedad </div>
                    <strong>${humedad}%</strong>
                </div>

                <div class="detalle">
                    <div>🌬️ Viento</div>
                    <strong>${viento} km/h</strong>
                </div>
            </div>
        </div>
    `;

    document.getElementById("resultado").innerHTML = html;
}

/* Interpretar clima */
function obtenerInfoClima(codigo) {

    if (codigo === 0) {
        return { descripcion: "Despejado", icono: "☀️" };

    } else if (codigo >= 1 && codigo <= 3) {
        return { descripcion: "Nublado", icono: "☁️" };

    } else if (codigo >= 45 && codigo <= 48) {
        return { descripcion: "Niebla", icono: "🌫️" };

    } else if (codigo >= 51 && codigo <= 67) {
        return { descripcion: "Lluvia", icono: "🌧️" };

    } else if (codigo >= 71 && codigo <= 77) {
        return { descripcion: "Nieve", icono: "❄️" };

    } else if (codigo >= 80 && codigo <= 82) {
        return { descripcion: "Chubascos", icono: "🌦️" };

    } else if (codigo >= 95 && codigo <= 99) {
        return { descripcion: "Tormenta", icono: "⛈️" };

    } else {
        return { descripcion: "Desconocido", icono: "🌡️" };
    }
}

/* Mostrar error */
function mostrarError(mensaje) {
    document.getElementById("resultado").innerHTML = `
        <div class="error">
	  ❌ ${mensaje}
	  </div>
    `;
}

/* Cargando */
function mostrarCargando() {
    document.getElementById("resultado").innerHTML = `
        <div class="cargando">
	  ⏳ Buscando clima...
	  </div>
    `;
}

/* Enter para buscar */
let input = document.getElementById("ciudad");

if (input) {
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            buscarClima();
        }
    });
}
