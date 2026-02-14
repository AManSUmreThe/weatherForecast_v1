
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
    renderforecast(forecast,forecastSection);

    return;
}

function formatDate(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function iconUrl(icon) {
    if (!icon) return "";
    return icon.startsWith("//") ? "https:" + icon : icon;
}

function renderforecast(data,section) {
    if(!data) return;
    section.classList.remove("hidden");
}
function renderalerts(data,section) {
    if(!data) return;
    section.classList.remove("hidden");
}
function rendercurrent(loc,data,section) {
    if(!data || !loc) return;

    const loc = loc.location;
    const cond = data.condition || {}

    
    section.classList.remove("hidden");
}


export default renderdata;