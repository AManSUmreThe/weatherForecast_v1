
function renderdata(data) {
    const alerts = data.alerts?.alert || [];
    const forecast = data.forecast || [];
    const current = data.current || {};
    renderalerts(alerts);
    renderforecast(forecast);
    rendercurrent(current);
}

function renderforecast(data) {}
function renderalerts(data) {}
function rendercurrent(data) {}
export default renderdata;