
function renderdata(data) {
    const alerts = data.alerts?.alert || [];
    const forecast = data.forecast?.forecastday || [];
    const current = data.current || {};
    
    const alertsSection = document.getElementById("alerts-section");
    const currentWeather = document.getElementById("current-section");
    const forecastSection = document.getElementById("forecast-section");
    
    renderalerts(alerts);
    rendercurrent(current);
    renderforecast(forecast);
}

function renderforecast(data,) {

}
function renderalerts(data) {}
function rendercurrent(data) {}


export default renderdata;