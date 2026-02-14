
function renderdata(data) {
    const alerts = data.alerts?.alert || [];
    const forecast = data.forecast?.forecastday || [];
    const current = data.current || {};
    const location = data.location || {};

    const alertsSection = document.getElementById("alerts-section");
    const currentWeather = document.getElementById("current-section");
    const forecastSection = document.getElementById("forecast-section");
    const forecastGrid = document.getElementById("forecast-grid");

    renderalerts(alerts, alertsSection);
    rendercurrent(location, current, currentWeather);
    // currentWeather.classList.remove('hidden')
    renderforecast(forecast, forecastSection, forecastGrid);

    return;
}

function formatcurrDate(dateStr) {

    let d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}
function formatDate(dateStr) {

    // forecast returns date with invaild date format
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}


function renderforecast(data, section, grid) {
    if (!data || data.length === 0) return;

    data.forEach(days => {
        const day = days.day || {};
        const cond = day.condition || {};
        //creating daily card
        const card = document.createElement("div")
        //adding tailwind classes to card
        // card.className = "rounded-2xl bg-weather-surface border border-weather-border p-5 flex flex-col items-center text-center shadow-[0_4px_14px_-2px_rgba(13,148,136,0.08)] transition hover:bg-weather-surface-hover hover:border-weather-border-strong";
        // //adding inner elements
        // card.innerHTML = `
        // <p class="font-semibold text-weather-text">${formatDate(days.date)}</p>
        //     <img src="https:${cond.icon}" alt="${cond.text || ""}" class="w-14 h-14 my-3" />
        //     <p class="text-sm text-weather-text-muted">${cond.text || ""}</p>
        //     <p class="text-weather-text mt-2">
        //         <span class="font-bold text-weather-primary">${day.maxtemp_c ?? ""}°</span> 
        //         <span class="text-weather-text-soft">/</span> 
        //         <span>${day.mintemp_c ?? ""}°</span>
        // </p>
        // `;
        card.className = "group relative flex flex-col items-center text-center bg-weather-surface border border-weather-border rounded-3xl p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-weather-primary/30 cursor-default";

        // Inner HTML
        card.innerHTML = `
    <h3 class="font-bold text-weather-text text-lg mb-1 tracking-tight">
        ${formatDate(days.date)}
    </h3>

    <div class="relative w-20 h-20 my-2 flex items-center justify-center">
        <div class="absolute inset-0 bg-weather-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <img 
            src="https:${cond.icon}" 
            alt="${cond.text || ""}" 
            class="w-16 h-16 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 relative z-10" 
        />
    </div>

    <p class="text-sm font-medium text-weather-text-muted mb-4 line-clamp-1 min-h-5">
        ${cond.text || ""}
    </p>

    <div class="w-full bg-weather-bg-subtle/30 rounded-2xl p-3 flex items-center justify-between border border-weather-border/50">
        
        <div class="flex-1 flex flex-col border-r border-weather-border/50 pr-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-weather-text-soft mb-0.5">Max</span>
            <span class="text-xl font-bold text-weather-text">${Math.round(day.maxtemp_c)}°</span>
        </div>

        <div class="flex-1 flex flex-col pl-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-weather-text-soft mb-0.5">Min</span>
            <span class="text-xl font-medium text-weather-text-muted">${Math.round(day.mintemp_c)}°</span>
        </div>

    </div>
`;
        grid.appendChild(card)
    });

    section.classList.remove("hidden");
}
function renderalerts(data, section) {
    if (!data || data.length === 0) return;
    console.log(data);
    Section.innerHTML = "<strong class=\"text-weather-warning-text\">Alerts</strong><ul class=\"mt-2 space-y-1 list-disc list-inside text-weather-warning-text\">" +
        alerts.map((a) => `<li>${a.headline || a.event || "Alert"}${a.severity ? " (" + a.severity + ")" : ""}</li>`).join("") +
        "</ul>";
    section.classList.remove("hidden");
}
function rendercurrent(loc, data, section) {
    if (!data || !loc) return;
    const cond = data.condition || {}

    // adding basic info location, Time, temprature, condition
    // document.getElementById("current-location").textContent = `${loc.name}${loc.region ? ", " + loc.region : ""}, ${loc.country}`;
    // location without region
    document.getElementById("current-location").textContent = `${loc.name}, ${loc.country}`;
    document.getElementById("current-datetime").textContent = formatcurrDate(loc.localtime) || "";
    document.getElementById("current-temp").textContent = `${data.temp_c} °C`;
    document.getElementById("current-condition").textContent = cond.text || "";

    // adding weather icon
    const iconWrap = document.getElementById("current-icon-wrap");
    iconWrap.innerHTML = "";

    if (cond.icon) {
        const img = document.createElement("img");
        img.src = "https:" + cond.icon
        img.alt = cond.text || "Weather";
        //adding tailwind Classes
        img.className = "w-16 h-16";
        iconWrap.append(img);
    }
    section.classList.remove("hidden");
}


export default renderdata;