import getWeatherData from "./api.js";

function renderdata(data) {
  const city = data.location.name;
  const country = data.location.country;
  const temp_c = data.current.temp_c;
  const condition = data.current.condition.text;
  const icon_url = data.current.condition.icon;
  document.getElementById("currentweather").innerHTML = `City: ${city}, Country: ${country}, Temperature: ${temp_c}°C, Condition: ${condition}`;
  document.getElementById("weather-icon").src = icon_url;
  console.log(`City: ${city}, Country: ${country}, Temperature: ${temp_c}°C, Condition: ${condition}`);
}

getWeatherData("Nagpur")
  .then((data) => {
    renderdata(data);
    })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });