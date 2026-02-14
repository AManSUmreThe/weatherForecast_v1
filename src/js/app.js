import getWeatherData from "./api.js";
import renderdata from "./render.js";

//dropdown and searchbar
const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const searchBtn = document.getElementById("search-btn");

//displaying error messages
const errorMessage = document.getElementById("error-message");

//
countrySelect.addEventListener("change",onCountryChange);
citySelect.addEventListener("change", onCityChange);
searchBtn.addEventListener("click", runSearch);

//intializing data variable
let weatherData = [];
let locData = [];

function showError(msg) {
    errorMessage.innerHTML += "<br>" + msg;
    errorMessage.classList.remove("hidden");
}

function clearError() {
    errorMessage.classList.add("hidden");
    errorMessage.innerHTML = "";
}


async function Main() {
    // main function
    try {
        // fetch location data from local JSON file
        const response = await fetch(new URL("./data/locations.json", import.meta.url));
        if (!response.ok) throw new Error("Failed to load locations");
        locData = await response.json();
        
    } catch (error) {
        console.error("Error loading location data:", error);
        showError("Error loading Locations data <br>" + error)
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
    clearError();
    if (!selectedCity){
        alert("Please select a city before searching.");
        return;
    } // safety check
    try {
        const data = await getWeatherData(selectedCity);
        renderdata(data);
    } catch (error) {
        showError(error.message || "Failed to fetch weather data. Please try again later.");
    }
}

// main logic starts from here
Main();