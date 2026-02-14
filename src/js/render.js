
function renderdata(data) {
    const alerts = data.alerts?.alert || [];
    const forecast = data.forecast?.forecastday || [];
    const current = data.current || {};
    const location = data.location || {};
    
    const alertsSection = document.getElementById("alerts-section");
    const currentWeather = document.getElementById("current-section");
    const forecastSection = document.getElementById("forecast-section");
    
    renderalerts(alerts,alertsSection);
    rendercurrent(location,current,currentWeather);
    // currentWeather.classList.remove('hidden')
    renderforecast(forecast,forecastSection);

    return;
}

function formatDate(dateStr) {
    try{
        let d = new Date(dateStr)
        return d.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    }catch(err)
    {
        // forecast returns date with invaild date format
        const d = new Date(dateStr + "T12:00:00");
        return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    }
}


function renderforecast(data,section) {
    if(!data || data.length===0) return;

    section.classList.remove("hidden");
}
function renderalerts(data,section) {
    if(!data || data.length===0) return;
    console.log(data);
    Section.innerHTML = "<strong class=\"text-weather-warning-text\">Alerts</strong><ul class=\"mt-2 space-y-1 list-disc list-inside text-weather-warning-text\">" +
        alerts.map((a) => `<li>${a.headline || a.event || "Alert"}${a.severity ? " (" + a.severity + ")" : ""}</li>`).join("") +
        "</ul>";
    section.classList.remove("hidden");
}
function rendercurrent(loc,data,section) {
    if(!data || !loc) return;
    const cond = data.condition || {}

    // adding basic info location, Time, temprature, condition
    // document.getElementById("current-location").textContent = `${loc.name}${loc.region ? ", " + loc.region : ""}, ${loc.country}`;
    // location without region
    document.getElementById("current-location").textContent = `${loc.name}, ${loc.country}`;
    document.getElementById("current-datetime").textContent = formatDate(loc.localtime) || "";
    document.getElementById("current-temp").textContent = `${data.temp_c} °C`;
    document.getElementById("current-condition").textContent = cond.text || "";

    // adding weather icon
    const iconWrap = document.getElementById("current-icon-wrap");
    iconWrap.innerHTML = "";

    if(cond.icon){
        const img = document.createElement("img");
        img.src = "https:"+cond.icon
        img.alt = cond.text || "Weather";
        //adding tailwind Classes
        img.className = "w-16 h-16";
        iconWrap.append(img);
    }
    section.classList.remove("hidden");
}


export default renderdata;