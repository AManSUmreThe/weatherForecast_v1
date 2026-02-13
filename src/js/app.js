import getWeatherData from "./api.js";
import renderdata from "./render.js";

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

async function runSearch() {
    const selectedCity = citySelect.value;
    if (!selectedCity){
        alert("Please select a city before searching.");
        return;
    } // safety check
    try {
        const data = await getWeatherData(selectedCity);
        renderdata(data);
    } catch (error) {
        alert("Failed to fetch weather data. Please try again later.");
        return;
    }
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
searchBtn.addEventListener("click", runSearch);

Main();