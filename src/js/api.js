import API_KEY from "./getapikey.mjs";

const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 7;
//displaying error messages
const errorMessage = document.getElementById("error-message");


function showError(msg) {
  errorMessage.innerHTML += "<br>" + msg;
  errorMessage.classList.remove("hidden");
}

async function getWeatherData(city) {
  try {
    console.log(`Fetching weather data for ${city}...`);
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${city}&days=${FORECAST_DAYS}&api=no&alerts=no`
    );
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getWeatherData;