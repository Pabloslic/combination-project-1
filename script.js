const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

const API_KEY = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric"; // 🔑 Replace with your key

getWeatherBtn.addEventListener("click", async () => {
  const city = cityInput.value;
  if (!city) {
    weatherResult.innerHTML = "⚠️ Please enter a city name.";
    return;
  }

  try {
    // Fetch weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      weatherResult.innerHTML = "❌ City not found.";
    } else {
      // Display weather info
      weatherResult.innerHTML = `
        <h2 class="text-xl font-semibold">${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp} °C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
    }
  } catch (error) {
    weatherResult.innerHTML = "⚠️ Error fetching data.";
  }
});
