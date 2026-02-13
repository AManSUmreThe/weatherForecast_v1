import API_KEY from "./getapikey.mjs";

const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 7;

const getWeatherData = async (city) => {
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
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default getWeatherData;