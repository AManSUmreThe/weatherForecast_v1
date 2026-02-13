import getWeatherData from "./api.js";

const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const searchBtn = document.getElementById("search-btn");

let weatherData = [];
let locData = [];


async function Main() {
    // main function
    try {
        // fetch location data from local JSON file
        const response = await fetch(new URL("./data/locations.json", import.meta.url));
        if (!response.ok) throw new Error("Failed to load locations");
        locData = await response.json();
        
    } catch (error) {
        console.error("Error loading location data:", error);
        return;
    }
    // populate country dropdown
    const countries = [...new Set(locData.map((item) => item.country))].sort();
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
    citySelect.disabled = true; // disable city select until a country is chosen
    searchBtn.disabled = true; // disable search button until a city is chosen
}

function onCountryChange() {
    const selectedCountry = countrySelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = !selectedCountry; // disable city select if no country is selected
    searchBtn.disabled = true; // disable search button until a city is chosen
    
    // populate city dropdown based on selected country
    // find cities for the selected country
    const cities = locData.find(item => item.country === selectedCountry)|| [];
    console.log(`Cities for ${selectedCountry}:`, cities);
    cities.cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function onCityChange() {
    searchBtn.disabled = !citySelect.value; // enable search button only if a city is selected
}

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

// getWeatherData("Nagpur")
//   .then((data) => {
//     renderdata(data);
//     })
//   .catch((error) => {
//     console.error("Error fetching weather data:", error);
//   });

countrySelect.addEventListener("change",onCountryChange);
citySelect.addEventListener("change", onCityChange);
searchBtn.addEventListener("click", );
Main();